// MecaKit — Lógica principal de inventario personal con Autenticación y Base de Datos en la Nube (Supabase RLS)
import {
  DEFAULT_CATEGORIES,
  createEmptyAppState,
  fetchUserCloudState,
  seedSampleDataForUser,
  mapInventoryRow,
  mapCategoryRow,
  mapComponentRow,
  mapLoanRow
} from "./data.js";
import { supabase, REGISTER_USER_ENDPOINT } from "./supabaseClient.js";

let state = createEmptyAppState();
let pendingConfirmAction = null;
let isSyncingAuth = false;

// --- Utilidades de Sanitización y Formato ---
function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function showToast(message, icon = "✓") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className =
    "pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#37352F] text-white text-xs font-medium shadow-md border border-black/10 transition-all duration-200";
  toast.innerHTML = `<span class="text-sm">${escapeHtml(icon)}</span><span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(6px)";
    setTimeout(() => toast.remove(), 200);
  }, 2600);
}

// --- Feedback en la Pantalla de Autenticación ---
function setAuthFeedback(message = "", type = "error") {
  const box = document.getElementById("auth-feedback");
  if (!box) return;
  if (!message) {
    box.className = "hidden mb-4 p-3 rounded-lg text-xs font-medium border";
    box.textContent = "";
    return;
  }
  if (type === "success") {
    box.className =
      "mb-4 p-3 rounded-lg text-xs font-medium border bg-[#EDF3EC] text-[#0F7B6C] border-[#B7DFD7]";
  } else if (type === "info") {
    box.className =
      "mb-4 p-3 rounded-lg text-xs font-medium border bg-[#DDEBF1] text-[#0B6E99] border-[#B6D6E4]";
  } else {
    box.className =
      "mb-4 p-3 rounded-lg text-xs font-medium border bg-[#FBE4E4] text-[#E03E3E] border-[#F5C6C6]";
  }
  box.textContent = message;
}

function switchAuthTab(mode) {
  const isSignUp = mode === "signup";
  const tabSignIn = document.getElementById("tab-auth-signin");
  const tabSignUp = document.getElementById("tab-auth-signup");
  const formSignIn = document.getElementById("signin-form");
  const formSignUp = document.getElementById("signup-form");
  const heading = document.getElementById("auth-heading");
  const subheading = document.getElementById("auth-subheading");

  setAuthFeedback("");

  if (tabSignIn && tabSignUp) {
    tabSignIn.setAttribute("aria-selected", String(!isSignUp));
    tabSignUp.setAttribute("aria-selected", String(isSignUp));

    tabSignIn.className = !isSignUp
      ? "py-1.5 px-3 rounded-md font-semibold bg-white text-notion-text shadow-sm transition-all cursor-pointer"
      : "py-1.5 px-3 rounded-md font-medium text-notion-muted hover:text-notion-text transition-all cursor-pointer";

    tabSignUp.className = isSignUp
      ? "py-1.5 px-3 rounded-md font-semibold bg-white text-notion-text shadow-sm transition-all cursor-pointer"
      : "py-1.5 px-3 rounded-md font-medium text-notion-muted hover:text-notion-text transition-all cursor-pointer";
  }

  formSignIn?.classList.toggle("hidden", isSignUp);
  formSignUp?.classList.toggle("hidden", !isSignUp);

  if (heading && subheading) {
    if (isSignUp) {
      heading.textContent = "Crea tu cuenta personal en MecaKit";
      subheading.textContent =
        "Tendrás tu propio perfil independiente en la nube para guardar tus inventarios, componentes, ubicaciones y préstamos.";
    } else {
      heading.textContent = "Inicia sesión en tu MecaKit";
      subheading.textContent =
        "Accede desde cualquier dispositivo. Tus inventarios, componentes, ubicaciones y préstamos son privados y exclusivos de tu cuenta.";
    }
  }
}

async function handleAuthenticatedSession(sessionUser) {
  if (!sessionUser || isSyncingAuth) return;
  isSyncingAuth = true;
  try {
    setAuthFeedback("Cargando tus inventarios privados desde la nube...", "info");
    const cloudData = await fetchUserCloudState(sessionUser);
    state = {
      ...createEmptyAppState(),
      ...cloudData,
      activeScreen: "inventory",
      viewMode: "table",
      activeCategory: "Todos",
      loanFilter: "Todos",
      searchQuery: ""
    };

    document.getElementById("auth-screen")?.classList.add("hidden");
    document.getElementById("app-shell")?.classList.remove("hidden");
    setAuthFeedback("");
    renderAll();
  } catch (err) {
    console.error("Error cargando datos del usuario:", err);
    setAuthFeedback("No se pudieron cargar los datos de la cuenta. Intenta de nuevo.", "error");
  } finally {
    isSyncingAuth = false;
  }
}

function showUnauthenticatedScreen() {
  state = createEmptyAppState();
  closeDrawer();
  document.getElementById("app-shell")?.classList.add("hidden");
  document.getElementById("auth-screen")?.classList.remove("hidden");
}

// --- Helpers de Categorías Dinámicas ---
function getCategories() {
  if (!Array.isArray(state.categories) || state.categories.length === 0) {
    state.categories = structuredClone(DEFAULT_CATEGORIES);
  }
  return state.categories;
}

function getCategoryMeta(catName) {
  const found = getCategories().find(
    (c) => c.name.toLowerCase() === String(catName || "").toLowerCase()
  );
  if (found) return found;
  return { name: catName || "General", icon: "📦", color: "gray", isDefault: false };
}

function getCategoryPillClass(catName) {
  const meta = getCategoryMeta(catName);
  return `notion-tag-${meta.color || "gray"}`;
}

// --- Diálogo de Confirmación Segura antes de Eliminar ---
function askConfirmation({ title, message, confirmText = "Sí, eliminar definitivamente", onConfirm }) {
  const dialog = document.getElementById("confirm-delete-dialog");
  const titleEl = document.getElementById("confirm-delete-title");
  const msgEl = document.getElementById("confirm-delete-message");
  const acceptBtn = document.getElementById("btn-accept-confirm-delete");
  if (!dialog || !titleEl || !msgEl || !acceptBtn) return;

  titleEl.textContent = title;
  msgEl.textContent = message;
  acceptBtn.textContent = confirmText;
  pendingConfirmAction = onConfirm;

  dialog.showModal();
}

// --- Modern Web Guidance: light-dismiss-a-dialog fallback ---
function setupLightDismissFallback(dialogEl) {
  if (!dialogEl) return;
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    dialogEl.addEventListener("click", (event) => {
      if (event.target !== dialogEl) return;
      const rect = dialogEl.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (isDialogContent) return;
      dialogEl.close();
    });
  }
}

// --- Modern Web Guidance: required-field-feedback (:user-invalid + ARIA sync) ---
const UserInvalidFallback = (() => {
  const dirtyState = new WeakMap();

  const updateState = (input) => {
    if (!input.checkValidity) return;
    const isValid = input.checkValidity();
    input.classList.toggle("user-invalid-fallback", !isValid);
    input.classList.toggle("user-valid-fallback", isValid);
    if (!isValid) {
      input.setAttribute("aria-invalid", "true");
    } else {
      input.removeAttribute("aria-invalid");
    }
  };

  const handleEvent = (event) => {
    const input = event.target;
    if (event.type === "reset") {
      const controls = input.elements || [];
      for (const control of controls) {
        dirtyState.delete(control);
        control.classList.remove("user-invalid-fallback", "user-valid-fallback");
        control.removeAttribute("aria-invalid");
      }
      return;
    }
    if (!input || !input.checkValidity) return;

    if (event.type === "input" || event.type === "change") {
      const st = dirtyState.get(input) || { hasInteracted: false, hasBlurred: false };
      st.hasInteracted = true;
      dirtyState.set(input, st);
      if (st.hasBlurred) updateState(input);
    } else if (event.type === "blur") {
      const st = dirtyState.get(input) || { hasInteracted: false, hasBlurred: false };
      st.hasBlurred = true;
      dirtyState.set(input, st);
      if (st.hasInteracted) updateState(input);
    }
  };

  const init = (formEl) => {
    if (!formEl) return;
    const syncAriaInvalid = (input) => {
      if (!input.checkValidity()) {
        input.setAttribute("aria-invalid", "true");
      } else {
        input.removeAttribute("aria-invalid");
      }
    };

    formEl.addEventListener(
      "blur",
      (e) => {
        if (e.target.matches("input[required], select[required]")) {
          syncAriaInvalid(e.target);
        }
      },
      true
    );

    formEl.addEventListener("submit", () => {
      formEl.querySelectorAll("input[required], select[required]").forEach((el) => {
        syncAriaInvalid(el);
        el.classList.toggle("user-invalid-fallback", !el.checkValidity());
      });
    });

    formEl.addEventListener("input", (e) => {
      if (e.target.matches("input[required], select[required]") && e.target.checkValidity()) {
        e.target.removeAttribute("aria-invalid");
        e.target.classList.remove("user-invalid-fallback");
      }
    });

    if (!CSS.supports("selector(:user-invalid)")) {
      formEl.addEventListener("blur", handleEvent, true);
      formEl.addEventListener("input", handleEvent);
      formEl.addEventListener("change", handleEvent);
      formEl.addEventListener("reset", handleEvent, true);
    }
  };

  return { init };
})();

// --- Selectores de Datos Derivados ---
function getActiveInventory() {
  return (
    state.inventories.find((inv) => inv.id === state.activeInventoryId) ||
    state.inventories[0] || {
      id: "",
      name: "Inventario General",
      icon: "📦",
      badge: state.profile.career || "Inventario Personal",
      description: "Consulta en segundos tus componentes electrónicos y su ubicación física.",
      isDefault: true
    }
  );
}

function getInventoryComponents(inventoryId = state.activeInventoryId) {
  return state.components.filter((c) => c.inventoryId === inventoryId);
}

function getFilteredComponents() {
  const base = getInventoryComponents(state.activeInventoryId);
  const q = state.searchQuery.trim().toLowerCase();

  return base.filter((comp) => {
    if (state.activeCategory === "Agotados") {
      if (comp.quantity > 0) return false;
    } else if (state.activeCategory !== "Todos") {
      if (comp.category !== state.activeCategory) return false;
    }

    if (!q) return true;
    return (
      comp.name.toLowerCase().includes(q) ||
      comp.model.toLowerCase().includes(q) ||
      comp.location.toLowerCase().includes(q) ||
      comp.category.toLowerCase().includes(q)
    );
  });
}

function getComponentActiveLoans(componentId) {
  return state.loans.filter(
    (l) => l.componentId === componentId && l.status === "Pendiente"
  );
}

// --- Cambio de Pantalla Independiente (Inventario vs Préstamos) ---
function switchScreen(screenName) {
  state.activeScreen = screenName === "loans" ? "loans" : "inventory";
  renderAll();
  document.getElementById("main-canvas")?.scrollTo({ top: 0, behavior: "smooth" });
}

// --- Renderizado Completo de la Interfaz ---
function renderAll() {
  if (!state.user) return;
  renderUserProfile();
  renderScreensAndNavigationState();
  renderSidebar();
  renderActiveInventoryHeaderAndKPIs();
  renderCategoryPills();
  renderViewTabsState();
  renderInventoryContent();
  renderLoansScreen();
}

function renderUserProfile() {
  const fullName = state.profile?.fullName || "Estudiante";
  const career = state.profile?.career || "Ing. Mecatrónica";
  const email = state.profile?.email || state.user?.email || "";
  const initials =
    fullName
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const avatarEl = document.getElementById("header-user-avatar");
  const headerNameEl = document.getElementById("header-user-name");
  const sidebarNameEl = document.getElementById("sidebar-user-name");
  const sidebarCareerEl = document.getElementById("sidebar-user-career");
  const sidebarEmailEl = document.getElementById("sidebar-user-email");

  if (avatarEl) avatarEl.textContent = initials;
  if (headerNameEl) headerNameEl.textContent = fullName;
  if (sidebarNameEl) sidebarNameEl.textContent = fullName;
  if (sidebarCareerEl) sidebarCareerEl.textContent = career;
  if (sidebarEmailEl) sidebarEmailEl.textContent = `🔒 Cuenta: ${email}`;
}

function renderScreensAndNavigationState() {
  const isLoans = state.activeScreen === "loans";
  const inv = getActiveInventory();
  const pendingLoansCount = state.loans.filter((l) => l.status === "Pendiente").length;

  document.getElementById("screen-inventory")?.classList.toggle("hidden", isLoans);
  document.getElementById("screen-loans")?.classList.toggle("hidden", !isLoans);

  const breadcrumb = document.getElementById("header-breadcrumb-current");
  if (breadcrumb) {
    breadcrumb.textContent = isLoans
      ? "🤝 Seguimiento de Préstamos"
      : `${inv.icon} ${inv.name}`;
  }

  const topInvBtn = document.getElementById("top-screen-inventory");
  const topLoansBtn = document.getElementById("top-screen-loans");
  const topLoansBadge = document.getElementById("top-loans-badge");

  if (topLoansBadge) {
    topLoansBadge.textContent = String(pendingLoansCount);
  }

  if (topInvBtn && topLoansBtn) {
    topInvBtn.className = !isLoans
      ? "px-2.5 py-1 rounded font-semibold bg-white text-notion-text shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
      : "px-2.5 py-1 rounded font-medium text-notion-muted hover:text-notion-text flex items-center gap-1.5 cursor-pointer transition-all";

    topLoansBtn.className = isLoans
      ? "px-2.5 py-1 rounded font-semibold bg-white text-notion-text shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
      : "px-2.5 py-1 rounded font-medium text-notion-muted hover:text-notion-text flex items-center gap-1.5 cursor-pointer transition-all";
  }

  const mobInvBtn = document.getElementById("mob-nav-inventory");
  const mobLoansBtn = document.getElementById("mob-nav-loans");
  const mobLoansBadge = document.getElementById("mob-loans-badge");

  if (mobLoansBadge) {
    mobLoansBadge.textContent = String(pendingLoansCount);
    mobLoansBadge.classList.toggle("hidden", pendingLoansCount === 0);
  }

  if (mobInvBtn && mobLoansBtn) {
    mobInvBtn.className = !isLoans
      ? "flex flex-col items-center gap-0.5 text-notion-blue font-semibold py-0.5 px-3 cursor-pointer"
      : "flex flex-col items-center gap-0.5 text-notion-muted hover:text-notion-text py-0.5 px-3 cursor-pointer";

    mobLoansBtn.className = isLoans
      ? "relative flex flex-col items-center gap-0.5 text-notion-blue font-semibold py-0.5 px-3 cursor-pointer"
      : "relative flex flex-col items-center gap-0.5 text-notion-muted hover:text-notion-text py-0.5 px-3 cursor-pointer";
  }
}

function renderSidebar() {
  const invListEl = document.getElementById("sidebar-inventories-list");
  if (invListEl) {
    invListEl.innerHTML = state.inventories
      .map((inv) => {
        const isActive =
          state.activeScreen === "inventory" && inv.id === state.activeInventoryId;
        const count = getInventoryComponents(inv.id).length;
        return `
          <div class="group flex items-center justify-between rounded transition-colors ${
            isActive
              ? "bg-[#E5E5E2] text-notion-text font-semibold"
              : "text-notion-muted hover:bg-notion-hover hover:text-notion-text"
          }">
            <button
              type="button"
              data-inv-id="${escapeHtml(inv.id)}"
              class="sidebar-inv-btn flex-1 flex items-center gap-2 px-2.5 py-1.5 text-xs text-left truncate cursor-pointer"
            >
              <span class="text-sm">${escapeHtml(inv.icon)}</span>
              <span class="truncate">${escapeHtml(inv.name)}</span>
            </button>
            <div class="flex items-center gap-0.5 pr-1.5">
              <button
                type="button"
                data-rename-inv-id="${escapeHtml(inv.id)}"
                title="Renombrar o editar inventario"
                class="opacity-70 md:opacity-0 md:group-hover:opacity-100 p-0.5 rounded hover:bg-white/80 text-notion-muted hover:text-notion-text transition-opacity cursor-pointer"
              >
                <span class="material-symbols-outlined text-[13px]">edit</span>
              </button>
              ${
                !inv.isDefault
                  ? `<button
                      type="button"
                      data-delete-inv-id="${escapeHtml(inv.id)}"
                      title="Eliminar inventario"
                      class="opacity-70 md:opacity-0 md:group-hover:opacity-100 p-0.5 rounded hover:bg-[#FBE4E4] text-notion-muted hover:text-[#E03E3E] transition-opacity cursor-pointer"
                    >
                      <span class="material-symbols-outlined text-[13px]">delete</span>
                    </button>`
                  : ""
              }
              <span class="text-[10px] font-mono ${
                isActive ? "bg-white text-notion-text font-semibold" : "text-notion-muted"
              } px-1.5 py-0.5 rounded">${count}</span>
            </div>
          </div>
        `;
      })
      .join("");
  }

  const currentComps = getInventoryComponents(state.activeInventoryId);
  const agotadosCount = currentComps.filter((c) => c.quantity === 0).length;
  const totalUnitsAll = state.components.reduce((acc, c) => acc + Number(c.quantity || 0), 0);

  document.getElementById("sidebar-total-badge").textContent = String(currentComps.length);
  document.getElementById("sidebar-agotados-badge").textContent = String(agotadosCount);
  document.getElementById("sidebar-total-units").textContent = `${totalUnitsAll} uds`;

  const navAllBtn = document.getElementById("nav-filter-all");
  const navAgotadosBtn = document.getElementById("nav-filter-agotados");
  if (navAllBtn && navAgotadosBtn) {
    const isAllActive =
      state.activeScreen === "inventory" && state.activeCategory === "Todos";
    const isAgotadosActive =
      state.activeScreen === "inventory" && state.activeCategory === "Agotados";

    navAllBtn.className = `w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded transition-colors cursor-pointer ${
      isAllActive ? "bg-[#E5E5E2] text-notion-text font-semibold" : "text-notion-text hover:bg-notion-hover"
    }`;
    navAgotadosBtn.className = `w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded transition-colors cursor-pointer ${
      isAgotadosActive ? "bg-[#E5E5E2] text-notion-text font-semibold" : "text-notion-text hover:bg-notion-hover"
    }`;
  }
}

function renderActiveInventoryHeaderAndKPIs() {
  const inv = getActiveInventory();
  const comps = getInventoryComponents(inv.id);
  const totalUnits = comps.reduce((sum, c) => sum + Number(c.quantity || 0), 0);
  const agotados = comps.filter((c) => c.quantity === 0).length;
  const activeLoans = state.loans.filter((l) => l.status === "Pendiente").length;

  document.getElementById("active-inv-icon").textContent = inv.icon;
  document.getElementById("active-inv-title").textContent = inv.name;
  document.getElementById("active-inv-badge").textContent = inv.badge || "Inventario Personal";
  document.getElementById("active-inv-desc").textContent = inv.description;

  const deleteBtn = document.getElementById("btn-delete-inventory");
  if (deleteBtn) {
    deleteBtn.classList.toggle("hidden", Boolean(inv.isDefault));
  }

  document.getElementById("kpi-total-refs").textContent = String(comps.length);
  document.getElementById("kpi-total-units").textContent = `${totalUnits} uds en stock`;
  document.getElementById("kpi-total-agotados").textContent = String(agotados);
  document.getElementById("kpi-total-loans").textContent = String(activeLoans);
}

function renderCategoryPills() {
  const bar = document.getElementById("category-pills-bar");
  if (!bar) return;

  const comps = getInventoryComponents(state.activeInventoryId);
  const agotadosCount = comps.filter((c) => c.quantity === 0).length;

  const pills = [
    { key: "Todos", label: `Todos (${comps.length})`, pillClass: "", isCustom: false },
    ...getCategories().map((cat) => ({
      key: cat.name,
      label: `${cat.icon} ${cat.name} (${comps.filter((c) => c.category === cat.name).length})`,
      pillClass: getCategoryPillClass(cat.name),
      isCustom: !cat.isDefault
    })),
    {
      key: "Agotados",
      label: `⚠️ Solo Agotados (${agotadosCount})`,
      pillClass: "bg-[#FBE4E4] text-[#E03E3E]",
      isCustom: false
    }
  ];

  const pillsHtml = pills
    .map((p) => {
      const isSelected = state.activeCategory === p.key;
      const activeRing = isSelected
        ? "ring-2 ring-[#37352F] font-semibold"
        : "opacity-85 hover:opacity-100";
      const baseBg =
        p.key === "Todos"
          ? isSelected
            ? "bg-[#37352F] text-white"
            : "bg-notion-sidebar text-notion-text"
          : p.pillClass;

      return `
        <div class="inline-flex items-center rounded ${baseBg} ${activeRing} transition-all">
          <button
            type="button"
            data-pill-cat="${escapeHtml(p.key)}"
            class="cat-pill-btn whitespace-nowrap px-2.5 py-1 text-xs cursor-pointer"
          >
            ${escapeHtml(p.label)}
          </button>
          ${
            p.isCustom
              ? `<button
                  type="button"
                  data-delete-cat="${escapeHtml(p.key)}"
                  title="Eliminar categoría ${escapeHtml(p.key)}"
                  class="pr-1.5 pl-0.5 text-[11px] opacity-70 hover:opacity-100 cursor-pointer"
                >✕</button>`
              : ""
          }
        </div>
      `;
    })
    .join("");

  bar.innerHTML = `
    ${pillsHtml}
    <button
      type="button"
      id="btn-pill-new-category"
      title="Crear nueva categoría personalizada"
      class="whitespace-nowrap px-2.5 py-1 rounded text-xs font-medium bg-white border border-dashed border-notion-border text-notion-blue hover:bg-notion-sidebar transition-colors cursor-pointer"
    >
      + Categoría
    </button>
  `;
}

function renderViewTabsState() {
  document.querySelectorAll(".view-tab").forEach((btn) => {
    const view = btn.getAttribute("data-view");
    const isActive = view === state.viewMode;
    btn.className = isActive
      ? "view-tab px-2.5 py-1 rounded font-semibold bg-white text-notion-text shadow-sm flex items-center gap-1 cursor-pointer"
      : "view-tab px-2.5 py-1 rounded font-medium text-notion-muted hover:text-notion-text flex items-center gap-1 cursor-pointer";
  });
}

// --- Renderizado de Componentes (Tabla / Galería / Ubicación Física) ---
function renderInventoryContent() {
  const container = document.getElementById("inventory-container");
  if (!container) return;

  const filtered = getFilteredComponents();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="border border-dashed border-notion-border rounded-lg p-8 text-center bg-notion-sidebar/40">
        <div class="text-2xl mb-2">📦</div>
        <h3 class="text-sm font-semibold text-notion-text">No hay componentes en esta vista</h3>
        <p class="text-xs text-notion-muted mt-1 max-w-md mx-auto">
          ${
            state.searchQuery || state.activeCategory !== "Todos"
              ? `No hay piezas que coincidan con tu búsqueda o filtro actual en <strong>${escapeHtml(
                  getActiveInventory().name
                )}</strong>.`
              : `Tu inventario <strong>${escapeHtml(
                  getActiveInventory().name
                )}</strong> está listo. Anota tu primer componente electrónico o carga el kit de ejemplo.`
          }
        </p>
        <div class="mt-4 flex flex-wrap items-center justify-center gap-2">
          ${
            state.searchQuery || state.activeCategory !== "Todos"
              ? `<button type="button" id="btn-empty-reset-filters" class="px-3 py-1.5 text-xs font-medium bg-white border border-notion-border rounded hover:bg-notion-hover cursor-pointer">Ver todos los componentes</button>`
              : ""
          }
          <button type="button" id="btn-empty-new-comp" class="px-3 py-1.5 text-xs font-semibold bg-notion-blue text-white rounded hover:bg-notion-blue-hover cursor-pointer">+ Anotar componente aquí</button>
        </div>
      </div>
    `;
    return;
  }

  if (state.viewMode === "gallery") {
    container.innerHTML = renderGalleryView(filtered);
  } else if (state.viewMode === "locations") {
    container.innerHTML = renderLocationsView(filtered);
  } else {
    container.innerHTML = renderTableView(filtered);
  }
}

function renderStatusBadge(comp) {
  const activeLoans = getComponentActiveLoans(comp.id);
  const loanPill =
    activeLoans.length > 0
      ? `<span class="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FBF3DB] text-[#8F6B00] inline-flex items-center gap-1" title="Prestado a ${escapeHtml(
          activeLoans.map((l) => l.borrowerName).join(", ")
        )}">🤝 ${activeLoans.reduce((s, l) => s + l.quantity, 0)} prestado(s)</span>`
      : "";

  if (comp.quantity === 0) {
    return `
      <div class="inline-flex flex-wrap items-center justify-center gap-1">
        <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#FBE4E4] text-[#E03E3E] border border-[#F5C6C6]">
          ⚠️ Agotado
        </span>
        ${loanPill}
      </div>
    `;
  }
  return `
    <div class="inline-flex flex-wrap items-center justify-center gap-1">
      <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#EDF3EC] text-[#0F7B6C]">
        Disponible
      </span>
      ${loanPill}
    </div>
  `;
}

function renderStockStepper(comp) {
  const isZero = comp.quantity === 0;
  return `
    <div class="inline-flex items-center gap-1 bg-notion-sidebar border border-notion-border rounded p-0.5">
      <button
        type="button"
        data-stock-action="dec"
        data-comp-id="${escapeHtml(comp.id)}"
        aria-label="Restar 1 unidad a ${escapeHtml(comp.name)}"
        ${isZero ? "disabled" : ""}
        class="w-7 h-7 rounded bg-white hover:bg-notion-hover disabled:opacity-40 disabled:cursor-not-allowed border border-notion-border flex items-center justify-center font-bold text-sm text-notion-text transition-all active:scale-90 cursor-pointer"
      >-</button>
      <span
        data-stock-count="${escapeHtml(comp.id)}"
        class="w-8 text-center font-mono font-bold text-xs ${
          isZero ? "text-[#E03E3E]" : "text-notion-text"
        }"
      >${comp.quantity}</span>
      <button
        type="button"
        data-stock-action="inc"
        data-comp-id="${escapeHtml(comp.id)}"
        aria-label="Sumar 1 unidad a ${escapeHtml(comp.name)}"
        class="w-7 h-7 rounded bg-white hover:bg-notion-hover border border-notion-border flex items-center justify-center font-bold text-sm text-notion-text transition-all active:scale-90 cursor-pointer"
      >+</button>
    </div>
  `;
}

// Vista 1: Tabla estilo Base de Datos de Notion (con responsive-table de modern-web-guidance)
function renderTableView(components) {
  return `
    <div tabindex="0" role="region" aria-labelledby="inventory-table-caption" class="table-wrapper border border-notion-border rounded-lg bg-white">
      <table class="notion-table text-left text-xs">
        <caption id="inventory-table-caption" class="sr-only">
          Componentes del inventario ${escapeHtml(getActiveInventory().name)}
        </caption>
        <thead>
          <tr class="text-notion-muted border-b border-notion-border font-semibold">
            <th scope="col" class="py-2.5 px-3 min-w-[220px]">Componente &amp; Modelo</th>
            <th scope="col" class="py-2.5 px-3">Categoría</th>
            <th scope="col" class="py-2.5 px-3 min-w-[180px]">Ubicación Física</th>
            <th scope="col" class="py-2.5 px-3 text-center">Estado</th>
            <th scope="col" class="py-2.5 px-3 text-center min-w-[130px]">Stock (- / +)</th>
            <th scope="col" class="py-2.5 px-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-notion-border">
          ${components
            .map((comp) => {
              const isZero = comp.quantity === 0;
              const catMeta = getCategoryMeta(comp.category);
              const pillClass = getCategoryPillClass(comp.category);
              return `
                <tr class="hover:bg-notion-sidebar/50 transition-colors ${
                  isZero ? "row-agotado bg-[#FFF9F9]" : ""
                }">
                  <th scope="row" class="py-2.5 px-3 font-normal text-left">
                    <div class="flex items-start gap-2.5">
                      <span class="text-base mt-0.5">${escapeHtml(catMeta.icon)}</span>
                      <div>
                        <div class="font-semibold text-notion-text">${escapeHtml(comp.name)}</div>
                        <div class="flex flex-wrap items-center gap-1.5 mt-0.5">
                          <span class="font-mono text-[11px] text-notion-text px-1.5 py-0.2 rounded bg-notion-sidebar border border-notion-border">
                            ${escapeHtml(comp.model)}
                          </span>
                          ${
                            comp.notes
                              ? `<span class="text-[11px] text-notion-muted truncate max-w-[220px]" title="${escapeHtml(
                                  comp.notes
                                )}">${escapeHtml(comp.notes)}</span>`
                              : ""
                          }
                        </div>
                      </div>
                    </div>
                  </th>
                  <td class="py-2.5 px-3">
                    <span class="px-2 py-0.5 rounded text-[11px] font-medium ${pillClass}">
                      ${escapeHtml(comp.category)}
                    </span>
                  </td>
                  <td class="py-2.5 px-3">
                    <div class="flex items-center gap-1.5 text-notion-text font-mono text-[11px]">
                      <span>📍</span>
                      <span>${escapeHtml(comp.location)}</span>
                    </div>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    ${renderStatusBadge(comp)}
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    ${renderStockStepper(comp)}
                  </td>
                  <td class="py-2.5 px-3 text-right">
                    <div class="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        data-loan-comp-id="${escapeHtml(comp.id)}"
                        ${isZero ? "disabled" : ""}
                        title="${
                          isZero
                            ? "Sin unidades disponibles para prestar"
                            : "Prestar unidad a un compañero"
                        }"
                        class="btn-quick-loan text-xs px-2 py-1 rounded border border-notion-border bg-white hover:bg-notion-hover disabled:opacity-40 disabled:cursor-not-allowed text-notion-text font-medium cursor-pointer"
                      >
                        🤝 Prestar
                      </button>
                      <button
                        type="button"
                        data-edit-comp-id="${escapeHtml(comp.id)}"
                        class="btn-edit-comp text-xs text-notion-blue hover:underline font-medium px-1 cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-delete-comp-id="${escapeHtml(comp.id)}"
                        title="Eliminar este componente"
                        class="btn-delete-comp-row p-1 rounded text-notion-muted hover:text-[#E03E3E] hover:bg-[#FBE4E4] transition-colors cursor-pointer"
                      >
                        <span class="material-symbols-outlined text-[15px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

// Vista 2: Tarjetas estilo Notion Gallery
function renderGalleryView(components) {
  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      ${components
        .map((comp) => {
          const isZero = comp.quantity === 0;
          const catMeta = getCategoryMeta(comp.category);
          const pillClass = getCategoryPillClass(comp.category);
          return `
            <article class="rounded-lg border ${
              isZero ? "border-[#F5C6C6] bg-[#FFFDFD]" : "border-notion-border bg-white"
            } p-3.5 flex flex-col justify-between gap-3 hover:border-notion-text/30 transition-all">
              <div>
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-1.5">
                    <span class="text-base">${escapeHtml(catMeta.icon)}</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-medium ${pillClass}">${escapeHtml(
            comp.category
          )}</span>
                  </div>
                  ${renderStatusBadge(comp)}
                </div>

                <h3 class="font-headline font-semibold text-sm text-notion-text mt-2">
                  ${escapeHtml(comp.name)}
                </h3>
                <div class="mt-1">
                  <span class="font-mono text-xs px-1.5 py-0.5 rounded bg-notion-sidebar border border-notion-border text-notion-text">
                    ${escapeHtml(comp.model)}
                  </span>
                </div>

                <div class="mt-2.5 flex items-center gap-1.5 text-xs text-notion-muted font-mono">
                  <span>📍</span>
                  <span class="truncate">${escapeHtml(comp.location)}</span>
                </div>
                ${
                  comp.notes
                    ? `<p class="mt-1.5 text-[11px] text-notion-muted line-clamp-2">${escapeHtml(
                        comp.notes
                      )}</p>`
                    : ""
                }
              </div>

              <div class="pt-2.5 border-t border-notion-border flex items-center justify-between gap-2">
                <div class="flex items-center gap-1.5">
                  <button
                    type="button"
                    data-edit-comp-id="${escapeHtml(comp.id)}"
                    class="btn-edit-comp text-xs text-notion-blue hover:underline font-medium cursor-pointer"
                  >
                    Editar
                  </button>
                  <span class="text-notion-border">·</span>
                  <button
                    type="button"
                    data-loan-comp-id="${escapeHtml(comp.id)}"
                    ${isZero ? "disabled" : ""}
                    class="btn-quick-loan text-xs text-notion-muted hover:text-notion-text disabled:opacity-40 cursor-pointer"
                  >
                    🤝 Prestar
                  </button>
                  <span class="text-notion-border">·</span>
                  <button
                    type="button"
                    data-delete-comp-id="${escapeHtml(comp.id)}"
                    title="Eliminar componente"
                    class="btn-delete-comp-row text-xs text-notion-muted hover:text-[#E03E3E] cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
                ${renderStockStepper(comp)}
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

// Vista 3: Agrupado por Ubicación Física
function renderLocationsView(components) {
  const groups = new Map();
  for (const comp of components) {
    const boxName = comp.location.split("·")[0].trim() || "Sin ubicación";
    if (!groups.has(boxName)) groups.set(boxName, []);
    groups.get(boxName).push(comp);
  }

  return `
    <div class="space-y-4">
      ${Array.from(groups.entries())
        .map(
          ([box, items]) => `
          <div class="border border-notion-border rounded-lg overflow-hidden bg-white">
            <div class="bg-notion-sidebar px-4 py-2 border-b border-notion-border flex items-center justify-between">
              <div class="flex items-center gap-2 font-headline text-xs font-bold text-notion-text">
                <span>📍</span>
                <span>${escapeHtml(box)}</span>
              </div>
              <span class="text-[11px] font-mono text-notion-muted">${items.length} referencias</span>
            </div>
            <div class="divide-y divide-notion-border">
              ${items
                .map(
                  (comp) => `
                  <div class="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 hover:bg-notion-sidebar/40">
                    <div class="min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="font-semibold text-xs text-notion-text">${escapeHtml(
                          comp.name
                        )}</span>
                        <span class="font-mono text-[11px] px-1.5 py-0.2 rounded bg-notion-sidebar border border-notion-border">${escapeHtml(
                          comp.model
                        )}</span>
                        <span class="px-2 py-0.2 rounded text-[10px] font-medium ${getCategoryPillClass(
                          comp.category
                        )}">${escapeHtml(comp.category)}</span>
                        ${
                          comp.quantity === 0
                            ? `<span class="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-[#FBE4E4] text-[#E03E3E]">⚠️ Agotado</span>`
                            : ""
                        }
                      </div>
                      <div class="text-[11px] font-mono text-notion-muted mt-0.5">
                        Sub-ubicación: ${escapeHtml(comp.location)}
                      </div>
                    </div>
                    <div class="flex items-center gap-2.5">
                      ${renderStockStepper(comp)}
                      <button type="button" data-edit-comp-id="${escapeHtml(
                        comp.id
                      )}" class="btn-edit-comp text-xs text-notion-blue hover:underline font-medium cursor-pointer">Editar</button>
                      <button type="button" data-delete-comp-id="${escapeHtml(
                        comp.id
                      )}" class="btn-delete-comp-row p-1 rounded text-notion-muted hover:text-[#E03E3E] hover:bg-[#FBE4E4] cursor-pointer" title="Eliminar componente">
                        <span class="material-symbols-outlined text-[15px]">delete</span>
                      </button>
                    </div>
                  </div>
                `
                )
                .join("")}
            </div>
          </div>
        `
        )
        .join("")}
    </div>
  `;
}

// --- Renderizado de la Pantalla Independiente de Seguimiento de Préstamos (PRD Req #6) ---
function renderLoansScreen() {
  const container = document.getElementById("loans-container");
  const pill = document.getElementById("loans-pending-pill");
  if (!container || !pill) return;

  const pendingLoans = state.loans.filter((l) => l.status === "Pendiente");
  const returnedLoans = state.loans.filter((l) => l.status === "Devuelto");
  const unitsOut = pendingLoans.reduce((sum, l) => sum + Number(l.quantity || 1), 0);

  pill.textContent = `${pendingLoans.length} PENDIENTE${pendingLoans.length === 1 ? "" : "S"}`;

  const kpiActive = document.getElementById("loans-kpi-active");
  const kpiUnits = document.getElementById("loans-kpi-units");
  const kpiReturned = document.getElementById("loans-kpi-returned");
  if (kpiActive) kpiActive.textContent = String(pendingLoans.length);
  if (kpiUnits) kpiUnits.textContent = String(unitsOut);
  if (kpiReturned) kpiReturned.textContent = String(returnedLoans.length);

  document.querySelectorAll(".loan-filter-btn").forEach((btn) => {
    const f = btn.getAttribute("data-loan-filter");
    const isSelected = f === state.loanFilter;
    const activeRing = isSelected ? "ring-2 ring-[#37352F] font-semibold" : "opacity-80 hover:opacity-100";
    if (f === "Todos") {
      btn.className = `loan-filter-btn px-2.5 py-1 rounded text-xs cursor-pointer ${
        isSelected ? "bg-[#37352F] text-white font-semibold" : "bg-notion-sidebar text-notion-text"
      }`;
    } else if (f === "Pendiente") {
      btn.className = `loan-filter-btn px-2.5 py-1 rounded text-xs bg-[#FBF3DB] text-[#8F6B00] cursor-pointer ${activeRing}`;
    } else {
      btn.className = `loan-filter-btn px-2.5 py-1 rounded text-xs bg-[#EDF3EC] text-[#0F7B6C] cursor-pointer ${activeRing}`;
    }
  });

  const filteredLoans = state.loans.filter((l) => {
    if (state.loanFilter === "Todos") return true;
    return l.status === state.loanFilter;
  });

  if (filteredLoans.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-xs text-notion-muted">
        <div class="text-2xl mb-2">🤝</div>
        <div class="font-semibold text-notion-text">No hay préstamos en esta vista</div>
        <p class="mt-1">Usa el botón <strong>"Registrar préstamo"</strong> cuando le prestes un componente a un compañero.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs border-collapse">
        <thead>
          <tr class="bg-notion-sidebar text-notion-muted border-b border-notion-border font-semibold">
            <th class="py-2.5 px-3">Componente Prestado</th>
            <th class="py-2.5 px-3">Compañero / Referencia</th>
            <th class="py-2.5 px-3 text-center">Cant.</th>
            <th class="py-2.5 px-3">Fecha</th>
            <th class="py-2.5 px-3 text-center">Estado de Devolución</th>
            <th class="py-2.5 px-3 text-right">Acción</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-notion-border">
          ${filteredLoans
            .map((loan) => {
              const isPending = loan.status === "Pendiente";
              const initials = loan.borrowerName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              return `
                <tr class="hover:bg-notion-sidebar/40 transition-colors ${
                  !isPending ? "opacity-60" : ""
                }">
                  <td class="py-2.5 px-3 font-medium text-notion-text">
                    🤝 ${escapeHtml(loan.componentName)}
                  </td>
                  <td class="py-2.5 px-3">
                    <div class="flex items-center gap-2">
                      <span class="w-5 h-5 rounded-full bg-[#DDEBF1] text-[#0B6E99] flex items-center justify-center font-bold text-[10px]">
                        ${escapeHtml(initials)}
                      </span>
                      <div>
                        <span class="font-medium text-notion-text">${escapeHtml(
                          loan.borrowerName
                        )}</span>
                        ${
                          loan.borrowerGroup
                            ? `<span class="text-notion-muted text-[11px] ml-1">(${escapeHtml(
                                loan.borrowerGroup
                              )})</span>`
                            : ""
                        }
                      </div>
                    </div>
                  </td>
                  <td class="py-2.5 px-3 text-center font-mono font-bold">
                    x${loan.quantity}
                  </td>
                  <td class="py-2.5 px-3 font-mono text-[11px] text-notion-muted">
                    ${escapeHtml(loan.date)}
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    ${
                      isPending
                        ? `<span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#FBF3DB] text-[#8F6B00]">Pendiente de devolución</span>`
                        : `<span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#EDF3EC] text-[#0F7B6C]">✓ Devuelto al taller</span>`
                    }
                  </td>
                  <td class="py-2.5 px-3 text-right">
                    ${
                      isPending
                        ? `<button
                            type="button"
                            data-return-loan-id="${escapeHtml(loan.id)}"
                            class="btn-return-loan px-2.5 py-1 text-xs bg-white border border-notion-border hover:bg-notion-hover text-notion-blue font-semibold rounded transition-colors cursor-pointer"
                          >
                            ✓ Marcar devuelto (+${loan.quantity} stock)
                          </button>`
                        : `<button
                            type="button"
                            data-delete-loan-id="${escapeHtml(loan.id)}"
                            class="btn-delete-loan text-[11px] text-notion-muted hover:text-[#E03E3E] cursor-pointer"
                          >
                            Borrar registro
                          </button>`
                    }
                  </td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

// --- Acciones Interactivas: Stock +/- de un toque sincronizado en Supabase (PRD Req #2 & #4) ---
async function adjustComponentStock(compId, delta) {
  const comp = state.components.find((c) => c.id === compId);
  if (!comp) return;

  const nextQty = Math.max(0, Number(comp.quantity || 0) + delta);
  if (nextQty === comp.quantity) return;

  const prevQty = comp.quantity;
  comp.quantity = nextQty;
  renderAll();

  const { error } = await supabase
    .from("components")
    .update({ quantity: nextQty })
    .eq("id", comp.id);

  if (error) {
    comp.quantity = prevQty;
    renderAll();
    showToast("No se pudo actualizar el stock en la nube", "⚠️");
    return;
  }

  if (nextQty === 0) {
    showToast(`${comp.model} quedó en 0 uds — Marcado como Agotado`, "⚠️");
  } else {
    showToast(
      `Stock actualizado: ${comp.model} → ${nextQty} ${nextQty === 1 ? "unidad" : "unidades"}`,
      delta > 0 ? "➕" : "➖"
    );
  }
}

// --- Confirmación de Eliminación de Componente, Inventario y Categoría (Supabase) ---
function promptDeleteComponent(compId) {
  const comp = state.components.find((c) => c.id === compId);
  if (!comp) return;

  askConfirmation({
    title: `¿Eliminar "${comp.name}" (${comp.model})?`,
    message: `Se eliminará este componente (${comp.quantity} unidades en ${comp.location}) de tu cuenta en la nube. ¿Deseas continuar?`,
    confirmText: "Sí, eliminar componente",
    onConfirm: async () => {
      const { error } = await supabase.from("components").delete().eq("id", compId);
      if (error) {
        showToast("Error al eliminar el componente", "⚠️");
        return;
      }
      state.components = state.components.filter((c) => c.id !== compId);
      closeDrawer();
      renderAll();
      showToast(`Componente eliminado: ${comp.model}`, "🗑️");
    }
  });
}

function promptDeleteInventory(invId) {
  const inv = state.inventories.find((i) => i.id === invId);
  if (!inv || inv.isDefault) return;

  const compCount = getInventoryComponents(inv.id).length;
  askConfirmation({
    title: `¿Eliminar el inventario "${inv.icon} ${inv.name}"?`,
    message:
      compCount > 0
        ? `Este inventario contiene ${compCount} componente(s) registrado(s) que también se eliminarán de tu cuenta. ¿Estás seguro?`
        : `Se eliminará el inventario "${inv.name}". ¿Estás seguro de continuar?`,
    confirmText: "Sí, eliminar inventario",
    onConfirm: async () => {
      const { error } = await supabase.from("inventories").delete().eq("id", inv.id);
      if (error) {
        showToast("Error al eliminar el inventario", "⚠️");
        return;
      }
      state.components = state.components.filter((c) => c.inventoryId !== inv.id);
      state.loans = state.loans.filter((l) => l.inventoryId !== inv.id);
      state.inventories = state.inventories.filter((i) => i.id !== inv.id);
      if (state.activeInventoryId === inv.id) {
        state.activeInventoryId = state.inventories[0]?.id || "";
      }
      renderAll();
      showToast(`Inventario "${inv.name}" eliminado`, "🗑️");
    }
  });
}

function promptDeleteCategory(catName) {
  const cat = getCategories().find((c) => c.name === catName);
  if (!cat || cat.isDefault) return;

  const affected = state.components.filter((c) => c.category === catName).length;
  askConfirmation({
    title: `¿Eliminar la categoría "${cat.icon} ${cat.name}"?`,
    message:
      affected > 0
        ? `Hay ${affected} componente(s) con esta categoría (pasarán a "Pasivos"). ¿Estás seguro de eliminar la categoría "${cat.name}"?`
        : `Se eliminará la categoría personalizada "${cat.name}". ¿Estás seguro?`,
    confirmText: "Sí, eliminar categoría",
    onConfirm: async () => {
      if (affected > 0) {
        await supabase
          .from("components")
          .update({ category: "Pasivos" })
          .eq("user_id", state.user.id)
          .eq("category", catName);
      }
      await supabase
        .from("categories")
        .delete()
        .eq("user_id", state.user.id)
        .eq("name", catName);

      state.components.forEach((c) => {
        if (c.category === catName) c.category = "Pasivos";
      });
      state.categories = getCategories().filter((c) => c.name !== catName);
      if (state.activeCategory === catName) state.activeCategory = "Todos";
      renderAll();
      showToast(`Categoría "${catName}" eliminada`, "🗑️");
    }
  });
}

// --- Side-Peek Drawer: Anotar o Editar Componente (PRD Req #1) ---
function populateDrawerCategorySelect(selectedCatName) {
  const select = document.getElementById("comp-category");
  if (!select) return;

  const cats = getCategories();
  const target =
    selectedCatName && cats.some((c) => c.name === selectedCatName)
      ? selectedCatName
      : cats[0]?.name || "Sensores";

  select.innerHTML = cats
    .map(
      (cat) =>
        `<option value="${escapeHtml(cat.name)}" ${
          cat.name === target ? "selected" : ""
        }>${escapeHtml(cat.icon)} ${escapeHtml(cat.name)}</option>`
    )
    .join("");
}

function populateDrawerInventorySelect(selectedInvId) {
  const select = document.getElementById("comp-inventory");
  if (!select) return;
  select.innerHTML = state.inventories
    .map(
      (inv) =>
        `<option value="${escapeHtml(inv.id)}" ${
          inv.id === selectedInvId ? "selected" : ""
        }>${escapeHtml(inv.icon)} ${escapeHtml(inv.name)}</option>`
    )
    .join("");
}

function updateDrawerStatusPreview() {
  const qtyInput = document.getElementById("comp-quantity");
  const statusPill = document.getElementById("drawer-stock-status-pill");
  const catSelect = document.getElementById("comp-category");
  const emojiEl = document.getElementById("drawer-category-emoji");

  if (emojiEl && catSelect) {
    const meta = getCategoryMeta(catSelect.value);
    emojiEl.textContent = meta.icon || "📦";
  }

  if (!qtyInput || !statusPill) return;
  const val = Math.max(0, parseInt(qtyInput.value || "0", 10));
  if (val === 0) {
    statusPill.textContent = "⚠️ Agotado (0)";
    statusPill.className =
      "text-[11px] px-2 py-0.5 rounded font-semibold bg-[#FBE4E4] text-[#E03E3E]";
  } else {
    statusPill.textContent = "Disponible";
    statusPill.className =
      "text-[11px] px-2 py-0.5 rounded font-medium bg-[#EDF3EC] text-[#0F7B6C]";
  }
}

function openDrawerForNew() {
  const drawer = document.getElementById("side-peek-drawer");
  const form = document.getElementById("component-form");
  if (!drawer || !form) return;

  form.reset();
  document.getElementById("comp-id").value = "";
  document.getElementById("drawer-mode-label").textContent = "Anotar Nuevo Componente";
  document.getElementById("btn-delete-component").classList.add("hidden");
  document.getElementById("comp-quantity").value = "1";

  const preferredCat =
    state.activeCategory !== "Todos" && state.activeCategory !== "Agotados"
      ? state.activeCategory
      : "Sensores";
  populateDrawerCategorySelect(preferredCat);
  populateDrawerInventorySelect(state.activeInventoryId);
  document.getElementById("instant-loan-fields").classList.add("hidden");

  updateDrawerStatusPreview();

  drawer.classList.remove("hidden");
  document.getElementById("comp-name").focus();
}

function openDrawerForEdit(compId) {
  const comp = state.components.find((c) => c.id === compId);
  const drawer = document.getElementById("side-peek-drawer");
  const form = document.getElementById("component-form");
  if (!comp || !drawer || !form) return;

  form.reset();
  document.getElementById("comp-id").value = comp.id;
  document.getElementById("drawer-mode-label").textContent = "Editar Componente";
  document.getElementById("btn-delete-component").classList.remove("hidden");

  document.getElementById("comp-name").value = comp.name;
  document.getElementById("comp-model").value = comp.model;
  populateDrawerCategorySelect(comp.category);
  populateDrawerInventorySelect(comp.inventoryId);
  document.getElementById("comp-quantity").value = String(comp.quantity);
  document.getElementById("comp-location").value = comp.location;
  document.getElementById("comp-notes").value = comp.notes || "";
  document.getElementById("instant-loan-fields").classList.add("hidden");

  updateDrawerStatusPreview();
  drawer.classList.remove("hidden");
}

function closeDrawer() {
  document.getElementById("side-peek-drawer")?.classList.add("hidden");
}

// --- Modal de Crear o Renombrar Inventario (PRD Req #5) ---
function openInventoryDialogForNew() {
  const dialog = document.getElementById("inventory-dialog");
  const form = document.getElementById("inventory-form");
  if (!dialog || !form) return;

  form.reset();
  document.getElementById("inv-edit-id").value = "";
  document.getElementById("inv-dialog-title").textContent =
    "Crear Nuevo Inventario por Proyecto";
  document.getElementById("btn-submit-inv-dialog").textContent = "Crear Inventario";
  dialog.showModal();
  document.getElementById("inv-name").focus();
}

function openInventoryDialogForEdit(invId) {
  const inv = state.inventories.find((i) => i.id === invId);
  const dialog = document.getElementById("inventory-dialog");
  const form = document.getElementById("inventory-form");
  if (!inv || !dialog || !form) return;

  form.reset();
  document.getElementById("inv-edit-id").value = inv.id;
  document.getElementById("inv-dialog-title").textContent =
    "Renombrar / Editar Inventario";
  document.getElementById("btn-submit-inv-dialog").textContent = "Guardar Cambios";

  document.getElementById("inv-icon").value = inv.icon || "📦";
  document.getElementById("inv-name").value = inv.name;
  document.getElementById("inv-badge").value = inv.badge || "";
  document.getElementById("inv-desc").value = inv.description || "";

  dialog.showModal();
  document.getElementById("inv-name").focus();
}

// --- Modal de Añadir Categoría Personalizada ---
function openCategoryDialog() {
  const dialog = document.getElementById("category-dialog");
  const form = document.getElementById("category-form");
  if (!dialog || !form) return;

  form.reset();
  dialog.showModal();
  document.getElementById("cat-name").focus();
}

// --- Modal de Préstamos (PRD Req #6) ---
function openLoanDialog(preselectedCompId = "") {
  const dialog = document.getElementById("loan-dialog");
  const select = document.getElementById("loan-component-select");
  const form = document.getElementById("loan-form");
  if (!dialog || !select || !form) return;

  form.reset();
  const availableComps = state.components.filter((c) => c.quantity > 0);

  if (availableComps.length === 0) {
    showToast("No hay componentes con stock > 0 para prestar", "⚠️");
    return;
  }

  select.innerHTML = availableComps
    .map((c) => {
      const inv = state.inventories.find((i) => i.id === c.inventoryId);
      const selected = c.id === preselectedCompId ? "selected" : "";
      return `<option value="${escapeHtml(c.id)}" ${selected}>${escapeHtml(
        c.name
      )} (${escapeHtml(c.model)}) — Disp: ${c.quantity} [${escapeHtml(
        inv ? inv.name : "General"
      )}]</option>`;
    })
    .join("");

  const today = new Date().toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short"
  });
  document.getElementById("loan-date").value = today;

  dialog.showModal();
}

// --- Inicialización de Eventos ---
async function initApp() {
  // Configurar Light-Dismiss fallback en todos los <dialog closedby="any">
  const loanDialog = document.getElementById("loan-dialog");
  const invDialog = document.getElementById("inventory-dialog");
  const catDialog = document.getElementById("category-dialog");
  const confirmDialog = document.getElementById("confirm-delete-dialog");

  setupLightDismissFallback(loanDialog);
  setupLightDismissFallback(invDialog);
  setupLightDismissFallback(catDialog);
  setupLightDismissFallback(confirmDialog);

  // Configurar validación accesible :user-invalid
  UserInvalidFallback.init(document.getElementById("signin-form"));
  UserInvalidFallback.init(document.getElementById("signup-form"));
  UserInvalidFallback.init(document.getElementById("component-form"));
  UserInvalidFallback.init(document.getElementById("loan-form"));
  UserInvalidFallback.init(document.getElementById("inventory-form"));
  UserInvalidFallback.init(document.getElementById("category-form"));

  // --- Eventos de la Pantalla de Autenticación (Sign In / Sign Up) ---
  document.getElementById("tab-auth-signin")?.addEventListener("click", () => {
    switchAuthTab("signin");
  });
  document.getElementById("tab-auth-signup")?.addEventListener("click", () => {
    switchAuthTab("signup");
  });

  // Mostrar / ocultar contraseña (autofill-sign-in-form & autofill-sign-up-form)
  document.getElementById("btn-toggle-signin-pw")?.addEventListener("click", (e) => {
    const input = document.getElementById("signin-password");
    if (!input) return;
    const isPw = input.type === "password";
    input.type = isPw ? "text" : "password";
    e.currentTarget.textContent = isPw ? "Ocultar contraseña" : "Mostrar contraseña";
  });

  document.getElementById("btn-toggle-signup-pw")?.addEventListener("click", (e) => {
    const input = document.getElementById("signup-password");
    if (!input) return;
    const isPw = input.type === "password";
    input.type = isPw ? "text" : "password";
    e.currentTarget.textContent = isPw ? "Ocultar contraseña" : "Mostrar contraseña";
  });

  // Iniciar sesión con correo y contraseña
  document.getElementById("signin-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.querySelector(":invalid")?.focus();
      return;
    }

    const email = document.getElementById("signin-email").value.trim().toLowerCase();
    const password = document.getElementById("signin-password").value;
    const submitBtn = document.getElementById("btn-submit-signin");

    if (submitBtn) submitBtn.disabled = true;
    setAuthFeedback("Verificando credenciales...", "info");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error || !data.user) {
        setAuthFeedback(
          "Correo o contraseña incorrectos. Si aún no tienes cuenta, créala en la pestaña 'Crear cuenta'.",
          "error"
        );
        return;
      }

      await handleAuthenticatedSession(data.user);
      showToast(`Bienvenido(a), ${state.profile.fullName}`, "👋");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  // Botones de acceso rápido para cuentas de demostración independientes
  const loginDemoAccount = async (email, password, label) => {
    const emailInput = document.getElementById("signin-email");
    const pwInput = document.getElementById("signin-password");
    if (emailInput) emailInput.value = email;
    if (pwInput) pwInput.value = password;
    setAuthFeedback(`Iniciando sesión en la cuenta independiente de ${label}...`, "info");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      setAuthFeedback(error?.message || "No se pudo iniciar sesión en la cuenta demo.", "error");
      return;
    }
    await handleAuthenticatedSession(data.user);
    showToast(`Sesión iniciada como ${state.profile.fullName}`, "🔒");
  };

  document.getElementById("btn-demo-camilo")?.addEventListener("click", () => {
    loginDemoAccount("camilo@mecakit.edu.co", "MecaKit2026!", "Camilo Rojas");
  });

  document.getElementById("btn-demo-valentina")?.addEventListener("click", () => {
    loginDemoAccount("valentina@mecakit.edu.co", "MecaKit2026!", "Valentina Gómez");
  });

  // Crear cuenta nueva en Supabase
  document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.querySelector(":invalid")?.focus();
      return;
    }

    const email = document.getElementById("signup-email").value.trim().toLowerCase();
    const password = document.getElementById("signup-password").value;
    const fullName = document.getElementById("signup-name").value.trim();
    const career =
      document.getElementById("signup-career").value.trim() || "Ing. Mecatrónica";
    const includeDemo = document.getElementById("signup-seed-demo")?.checked;
    const submitBtn = document.getElementById("btn-submit-signup");

    if (submitBtn) submitBtn.disabled = true;
    setAuthFeedback("Creando tu cuenta personal e inventario privado...", "info");

    try {
      const response = await fetch(REGISTER_USER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName, career })
      });

      const payload = await response.json();
      if (!response.ok || payload.error) {
        setAuthFeedback(payload.error || "No se pudo registrar la cuenta.", "error");
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error || !data.user) {
        setAuthFeedback(
          "Cuenta creada. Ahora puedes iniciar sesión con tu correo y contraseña.",
          "success"
        );
        switchAuthTab("signin");
        return;
      }

      if (includeDemo) {
        setAuthFeedback("Cargando componentes de demostración en tu cuenta...", "info");
        await seedSampleDataForUser(data.user);
      }

      await handleAuthenticatedSession(data.user);
      form.reset();
      showToast(`¡Cuenta creada para ${fullName}!`, "🎉");
    } catch (err) {
      console.error("Error registrando cuenta:", err);
      setAuthFeedback("Error de conexión al crear la cuenta. Intenta nuevamente.", "error");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  // Cerrar sesión
  const handleLogout = async () => {
    await supabase.auth.signOut();
    showUnauthenticatedScreen();
    showToast("Has cerrado sesión de forma segura", "🔒");
  };

  document.getElementById("btn-logout-top")?.addEventListener("click", handleLogout);
  document.getElementById("btn-logout-sidebar")?.addEventListener("click", handleLogout);

  // Eventos del diálogo de confirmación segura
  document
    .getElementById("btn-cancel-confirm-delete")
    ?.addEventListener("click", () => {
      pendingConfirmAction = null;
      confirmDialog?.close();
    });

  document
    .getElementById("btn-accept-confirm-delete")
    ?.addEventListener("click", () => {
      const fn = pendingConfirmAction;
      pendingConfirmAction = null;
      confirmDialog?.close();
      if (typeof fn === "function") fn();
    });

  // Navegación entre pantallas independientes (Inventario vs Préstamos)
  document.getElementById("top-screen-inventory")?.addEventListener("click", () => {
    switchScreen("inventory");
  });
  document.getElementById("top-screen-loans")?.addEventListener("click", () => {
    switchScreen("loans");
  });
  document.getElementById("btn-back-to-inventory")?.addEventListener("click", () => {
    switchScreen("inventory");
  });

  // Cambio de vistas de base de datos (Tabla / Tarjetas / Cajas)
  document.querySelectorAll(".view-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.viewMode = btn.getAttribute("data-view") || "table";
      renderAll();
    });
  });

  // Búsqueda instantánea (PRD Req #3)
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("btn-clear-search");
  searchInput?.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    clearSearchBtn?.classList.toggle("hidden", !state.searchQuery);
    renderInventoryContent();
  });

  clearSearchBtn?.addEventListener("click", () => {
    state.searchQuery = "";
    searchInput.value = "";
    clearSearchBtn.classList.add("hidden");
    renderInventoryContent();
    searchInput.focus();
  });

  // Delegación de eventos en el Menú Lateral (Mis Inventarios)
  document.getElementById("left-sidebar")?.addEventListener("click", (e) => {
    const renameInvBtn = e.target.closest("[data-rename-inv-id]");
    if (renameInvBtn) {
      openInventoryDialogForEdit(renameInvBtn.getAttribute("data-rename-inv-id"));
      return;
    }

    const delInvBtn = e.target.closest("[data-delete-inv-id]");
    if (delInvBtn) {
      promptDeleteInventory(delInvBtn.getAttribute("data-delete-inv-id"));
      return;
    }

    const invBtn = e.target.closest(".sidebar-inv-btn");
    if (invBtn) {
      state.activeInventoryId = invBtn.getAttribute("data-inv-id");
      state.activeCategory = "Todos";
      state.activeScreen = "inventory";
      closeMobileSidebar();
      renderAll();
      return;
    }
  });

  // Botones de Control Rápido en Sidebar y KPIs
  const setCategoryFilter = (cat) => {
    state.activeScreen = "inventory";
    state.activeCategory = cat;
    closeMobileSidebar();
    renderAll();
  };

  document.getElementById("nav-filter-all")?.addEventListener("click", () => setCategoryFilter("Todos"));
  document.getElementById("kpi-card-all")?.addEventListener("click", () => setCategoryFilter("Todos"));
  document.getElementById("nav-filter-agotados")?.addEventListener("click", () => setCategoryFilter("Agotados"));
  document.getElementById("kpi-card-agotados")?.addEventListener("click", () => setCategoryFilter("Agotados"));
  document.getElementById("kpi-card-loans")?.addEventListener("click", () => switchScreen("loans"));

  // Píldoras de categoría (Filtrar, eliminar categoría personalizada o añadir nueva)
  document.getElementById("category-pills-bar")?.addEventListener("click", (e) => {
    if (e.target.closest("#btn-pill-new-category")) {
      openCategoryDialog();
      return;
    }

    const delCatBtn = e.target.closest("[data-delete-cat]");
    if (delCatBtn) {
      promptDeleteCategory(delCatBtn.getAttribute("data-delete-cat"));
      return;
    }

    const pill = e.target.closest(".cat-pill-btn");
    if (!pill) return;
    state.activeCategory = pill.getAttribute("data-pill-cat") || "Todos";
    renderAll();
  });

  // Filtros en la pantalla independiente de Préstamos
  document.getElementById("loan-filter-pills")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".loan-filter-btn");
    if (!btn) return;
    state.loanFilter = btn.getAttribute("data-loan-filter") || "Todos";
    renderLoansScreen();
  });

  // Delegación de eventos en el contenedor de inventario (Stock +/-, Editar, Prestar, Eliminar)
  document.getElementById("inventory-container")?.addEventListener("click", (e) => {
    const stockBtn = e.target.closest("[data-stock-action]");
    if (stockBtn) {
      const compId = stockBtn.getAttribute("data-comp-id");
      const action = stockBtn.getAttribute("data-stock-action");
      adjustComponentStock(compId, action === "inc" ? 1 : -1);
      return;
    }

    const editBtn = e.target.closest(".btn-edit-comp");
    if (editBtn) {
      openDrawerForEdit(editBtn.getAttribute("data-edit-comp-id"));
      return;
    }

    const delCompBtn = e.target.closest(".btn-delete-comp-row");
    if (delCompBtn) {
      promptDeleteComponent(delCompBtn.getAttribute("data-delete-comp-id"));
      return;
    }

    const loanBtn = e.target.closest(".btn-quick-loan");
    if (loanBtn) {
      openLoanDialog(loanBtn.getAttribute("data-loan-comp-id"));
      return;
    }

    if (e.target.closest("#btn-empty-reset-filters")) {
      state.searchQuery = "";
      state.activeCategory = "Todos";
      if (searchInput) searchInput.value = "";
      clearSearchBtn?.classList.add("hidden");
      renderAll();
      return;
    }

    if (e.target.closest("#btn-empty-new-comp")) {
      openDrawerForNew();
    }
  });

  // Delegación de eventos en la tabla de préstamos (Supabase)
  document.getElementById("loans-container")?.addEventListener("click", async (e) => {
    const returnBtn = e.target.closest(".btn-return-loan");
    if (returnBtn) {
      const loanId = returnBtn.getAttribute("data-return-loan-id");
      const loan = state.loans.find((l) => l.id === loanId);
      if (!loan || loan.status === "Devuelto") return;

      const { error: loanErr } = await supabase
        .from("loans")
        .update({ status: "Devuelto" })
        .eq("id", loan.id);

      if (loanErr) {
        showToast("Error al actualizar el préstamo", "⚠️");
        return;
      }

      loan.status = "Devuelto";
      const comp = state.components.find((c) => c.id === loan.componentId);
      if (comp) {
        const nextQty = Number(comp.quantity || 0) + Number(loan.quantity || 1);
        comp.quantity = nextQty;
        await supabase.from("components").update({ quantity: nextQty }).eq("id", comp.id);
      }
      renderAll();
      showToast(
        `Devuelto por ${loan.borrowerName}: +${loan.quantity} ud(s) sumadas al stock`,
        "🤝"
      );
      return;
    }

    const delLoanBtn = e.target.closest(".btn-delete-loan");
    if (delLoanBtn) {
      const loanId = delLoanBtn.getAttribute("data-delete-loan-id");
      const { error } = await supabase.from("loans").delete().eq("id", loanId);
      if (error) {
        showToast("No se pudo borrar el préstamo", "⚠️");
        return;
      }
      state.loans = state.loans.filter((l) => l.id !== loanId);
      renderAll();
      showToast("Registro de préstamo eliminado", "🗑️");
    }
  });

  // Botones para abrir Side-Peek Drawer (Nuevo Componente)
  document.getElementById("btn-new-component-top")?.addEventListener("click", openDrawerForNew);
  document.getElementById("btn-close-drawer")?.addEventListener("click", closeDrawer);
  document.getElementById("btn-cancel-drawer")?.addEventListener("click", closeDrawer);

  // Controles dentro del Side-Peek Drawer
  document.getElementById("comp-category")?.addEventListener("change", updateDrawerStatusPreview);
  document.getElementById("comp-quantity")?.addEventListener("input", updateDrawerStatusPreview);

  document.getElementById("drawer-qty-minus")?.addEventListener("click", () => {
    const input = document.getElementById("comp-quantity");
    input.value = String(Math.max(0, parseInt(input.value || "0", 10) - 1));
    updateDrawerStatusPreview();
  });

  document.getElementById("drawer-qty-plus")?.addEventListener("click", () => {
    const input = document.getElementById("comp-quantity");
    input.value = String(Math.max(0, parseInt(input.value || "0", 10) + 1));
    updateDrawerStatusPreview();
  });

  document.getElementById("comp-instant-loan")?.addEventListener("change", (e) => {
    document
      .getElementById("instant-loan-fields")
      ?.classList.toggle("hidden", !e.target.checked);
  });

  // Guardar Componente (Nuevo o Editado) en Supabase PostgreSQL
  document.getElementById("component-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector(":invalid");
      firstInvalid?.focus();
      return;
    }

    const id = document.getElementById("comp-id").value.trim();
    const name = document.getElementById("comp-name").value.trim();
    const model = document.getElementById("comp-model").value.trim();
    const category = document.getElementById("comp-category").value;
    const inventoryId = document.getElementById("comp-inventory").value;
    let quantity = Math.max(
      0,
      parseInt(document.getElementById("comp-quantity").value || "0", 10)
    );
    const location = document.getElementById("comp-location").value.trim();
    const notes = document.getElementById("comp-notes").value.trim();

    const instantLoan = document.getElementById("comp-instant-loan").checked;
    const borrowerName = document.getElementById("comp-loan-borrower").value.trim();
    const borrowerGroup = document.getElementById("comp-loan-group").value.trim();

    if (instantLoan && borrowerName && quantity > 0) {
      quantity -= 1;
    }

    let savedCompId = id;

    if (id) {
      const { data: updatedRow, error } = await supabase
        .from("components")
        .update({
          inventory_id: inventoryId,
          name,
          model,
          category,
          quantity,
          location,
          notes
        })
        .eq("id", id)
        .select("*")
        .single();

      if (error || !updatedRow) {
        showToast("Error al actualizar el componente en la nube", "⚠️");
        return;
      }

      const idx = state.components.findIndex((c) => c.id === id);
      if (idx !== -1) state.components[idx] = mapComponentRow(updatedRow);
      showToast(`Componente actualizado: ${model}`, "✓");
    } else {
      const { data: insertedRow, error } = await supabase
        .from("components")
        .insert({
          user_id: state.user.id,
          inventory_id: inventoryId,
          name,
          model,
          category,
          quantity,
          location,
          notes
        })
        .select("*")
        .single();

      if (error || !insertedRow) {
        showToast("Error al guardar el componente en la nube", "⚠️");
        return;
      }

      const mapped = mapComponentRow(insertedRow);
      savedCompId = mapped.id;
      state.components.unshift(mapped);
      state.activeInventoryId = inventoryId;
      state.activeScreen = "inventory";
      showToast(`Componente registrado en MecaKit: ${model}`, "✨");
    }

    if (instantLoan && borrowerName) {
      const today = new Date().toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "short"
      });
      const { data: loanRow } = await supabase
        .from("loans")
        .insert({
          user_id: state.user.id,
          component_id: savedCompId,
          inventory_id: inventoryId,
          component_name: `${name} (${model})`,
          borrower_name: borrowerName,
          borrower_group: borrowerGroup || "Compañero de carrera",
          quantity: 1,
          loan_date: today,
          status: "Pendiente",
          notes: ""
        })
        .select("*")
        .single();

      if (loanRow) {
        state.loans.unshift(mapLoanRow(loanRow));
      }
    }

    closeDrawer();
    renderAll();
  });

  // Eliminar Componente desde el Drawer
  document.getElementById("btn-delete-component")?.addEventListener("click", () => {
    const id = document.getElementById("comp-id").value;
    if (id) promptDeleteComponent(id);
  });

  // Modal de Añadir Categoría Personalizada (Supabase)
  document.getElementById("btn-drawer-new-category")?.addEventListener("click", openCategoryDialog);
  document
    .getElementById("btn-close-cat-dialog")
    ?.addEventListener("click", () => catDialog?.close());
  document
    .getElementById("btn-cancel-cat-dialog")
    ?.addEventListener("click", () => catDialog?.close());

  document.getElementById("category-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.querySelector(":invalid")?.focus();
      return;
    }

    const icon = document.getElementById("cat-icon").value || "🔋";
    const name = document.getElementById("cat-name").value.trim();
    const color = document.getElementById("cat-color").value || "teal";

    const exists = getCategories().some(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      showToast(`La categoría "${name}" ya existe`, "⚠️");
      catDialog?.close();
      populateDrawerCategorySelect(name);
      updateDrawerStatusPreview();
      return;
    }

    const { data: catRow, error } = await supabase
      .from("categories")
      .insert({
        user_id: state.user.id,
        name,
        icon,
        color,
        is_default: false
      })
      .select("*")
      .single();

    if (error || !catRow) {
      showToast("No se pudo crear la categoría", "⚠️");
      return;
    }

    state.categories.push(mapCategoryRow(catRow));

    catDialog?.close();
    renderAll();
    populateDrawerCategorySelect(name);
    updateDrawerStatusPreview();
    showToast(`Categoría creada: ${icon} ${name}`, "🏷️");
  });

  // Modal de Préstamo (Supabase)
  document
    .getElementById("btn-open-loan-modal-top")
    ?.addEventListener("click", () => openLoanDialog());
  document
    .getElementById("btn-open-loan-modal-section")
    ?.addEventListener("click", () => openLoanDialog());
  document
    .getElementById("btn-close-loan-dialog")
    ?.addEventListener("click", () => loanDialog?.close());
  document
    .getElementById("btn-cancel-loan-dialog")
    ?.addEventListener("click", () => loanDialog?.close());

  document.getElementById("loan-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.querySelector(":invalid")?.focus();
      return;
    }

    const compId = document.getElementById("loan-component-select").value;
    const borrowerName = document.getElementById("loan-borrower-name").value.trim();
    const borrowerGroup = document.getElementById("loan-borrower-group").value.trim();
    const qtyInput = Math.max(
      1,
      parseInt(document.getElementById("loan-quantity").value || "1", 10)
    );
    const dateStr = document.getElementById("loan-date").value.trim() || "Hoy";

    const comp = state.components.find((c) => c.id === compId);
    if (!comp) return;

    const loanQty = Math.min(comp.quantity, qtyInput);
    const nextCompQty = comp.quantity - loanQty;

    await supabase.from("components").update({ quantity: nextCompQty }).eq("id", comp.id);
    comp.quantity = nextCompQty;

    const { data: loanRow, error } = await supabase
      .from("loans")
      .insert({
        user_id: state.user.id,
        component_id: comp.id,
        inventory_id: comp.inventoryId,
        component_name: `${comp.name} (${comp.model})`,
        borrower_name: borrowerName,
        borrower_group: borrowerGroup,
        quantity: loanQty,
        loan_date: dateStr,
        status: "Pendiente",
        notes: ""
      })
      .select("*")
      .single();

    if (error || !loanRow) {
      showToast("Error al registrar el préstamo", "⚠️");
      return;
    }

    state.loans.unshift(mapLoanRow(loanRow));
    loanDialog?.close();
    renderAll();
    showToast(`Préstamo registrado a ${borrowerName} (-${loanQty} en stock)`, "🤝");
  });

  // Modal de Crear o Renombrar Inventario por Proyecto (PRD Req #5 + Supabase)
  document.getElementById("btn-new-inventory")?.addEventListener("click", () => {
    closeMobileSidebar();
    openInventoryDialogForNew();
  });
  document.getElementById("btn-new-inventory-icon")?.addEventListener("click", () => {
    closeMobileSidebar();
    openInventoryDialogForNew();
  });
  document.getElementById("btn-edit-inventory")?.addEventListener("click", () => {
    openInventoryDialogForEdit(state.activeInventoryId);
  });
  document
    .getElementById("btn-close-inv-dialog")
    ?.addEventListener("click", () => invDialog?.close());
  document
    .getElementById("btn-cancel-inv-dialog")
    ?.addEventListener("click", () => invDialog?.close());

  document.getElementById("inventory-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.querySelector(":invalid")?.focus();
      return;
    }

    const editId = document.getElementById("inv-edit-id").value.trim();
    const icon = document.getElementById("inv-icon").value || "🤖";
    const name = document.getElementById("inv-name").value.trim();
    const badge = document.getElementById("inv-badge").value.trim() || "Proyecto Personal";
    const description =
      document.getElementById("inv-desc").value.trim() ||
      `Inventario personalizado para el proyecto ${name}.`;

    if (editId) {
      const { data: updatedInv, error } = await supabase
        .from("inventories")
        .update({ icon, name, badge, description })
        .eq("id", editId)
        .select("*")
        .single();

      if (error || !updatedInv) {
        showToast("Error al actualizar el inventario", "⚠️");
        return;
      }

      const target = state.inventories.find((i) => i.id === editId);
      if (target) {
        target.icon = updatedInv.icon;
        target.name = updatedInv.name;
        target.badge = updatedInv.badge;
        target.description = updatedInv.description;
      }
      invDialog?.close();
      renderAll();
      showToast(`Inventario actualizado: ${icon} ${name}`, "✏️");
    } else {
      const { data: createdInv, error } = await supabase
        .from("inventories")
        .insert({
          user_id: state.user.id,
          name,
          icon,
          badge,
          description,
          is_default: false
        })
        .select("*")
        .single();

      if (error || !createdInv) {
        showToast("Error al crear el inventario", "⚠️");
        return;
      }

      const mapped = mapInventoryRow(createdInv);
      state.inventories.push(mapped);
      state.activeInventoryId = mapped.id;
      state.activeCategory = "Todos";
      state.activeScreen = "inventory";

      invDialog?.close();
      renderAll();
      showToast(`Inventario creado: ${icon} ${name}`, "🗂️");
    }
  });

  // Eliminar Inventario de Proyecto Personalizado
  document.getElementById("btn-delete-inventory")?.addEventListener("click", () => {
    promptDeleteInventory(state.activeInventoryId);
  });

  // Cargar kit de ejemplo en la cuenta actual (con confirmación previa)
  document.getElementById("btn-reset-demo")?.addEventListener("click", () => {
    askConfirmation({
      title: "¿Cargar kit de demostración en tu cuenta?",
      message:
        "Se cargarán los inventarios, componentes y préstamos de ejemplo dentro de tu cuenta actual (sin afectar a ningún otro usuario).",
      confirmText: "Sí, cargar kit ejemplo",
      onConfirm: async () => {
        showToast("Sincronizando kit de ejemplo en tu cuenta...", "⏳");
        const refreshed = await seedSampleDataForUser(state.user);
        state = {
          ...state,
          ...refreshed,
          activeScreen: "inventory",
          activeCategory: "Todos",
          searchQuery: ""
        };
        const sInput = document.getElementById("search-input");
        if (sInput) sInput.value = "";
        renderAll();
        showToast("Kit de ejemplo cargado en tu cuenta", "🔄");
      }
    });
  });

  // Navegación Móvil
  const sidebar = document.getElementById("left-sidebar");
  const backdrop = document.getElementById("mobile-sidebar-backdrop");

  function openMobileSidebar() {
    sidebar?.classList.remove("-translate-x-full");
    backdrop?.classList.remove("hidden");
  }
  function closeMobileSidebar() {
    sidebar?.classList.add("-translate-x-full");
    backdrop?.classList.add("hidden");
  }

  document.getElementById("btn-mobile-menu")?.addEventListener("click", openMobileSidebar);
  document.getElementById("btn-close-sidebar-mobile")?.addEventListener("click", closeMobileSidebar);
  backdrop?.addEventListener("click", closeMobileSidebar);

  document.getElementById("mob-nav-inventory")?.addEventListener("click", () => {
    closeMobileSidebar();
    closeDrawer();
    switchScreen("inventory");
  });
  document.getElementById("mob-nav-loans")?.addEventListener("click", () => {
    closeMobileSidebar();
    closeDrawer();
    switchScreen("loans");
  });
  document.getElementById("mob-nav-add")?.addEventListener("click", () => {
    closeMobileSidebar();
    openDrawerForNew();
  });

  // Verificar si ya existe una sesión activa en este navegador
  const { data: sessionData } = await supabase.auth.getSession();
  if (sessionData?.session?.user) {
    await handleAuthenticatedSession(sessionData.session.user);
  } else {
    showUnauthenticatedScreen();
  }

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT" || !session?.user) {
      showUnauthenticatedScreen();
    }
  });
}

document.addEventListener("DOMContentLoaded", initApp);

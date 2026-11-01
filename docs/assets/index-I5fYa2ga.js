(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();const We="mecakit_state_v1",K=[{name:"Sensores",icon:"📡",color:"blue",isDefault:!0},{name:"Microcontroladores",icon:"⚡",color:"purple",isDefault:!0},{name:"Actuadores",icon:"🦾",color:"orange",isDefault:!0},{name:"Pasivos",icon:"🔋",color:"green",isDefault:!0}],P={activeScreen:"inventory",activeInventoryId:"general",viewMode:"table",activeCategory:"Todos",loanFilter:"Todos",searchQuery:"",categories:structuredClone(K),inventories:[{id:"general",name:"Inventario General",icon:"📦",badge:"Lab Mecatrónica #4",description:"Consulta en segundos tus componentes electrónicos, ubicación física y préstamos activos de taller.",isDefault:!0},{id:"brazo-robotico",name:"Brazo Robótico 4-DOF",icon:"🤖",badge:"Proyecto Mitad Semestre",description:"Inventario dedicado de actuadores, sensores de posición y control para el brazo robótico.",isDefault:!1},{id:"seguidor-linea",name:"Seguidor de Línea Lab 3",icon:"🏎️",badge:"Control Automático",description:"Piezas separadas para el robot velocista con control PID analógico/digital.",isDefault:!1}],components:[{id:"comp-1",inventoryId:"general",name:"Módulo WiFi & Bluetooth Dual-Core",model:"ESP32-WROOM-32",category:"Microcontroladores",quantity:0,location:"Caja Antiestática 1 · Comp. B",notes:"Se usaron los últimos 2 en el prototipo IoT. Comprar con pines soldados."},{id:"comp-2",inventoryId:"general",name:"Sensor Ultrasónico de Distancia",model:"HC-SR04",category:"Sensores",quantity:4,location:"Caja Sensores · Gaveta 1",notes:"Rango 2cm a 400cm, alimentación 5V DC."},{id:"comp-3",inventoryId:"general",name:"Driver Controlador Puente H Doble",model:"L298N Dual H-Bridge",category:"Actuadores",quantity:0,location:"Cajón Potencia · Gaveta 4",notes:"Soporta hasta 2A por puente. Agotado tras práctica de motores DC."},{id:"comp-4",inventoryId:"general",name:"Micro Servomotor 9g 180°",model:"TowerPro SG90",category:"Actuadores",quantity:7,location:"Caja Organizadora A · Gaveta 3",notes:"Incluye crucetas plásticas y tornillos."},{id:"comp-5",inventoryId:"general",name:"Resistencia Película Metálica 1/4W",model:"10kΩ ±1%",category:"Pasivos",quantity:25,location:"Gavetero Pasivos · G-08",notes:"Para pull-up/pull-down en botones y sensores."},{id:"comp-6",inventoryId:"general",name:"Capacitor Cerámico Desacoplo 50V",model:"100nF (Código 104)",category:"Pasivos",quantity:35,location:"Gavetero Pasivos · G-12",notes:"Indispensable para filtrado de ruido en alimentación de MCUs."},{id:"comp-7",inventoryId:"general",name:"Placa de Desarrollo Microcontrolador",model:"Arduino Nano V3 ATmega328P",category:"Microcontroladores",quantity:2,location:"Caja Antiestática 1 · Comp. A",notes:"Bootloader Old Bootloader, conector Mini-B USB."},{id:"comp-8",inventoryId:"general",name:"Sensor IMU Acelerómetro + Giroscopio 6-DOF",model:"MPU-6050 (GY-521)",category:"Sensores",quantity:3,location:"Caja Sensores · Gaveta 2",notes:"Interfaz I2C (3.3V / 5V)."},{id:"comp-9",inventoryId:"general",name:"Regulador de Voltaje Step-Down Buck",model:"LM2596 DC-DC",category:"Pasivos",quantity:0,location:"Cajón Potencia · Gaveta 2",notes:"Ajustable 1.25V - 35V, máximo 3A."},{id:"comp-10",inventoryId:"brazo-robotico",name:"Servomotor Alto Torque Engranaje Metálico",model:"MG996R 180°",category:"Actuadores",quantity:4,location:"Maletín Brazo Robótico · Espuma 1",notes:"3 instalados en base/hombro/codo + 1 de repuesto."},{id:"comp-11",inventoryId:"brazo-robotico",name:"Controlador PWM 16 Canales I2C",model:"PCA9685",category:"Microcontroladores",quantity:1,location:"Maletín Brazo Robótico · Bolsa ESD",notes:"Alimentación externa de 6V para servos."},{id:"comp-12",inventoryId:"brazo-robotico",name:"Potenciómetro Lineal Rotativo 10k",model:"WH148 B10K",category:"Pasivos",quantity:0,location:"Caja Organizadora B · Gaveta 5",notes:"Falta comprar 2 para el modo maestro-esclavo."},{id:"comp-13",inventoryId:"seguidor-linea",name:"Sensor Óptico Reflectivo Infrarrojo",model:"TCRT5000",category:"Sensores",quantity:6,location:"Caja Seguidor · Compartimento C1",notes:"Arreglo de 5 sensores para lectura de línea negra + 1 repuesto."},{id:"comp-14",inventoryId:"seguidor-linea",name:"Motorreductor Micro Metal DC 6V",model:"N20 600RPM",category:"Actuadores",quantity:2,location:"Caja Seguidor · Compartimento C2",notes:"Con llantas de silicona de alto agarre."},{id:"comp-15",inventoryId:"seguidor-linea",name:"Driver Doble Puente H MOSFET",model:"TB6612FNG",category:"Microcontroladores",quantity:1,location:"Caja Seguidor · Bolsa Antiestática",notes:"Mucho más eficiente que el L298N, no cae voltaje."}],loans:[{id:"loan-1",componentId:"comp-2",inventoryId:"general",componentName:"Sensor Ultrasónico de Distancia (HC-SR04)",borrowerName:"Mateo Ríos",borrowerGroup:"Lab Robótica · Grupo 2",quantity:1,date:"20 Oct",status:"Pendiente",notes:"Lo necesita para calibrar su práctica hasta el viernes."},{id:"loan-2",componentId:"comp-4",inventoryId:"general",componentName:"Micro Servomotor 9g 180° (TowerPro SG90)",borrowerName:"Valentina Gómez",borrowerGroup:"Mecatrónica 5.º Sem",quantity:1,date:"22 Oct",status:"Pendiente",notes:"Prestado en el laboratorio 402 durante clase de sensores."}]};function et(){try{const t=localStorage.getItem(We);if(!t)return structuredClone(P);const e=JSON.parse(t),n={...structuredClone(P),...e};return(!Array.isArray(n.categories)||n.categories.length===0)&&(n.categories=structuredClone(K)),n}catch{return structuredClone(P)}}function Ke(t){try{localStorage.setItem(We,JSON.stringify(t))}catch(e){console.error("No se pudo guardar el estado en localStorage:",e)}}function tt(){const t=structuredClone(P);return Ke(t),t}let o=et();o.activeScreen||(o.activeScreen="inventory");o.loanFilter||(o.loanFilter="Todos");let N=null;function d(t=""){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function I(t,e="✓"){const n=document.getElementById("toast-container");if(!n)return;const r=document.createElement("div");r.className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#37352F] text-white text-xs font-medium shadow-md border border-black/10 transition-all duration-200",r.innerHTML=`<span class="text-sm">${d(e)}</span><span>${d(t)}</span>`,n.appendChild(r),setTimeout(()=>{r.style.opacity="0",r.style.transform="translateY(6px)",setTimeout(()=>r.remove(),200)},2600)}function q(){return(!Array.isArray(o.categories)||o.categories.length===0)&&(o.categories=structuredClone(K)),o.categories}function G(t){const e=q().find(n=>n.name.toLowerCase()===String(t||"").toLowerCase());return e||{name:t||"General",icon:"📦",color:"gray",isDefault:!1}}function R(t){return`notion-tag-${G(t).color||"gray"}`}function V({title:t,message:e,confirmText:n="Sí, eliminar definitivamente",onConfirm:r}){const i=document.getElementById("confirm-delete-dialog"),a=document.getElementById("confirm-delete-title"),s=document.getElementById("confirm-delete-message"),l=document.getElementById("btn-accept-confirm-delete");!i||!a||!s||!l||(a.textContent=t,s.textContent=e,l.textContent=n,N=r,i.showModal())}function F(t){t&&("closedBy"in HTMLDialogElement.prototype||t.addEventListener("click",e=>{if(e.target!==t)return;const n=t.getBoundingClientRect();n.top<=e.clientY&&e.clientY<=n.top+n.height&&n.left<=e.clientX&&e.clientX<=n.left+n.width||t.close()}))}const T=(()=>{const t=new WeakMap,e=i=>{if(!i.checkValidity)return;const a=i.checkValidity();i.classList.toggle("user-invalid-fallback",!a),i.classList.toggle("user-valid-fallback",a),a?i.removeAttribute("aria-invalid"):i.setAttribute("aria-invalid","true")},n=i=>{const a=i.target;if(i.type==="reset"){const s=a.elements||[];for(const l of s)t.delete(l),l.classList.remove("user-invalid-fallback","user-valid-fallback"),l.removeAttribute("aria-invalid");return}if(!(!a||!a.checkValidity)){if(i.type==="input"||i.type==="change"){const s=t.get(a)||{hasInteracted:!1,hasBlurred:!1};s.hasInteracted=!0,t.set(a,s),s.hasBlurred&&e(a)}else if(i.type==="blur"){const s=t.get(a)||{hasInteracted:!1,hasBlurred:!1};s.hasBlurred=!0,t.set(a,s),s.hasInteracted&&e(a)}}};return{init:i=>{if(!i)return;const a=s=>{s.checkValidity()?s.removeAttribute("aria-invalid"):s.setAttribute("aria-invalid","true")};i.addEventListener("blur",s=>{s.target.matches("input[required], select[required]")&&a(s.target)},!0),i.addEventListener("submit",()=>{i.querySelectorAll("input[required], select[required]").forEach(s=>{a(s),s.classList.toggle("user-invalid-fallback",!s.checkValidity())})}),i.addEventListener("input",s=>{s.target.matches("input[required], select[required]")&&s.target.checkValidity()&&(s.target.removeAttribute("aria-invalid"),s.target.classList.remove("user-invalid-fallback"))}),CSS.supports("selector(:user-invalid)")||(i.addEventListener("blur",n,!0),i.addEventListener("input",n),i.addEventListener("change",n),i.addEventListener("reset",n,!0))}}})();function H(){return o.inventories.find(t=>t.id===o.activeInventoryId)||o.inventories[0]}function M(t=o.activeInventoryId){return o.components.filter(e=>e.inventoryId===t)}function nt(){const t=M(o.activeInventoryId),e=o.searchQuery.trim().toLowerCase();return t.filter(n=>{if(o.activeCategory==="Agotados"){if(n.quantity>0)return!1}else if(o.activeCategory!=="Todos"&&n.category!==o.activeCategory)return!1;return e?n.name.toLowerCase().includes(e)||n.model.toLowerCase().includes(e)||n.location.toLowerCase().includes(e)||n.category.toLowerCase().includes(e):!0})}function ot(t){return o.loans.filter(e=>e.componentId===t&&e.status==="Pendiente")}function k(t){var e;o.activeScreen=t==="loans"?"loans":"inventory",f(),(e=document.getElementById("main-canvas"))==null||e.scrollTo({top:0,behavior:"smooth"})}function f(){Ke(o),it(),at(),rt(),st(),dt(),W(),_e()}function it(){var v,$;const t=o.activeScreen==="loans",e=H(),n=o.loans.filter(w=>w.status==="Pendiente").length;(v=document.getElementById("screen-inventory"))==null||v.classList.toggle("hidden",t),($=document.getElementById("screen-loans"))==null||$.classList.toggle("hidden",!t);const r=document.getElementById("header-breadcrumb-current");r&&(r.textContent=t?"🤝 Seguimiento de Préstamos":`${e.icon} ${e.name}`);const i=document.getElementById("top-screen-inventory"),a=document.getElementById("top-screen-loans"),s=document.getElementById("top-loans-badge");s&&(s.textContent=String(n)),i&&a&&(i.className=t?"px-2.5 py-1 rounded font-medium text-notion-muted hover:text-notion-text flex items-center gap-1.5 cursor-pointer transition-all":"px-2.5 py-1 rounded font-semibold bg-white text-notion-text shadow-sm flex items-center gap-1.5 cursor-pointer transition-all",a.className=t?"px-2.5 py-1 rounded font-semibold bg-white text-notion-text shadow-sm flex items-center gap-1.5 cursor-pointer transition-all":"px-2.5 py-1 rounded font-medium text-notion-muted hover:text-notion-text flex items-center gap-1.5 cursor-pointer transition-all");const l=document.getElementById("mob-nav-inventory"),b=document.getElementById("mob-nav-loans"),m=document.getElementById("mob-loans-badge");m&&(m.textContent=String(n),m.classList.toggle("hidden",n===0)),l&&b&&(l.className=t?"flex flex-col items-center gap-0.5 text-notion-muted hover:text-notion-text py-0.5 px-3 cursor-pointer":"flex flex-col items-center gap-0.5 text-notion-blue font-semibold py-0.5 px-3 cursor-pointer",b.className=t?"relative flex flex-col items-center gap-0.5 text-notion-blue font-semibold py-0.5 px-3 cursor-pointer":"relative flex flex-col items-center gap-0.5 text-notion-muted hover:text-notion-text py-0.5 px-3 cursor-pointer")}function at(){const t=document.getElementById("sidebar-inventories-list");t&&(t.innerHTML=o.inventories.map(s=>{const l=o.activeScreen==="inventory"&&s.id===o.activeInventoryId,b=M(s.id).length;return`
          <div class="group flex items-center justify-between rounded transition-colors ${l?"bg-[#E5E5E2] text-notion-text font-semibold":"text-notion-muted hover:bg-notion-hover hover:text-notion-text"}">
            <button
              type="button"
              data-inv-id="${d(s.id)}"
              class="sidebar-inv-btn flex-1 flex items-center gap-2 px-2.5 py-1.5 text-xs text-left truncate cursor-pointer"
            >
              <span class="text-sm">${d(s.icon)}</span>
              <span class="truncate">${d(s.name)}</span>
            </button>
            <div class="flex items-center gap-0.5 pr-1.5">
              <button
                type="button"
                data-rename-inv-id="${d(s.id)}"
                title="Renombrar o editar inventario"
                class="opacity-70 md:opacity-0 md:group-hover:opacity-100 p-0.5 rounded hover:bg-white/80 text-notion-muted hover:text-notion-text transition-opacity cursor-pointer"
              >
                <span class="material-symbols-outlined text-[13px]">edit</span>
              </button>
              ${s.isDefault?"":`<button
                      type="button"
                      data-delete-inv-id="${d(s.id)}"
                      title="Eliminar inventario"
                      class="opacity-70 md:opacity-0 md:group-hover:opacity-100 p-0.5 rounded hover:bg-[#FBE4E4] text-notion-muted hover:text-[#E03E3E] transition-opacity cursor-pointer"
                    >
                      <span class="material-symbols-outlined text-[13px]">delete</span>
                    </button>`}
              <span class="text-[10px] font-mono ${l?"bg-white text-notion-text font-semibold":"text-notion-muted"} px-1.5 py-0.5 rounded">${b}</span>
            </div>
          </div>
        `}).join(""));const e=M(o.activeInventoryId),n=e.filter(s=>s.quantity===0).length,r=o.components.reduce((s,l)=>s+Number(l.quantity||0),0);document.getElementById("sidebar-total-badge").textContent=String(e.length),document.getElementById("sidebar-agotados-badge").textContent=String(n),document.getElementById("sidebar-total-units").textContent=`${r} uds`;const i=document.getElementById("nav-filter-all"),a=document.getElementById("nav-filter-agotados");if(i&&a){const s=o.activeScreen==="inventory"&&o.activeCategory==="Todos",l=o.activeScreen==="inventory"&&o.activeCategory==="Agotados";i.className=`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded transition-colors cursor-pointer ${s?"bg-[#E5E5E2] text-notion-text font-semibold":"text-notion-text hover:bg-notion-hover"}`,a.className=`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded transition-colors cursor-pointer ${l?"bg-[#E5E5E2] text-notion-text font-semibold":"text-notion-text hover:bg-notion-hover"}`}}function rt(){const t=H(),e=M(t.id),n=e.reduce((s,l)=>s+Number(l.quantity||0),0),r=e.filter(s=>s.quantity===0).length,i=o.loans.filter(s=>s.status==="Pendiente").length;document.getElementById("active-inv-icon").textContent=t.icon,document.getElementById("active-inv-title").textContent=t.name,document.getElementById("active-inv-badge").textContent=t.badge||"Inventario Personal",document.getElementById("active-inv-desc").textContent=t.description;const a=document.getElementById("btn-delete-inventory");a&&a.classList.toggle("hidden",!!t.isDefault),document.getElementById("kpi-total-refs").textContent=String(e.length),document.getElementById("kpi-total-units").textContent=`${n} uds en stock`,document.getElementById("kpi-total-agotados").textContent=String(r),document.getElementById("kpi-total-loans").textContent=String(i)}function st(){const t=document.getElementById("category-pills-bar");if(!t)return;const e=M(o.activeInventoryId),n=e.filter(a=>a.quantity===0).length,i=[{key:"Todos",label:`Todos (${e.length})`,pillClass:"",isCustom:!1},...q().map(a=>({key:a.name,label:`${a.icon} ${a.name} (${e.filter(s=>s.category===a.name).length})`,pillClass:R(a.name),isCustom:!a.isDefault})),{key:"Agotados",label:`⚠️ Solo Agotados (${n})`,pillClass:"bg-[#FBE4E4] text-[#E03E3E]",isCustom:!1}].map(a=>{const s=o.activeCategory===a.key,l=s?"ring-2 ring-[#37352F] font-semibold":"opacity-85 hover:opacity-100";return`
        <div class="inline-flex items-center rounded ${a.key==="Todos"?s?"bg-[#37352F] text-white":"bg-notion-sidebar text-notion-text":a.pillClass} ${l} transition-all">
          <button
            type="button"
            data-pill-cat="${d(a.key)}"
            class="cat-pill-btn whitespace-nowrap px-2.5 py-1 text-xs cursor-pointer"
          >
            ${d(a.label)}
          </button>
          ${a.isCustom?`<button
                  type="button"
                  data-delete-cat="${d(a.key)}"
                  title="Eliminar categoría ${d(a.key)}"
                  class="pr-1.5 pl-0.5 text-[11px] opacity-70 hover:opacity-100 cursor-pointer"
                >✕</button>`:""}
        </div>
      `}).join("");t.innerHTML=`
    ${i}
    <button
      type="button"
      id="btn-pill-new-category"
      title="Crear nueva categoría personalizada"
      class="whitespace-nowrap px-2.5 py-1 rounded text-xs font-medium bg-white border border-dashed border-notion-border text-notion-blue hover:bg-notion-sidebar transition-colors cursor-pointer"
    >
      + Categoría
    </button>
  `}function dt(){document.querySelectorAll(".view-tab").forEach(t=>{const n=t.getAttribute("data-view")===o.viewMode;t.className=n?"view-tab px-2.5 py-1 rounded font-semibold bg-white text-notion-text shadow-sm flex items-center gap-1 cursor-pointer":"view-tab px-2.5 py-1 rounded font-medium text-notion-muted hover:text-notion-text flex items-center gap-1 cursor-pointer"})}function W(){const t=document.getElementById("inventory-container");if(!t)return;const e=nt();if(e.length===0){t.innerHTML=`
      <div class="border border-dashed border-notion-border rounded-lg p-8 text-center bg-notion-sidebar/40">
        <div class="text-2xl mb-2">🔍</div>
        <h3 class="text-sm font-semibold text-notion-text">No se encontraron componentes</h3>
        <p class="text-xs text-notion-muted mt-1 max-w-md mx-auto">
          No hay piezas que coincidan con tu búsqueda o filtro actual en <strong>${d(H().name)}</strong>.
        </p>
        <div class="mt-4 flex items-center justify-center gap-2">
          ${o.searchQuery||o.activeCategory!=="Todos"?'<button type="button" id="btn-empty-reset-filters" class="px-3 py-1.5 text-xs font-medium bg-white border border-notion-border rounded hover:bg-notion-hover cursor-pointer">Ver todos los componentes</button>':""}
          <button type="button" id="btn-empty-new-comp" class="px-3 py-1.5 text-xs font-semibold bg-notion-blue text-white rounded hover:bg-notion-blue-hover cursor-pointer">+ Anotar componente aquí</button>
        </div>
      </div>
    `;return}o.viewMode==="gallery"?t.innerHTML=lt(e):o.viewMode==="locations"?t.innerHTML=mt(e):t.innerHTML=ct(e)}function Ye(t){const e=ot(t.id),n=e.length>0?`<span class="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FBF3DB] text-[#8F6B00] inline-flex items-center gap-1" title="Prestado a ${d(e.map(r=>r.borrowerName).join(", "))}">🤝 ${e.reduce((r,i)=>r+i.quantity,0)} prestado(s)</span>`:"";return t.quantity===0?`
      <div class="inline-flex flex-wrap items-center justify-center gap-1">
        <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#FBE4E4] text-[#E03E3E] border border-[#F5C6C6]">
          ⚠️ Agotado
        </span>
        ${n}
      </div>
    `:`
    <div class="inline-flex flex-wrap items-center justify-center gap-1">
      <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#EDF3EC] text-[#0F7B6C]">
        Disponible
      </span>
      ${n}
    </div>
  `}function Y(t){const e=t.quantity===0;return`
    <div class="inline-flex items-center gap-1 bg-notion-sidebar border border-notion-border rounded p-0.5">
      <button
        type="button"
        data-stock-action="dec"
        data-comp-id="${d(t.id)}"
        aria-label="Restar 1 unidad a ${d(t.name)}"
        ${e?"disabled":""}
        class="w-7 h-7 rounded bg-white hover:bg-notion-hover disabled:opacity-40 disabled:cursor-not-allowed border border-notion-border flex items-center justify-center font-bold text-sm text-notion-text transition-all active:scale-90 cursor-pointer"
      >-</button>
      <span
        data-stock-count="${d(t.id)}"
        class="w-8 text-center font-mono font-bold text-xs ${e?"text-[#E03E3E]":"text-notion-text"}"
      >${t.quantity}</span>
      <button
        type="button"
        data-stock-action="inc"
        data-comp-id="${d(t.id)}"
        aria-label="Sumar 1 unidad a ${d(t.name)}"
        class="w-7 h-7 rounded bg-white hover:bg-notion-hover border border-notion-border flex items-center justify-center font-bold text-sm text-notion-text transition-all active:scale-90 cursor-pointer"
      >+</button>
    </div>
  `}function ct(t){return`
    <div tabindex="0" role="region" aria-labelledby="inventory-table-caption" class="table-wrapper border border-notion-border rounded-lg bg-white">
      <table class="notion-table text-left text-xs">
        <caption id="inventory-table-caption" class="sr-only">
          Componentes del inventario ${d(H().name)}
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
          ${t.map(e=>{const n=e.quantity===0,r=G(e.category),i=R(e.category);return`
                <tr class="hover:bg-notion-sidebar/50 transition-colors ${n?"row-agotado bg-[#FFF9F9]":""}">
                  <th scope="row" class="py-2.5 px-3 font-normal text-left">
                    <div class="flex items-start gap-2.5">
                      <span class="text-base mt-0.5">${d(r.icon)}</span>
                      <div>
                        <div class="font-semibold text-notion-text">${d(e.name)}</div>
                        <div class="flex flex-wrap items-center gap-1.5 mt-0.5">
                          <span class="font-mono text-[11px] text-notion-text px-1.5 py-0.2 rounded bg-notion-sidebar border border-notion-border">
                            ${d(e.model)}
                          </span>
                          ${e.notes?`<span class="text-[11px] text-notion-muted truncate max-w-[220px]" title="${d(e.notes)}">${d(e.notes)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  </th>
                  <td class="py-2.5 px-3">
                    <span class="px-2 py-0.5 rounded text-[11px] font-medium ${i}">
                      ${d(e.category)}
                    </span>
                  </td>
                  <td class="py-2.5 px-3">
                    <div class="flex items-center gap-1.5 text-notion-text font-mono text-[11px]">
                      <span>📍</span>
                      <span>${d(e.location)}</span>
                    </div>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    ${Ye(e)}
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    ${Y(e)}
                  </td>
                  <td class="py-2.5 px-3 text-right">
                    <div class="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        data-loan-comp-id="${d(e.id)}"
                        ${n?"disabled":""}
                        title="${n?"Sin unidades disponibles para prestar":"Prestar unidad a un compañero"}"
                        class="btn-quick-loan text-xs px-2 py-1 rounded border border-notion-border bg-white hover:bg-notion-hover disabled:opacity-40 disabled:cursor-not-allowed text-notion-text font-medium cursor-pointer"
                      >
                        🤝 Prestar
                      </button>
                      <button
                        type="button"
                        data-edit-comp-id="${d(e.id)}"
                        class="btn-edit-comp text-xs text-notion-blue hover:underline font-medium px-1 cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-delete-comp-id="${d(e.id)}"
                        title="Eliminar este componente"
                        class="btn-delete-comp-row p-1 rounded text-notion-muted hover:text-[#E03E3E] hover:bg-[#FBE4E4] transition-colors cursor-pointer"
                      >
                        <span class="material-symbols-outlined text-[15px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              `}).join("")}
        </tbody>
      </table>
    </div>
  `}function lt(t){return`
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      ${t.map(e=>{const n=e.quantity===0,r=G(e.category),i=R(e.category);return`
            <article class="rounded-lg border ${n?"border-[#F5C6C6] bg-[#FFFDFD]":"border-notion-border bg-white"} p-3.5 flex flex-col justify-between gap-3 hover:border-notion-text/30 transition-all">
              <div>
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-1.5">
                    <span class="text-base">${d(r.icon)}</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-medium ${i}">${d(e.category)}</span>
                  </div>
                  ${Ye(e)}
                </div>

                <h3 class="font-headline font-semibold text-sm text-notion-text mt-2">
                  ${d(e.name)}
                </h3>
                <div class="mt-1">
                  <span class="font-mono text-xs px-1.5 py-0.5 rounded bg-notion-sidebar border border-notion-border text-notion-text">
                    ${d(e.model)}
                  </span>
                </div>

                <div class="mt-2.5 flex items-center gap-1.5 text-xs text-notion-muted font-mono">
                  <span>📍</span>
                  <span class="truncate">${d(e.location)}</span>
                </div>
                ${e.notes?`<p class="mt-1.5 text-[11px] text-notion-muted line-clamp-2">${d(e.notes)}</p>`:""}
              </div>

              <div class="pt-2.5 border-t border-notion-border flex items-center justify-between gap-2">
                <div class="flex items-center gap-1.5">
                  <button
                    type="button"
                    data-edit-comp-id="${d(e.id)}"
                    class="btn-edit-comp text-xs text-notion-blue hover:underline font-medium cursor-pointer"
                  >
                    Editar
                  </button>
                  <span class="text-notion-border">·</span>
                  <button
                    type="button"
                    data-loan-comp-id="${d(e.id)}"
                    ${n?"disabled":""}
                    class="btn-quick-loan text-xs text-notion-muted hover:text-notion-text disabled:opacity-40 cursor-pointer"
                  >
                    🤝 Prestar
                  </button>
                  <span class="text-notion-border">·</span>
                  <button
                    type="button"
                    data-delete-comp-id="${d(e.id)}"
                    title="Eliminar componente"
                    class="btn-delete-comp-row text-xs text-notion-muted hover:text-[#E03E3E] cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
                ${Y(e)}
              </div>
            </article>
          `}).join("")}
    </div>
  `}function mt(t){const e=new Map;for(const n of t){const r=n.location.split("·")[0].trim()||"Sin ubicación";e.has(r)||e.set(r,[]),e.get(r).push(n)}return`
    <div class="space-y-4">
      ${Array.from(e.entries()).map(([n,r])=>`
          <div class="border border-notion-border rounded-lg overflow-hidden bg-white">
            <div class="bg-notion-sidebar px-4 py-2 border-b border-notion-border flex items-center justify-between">
              <div class="flex items-center gap-2 font-headline text-xs font-bold text-notion-text">
                <span>📍</span>
                <span>${d(n)}</span>
              </div>
              <span class="text-[11px] font-mono text-notion-muted">${r.length} referencias</span>
            </div>
            <div class="divide-y divide-notion-border">
              ${r.map(i=>`
                  <div class="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 hover:bg-notion-sidebar/40">
                    <div class="min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="font-semibold text-xs text-notion-text">${d(i.name)}</span>
                        <span class="font-mono text-[11px] px-1.5 py-0.2 rounded bg-notion-sidebar border border-notion-border">${d(i.model)}</span>
                        <span class="px-2 py-0.2 rounded text-[10px] font-medium ${R(i.category)}">${d(i.category)}</span>
                        ${i.quantity===0?'<span class="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-[#FBE4E4] text-[#E03E3E]">⚠️ Agotado</span>':""}
                      </div>
                      <div class="text-[11px] font-mono text-notion-muted mt-0.5">
                        Sub-ubicación: ${d(i.location)}
                      </div>
                    </div>
                    <div class="flex items-center gap-2.5">
                      ${Y(i)}
                      <button type="button" data-edit-comp-id="${d(i.id)}" class="btn-edit-comp text-xs text-notion-blue hover:underline font-medium cursor-pointer">Editar</button>
                      <button type="button" data-delete-comp-id="${d(i.id)}" class="btn-delete-comp-row p-1 rounded text-notion-muted hover:text-[#E03E3E] hover:bg-[#FBE4E4] cursor-pointer" title="Eliminar componente">
                        <span class="material-symbols-outlined text-[15px]">delete</span>
                      </button>
                    </div>
                  </div>
                `).join("")}
            </div>
          </div>
        `).join("")}
    </div>
  `}function _e(){const t=document.getElementById("loans-container"),e=document.getElementById("loans-pending-pill");if(!t||!e)return;const n=o.loans.filter(m=>m.status==="Pendiente"),r=o.loans.filter(m=>m.status==="Devuelto"),i=n.reduce((m,v)=>m+Number(v.quantity||1),0);e.textContent=`${n.length} PENDIENTE${n.length===1?"":"S"}`;const a=document.getElementById("loans-kpi-active"),s=document.getElementById("loans-kpi-units"),l=document.getElementById("loans-kpi-returned");a&&(a.textContent=String(n.length)),s&&(s.textContent=String(i)),l&&(l.textContent=String(r.length)),document.querySelectorAll(".loan-filter-btn").forEach(m=>{const v=m.getAttribute("data-loan-filter"),$=v===o.loanFilter,w=$?"ring-2 ring-[#37352F] font-semibold":"opacity-80 hover:opacity-100";v==="Todos"?m.className=`loan-filter-btn px-2.5 py-1 rounded text-xs cursor-pointer ${$?"bg-[#37352F] text-white font-semibold":"bg-notion-sidebar text-notion-text"}`:v==="Pendiente"?m.className=`loan-filter-btn px-2.5 py-1 rounded text-xs bg-[#FBF3DB] text-[#8F6B00] cursor-pointer ${w}`:m.className=`loan-filter-btn px-2.5 py-1 rounded text-xs bg-[#EDF3EC] text-[#0F7B6C] cursor-pointer ${w}`});const b=o.loans.filter(m=>o.loanFilter==="Todos"?!0:m.status===o.loanFilter);if(b.length===0){t.innerHTML=`
      <div class="p-8 text-center text-xs text-notion-muted">
        <div class="text-2xl mb-2">🤝</div>
        <div class="font-semibold text-notion-text">No hay préstamos en esta vista</div>
        <p class="mt-1">Usa el botón <strong>"Registrar préstamo"</strong> cuando le prestes un componente a un compañero.</p>
      </div>
    `;return}t.innerHTML=`
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
          ${b.map(m=>{const v=m.status==="Pendiente",$=m.borrowerName.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();return`
                <tr class="hover:bg-notion-sidebar/40 transition-colors ${v?"":"opacity-60"}">
                  <td class="py-2.5 px-3 font-medium text-notion-text">
                    🤝 ${d(m.componentName)}
                  </td>
                  <td class="py-2.5 px-3">
                    <div class="flex items-center gap-2">
                      <span class="w-5 h-5 rounded-full bg-[#DDEBF1] text-[#0B6E99] flex items-center justify-center font-bold text-[10px]">
                        ${d($)}
                      </span>
                      <div>
                        <span class="font-medium text-notion-text">${d(m.borrowerName)}</span>
                        ${m.borrowerGroup?`<span class="text-notion-muted text-[11px] ml-1">(${d(m.borrowerGroup)})</span>`:""}
                      </div>
                    </div>
                  </td>
                  <td class="py-2.5 px-3 text-center font-mono font-bold">
                    x${m.quantity}
                  </td>
                  <td class="py-2.5 px-3 font-mono text-[11px] text-notion-muted">
                    ${d(m.date)}
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    ${v?'<span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#FBF3DB] text-[#8F6B00]">Pendiente de devolución</span>':'<span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#EDF3EC] text-[#0F7B6C]">✓ Devuelto al taller</span>'}
                  </td>
                  <td class="py-2.5 px-3 text-right">
                    ${v?`<button
                            type="button"
                            data-return-loan-id="${d(m.id)}"
                            class="btn-return-loan px-2.5 py-1 text-xs bg-white border border-notion-border hover:bg-notion-hover text-notion-blue font-semibold rounded transition-colors cursor-pointer"
                          >
                            ✓ Marcar devuelto (+${m.quantity} stock)
                          </button>`:`<button
                            type="button"
                            data-delete-loan-id="${d(m.id)}"
                            class="btn-delete-loan text-[11px] text-notion-muted hover:text-[#E03E3E] cursor-pointer"
                          >
                            Borrar registro
                          </button>`}
                  </td>
                </tr>
              `}).join("")}
        </tbody>
      </table>
    </div>
  `}function ut(t,e){const n=o.components.find(i=>i.id===t);if(!n)return;const r=Math.max(0,Number(n.quantity||0)+e);r!==n.quantity&&(n.quantity=r,f(),r===0?I(`${n.model} quedó en 0 uds — Marcado como Agotado`,"⚠️"):I(`Stock actualizado: ${n.model} → ${r} ${r===1?"unidad":"unidades"}`,e>0?"➕":"➖"))}function He(t){const e=o.components.find(n=>n.id===t);e&&V({title:`¿Eliminar "${e.name}" (${e.model})?`,message:`Se eliminará este componente (${e.quantity} unidades en ${e.location}) del inventario. ¿Estás seguro de que deseas continuar?`,confirmText:"Sí, eliminar componente",onConfirm:()=>{o.components=o.components.filter(n=>n.id!==t),A(),f(),I(`Componente eliminado: ${e.model}`,"🗑️")}})}function Oe(t){const e=o.inventories.find(r=>r.id===t);if(!e||e.isDefault)return;const n=M(e.id).length;V({title:`¿Eliminar el inventario "${e.icon} ${e.name}"?`,message:n>0?`Este inventario contiene ${n} componente(s) registrado(s) que también se eliminarán. ¿Estás seguro de eliminar este inventario?`:`Se eliminará el inventario "${e.name}". ¿Estás seguro de continuar?`,confirmText:"Sí, eliminar inventario",onConfirm:()=>{o.components=o.components.filter(r=>r.inventoryId!==e.id),o.inventories=o.inventories.filter(r=>r.id!==e.id),o.activeInventoryId===e.id&&(o.activeInventoryId="general"),f(),I(`Inventario "${e.name}" eliminado`,"🗑️")}})}function pt(t){const e=q().find(r=>r.name===t);if(!e||e.isDefault)return;const n=o.components.filter(r=>r.category===t).length;V({title:`¿Eliminar la categoría "${e.icon} ${e.name}"?`,message:n>0?`Hay ${n} componente(s) con esta categoría (pasarán a "Pasivos"). ¿Estás seguro de eliminar la categoría "${e.name}"?`:`Se eliminará la categoría personalizada "${e.name}". ¿Estás seguro?`,confirmText:"Sí, eliminar categoría",onConfirm:()=>{o.components.forEach(r=>{r.category===t&&(r.category="Pasivos")}),o.categories=q().filter(r=>r.name!==t),o.activeCategory===t&&(o.activeCategory="Todos"),f(),I(`Categoría "${t}" eliminada`,"🗑️")}})}function j(t){var i;const e=document.getElementById("comp-category");if(!e)return;const n=q(),r=t&&n.some(a=>a.name===t)?t:((i=n[0])==null?void 0:i.name)||"Sensores";e.innerHTML=n.map(a=>`<option value="${d(a.name)}" ${a.name===r?"selected":""}>${d(a.icon)} ${d(a.name)}</option>`).join("")}function Ze(t){const e=document.getElementById("comp-inventory");e&&(e.innerHTML=o.inventories.map(n=>`<option value="${d(n.id)}" ${n.id===t?"selected":""}>${d(n.icon)} ${d(n.name)}</option>`).join(""))}function L(){const t=document.getElementById("comp-quantity"),e=document.getElementById("drawer-stock-status-pill"),n=document.getElementById("comp-category"),r=document.getElementById("drawer-category-emoji");if(r&&n){const a=G(n.value);r.textContent=a.icon||"📦"}if(!t||!e)return;Math.max(0,parseInt(t.value||"0",10))===0?(e.textContent="⚠️ Agotado (0)",e.className="text-[11px] px-2 py-0.5 rounded font-semibold bg-[#FBE4E4] text-[#E03E3E]"):(e.textContent="Disponible",e.className="text-[11px] px-2 py-0.5 rounded font-medium bg-[#EDF3EC] text-[#0F7B6C]")}function U(){const t=document.getElementById("side-peek-drawer"),e=document.getElementById("component-form");if(!t||!e)return;e.reset(),document.getElementById("comp-id").value="",document.getElementById("drawer-mode-label").textContent="Anotar Nuevo Componente",document.getElementById("btn-delete-component").classList.add("hidden"),document.getElementById("comp-quantity").value="1";const n=o.activeCategory!=="Todos"&&o.activeCategory!=="Agotados"?o.activeCategory:"Sensores";j(n),Ze(o.activeInventoryId),document.getElementById("instant-loan-fields").classList.add("hidden"),L(),t.classList.remove("hidden"),document.getElementById("comp-name").focus()}function gt(t){const e=o.components.find(i=>i.id===t),n=document.getElementById("side-peek-drawer"),r=document.getElementById("component-form");!e||!n||!r||(r.reset(),document.getElementById("comp-id").value=e.id,document.getElementById("drawer-mode-label").textContent="Editar Componente",document.getElementById("btn-delete-component").classList.remove("hidden"),document.getElementById("comp-name").value=e.name,document.getElementById("comp-model").value=e.model,j(e.category),Ze(e.inventoryId),document.getElementById("comp-quantity").value=String(e.quantity),document.getElementById("comp-location").value=e.location,document.getElementById("comp-notes").value=e.notes||"",document.getElementById("instant-loan-fields").classList.add("hidden"),L(),n.classList.remove("hidden"))}function A(){var t;(t=document.getElementById("side-peek-drawer"))==null||t.classList.add("hidden")}function ze(){const t=document.getElementById("inventory-dialog"),e=document.getElementById("inventory-form");!t||!e||(e.reset(),document.getElementById("inv-edit-id").value="",document.getElementById("inv-dialog-title").textContent="Crear Nuevo Inventario por Proyecto",document.getElementById("btn-submit-inv-dialog").textContent="Crear Inventario",t.showModal(),document.getElementById("inv-name").focus())}function Ue(t){const e=o.inventories.find(i=>i.id===t),n=document.getElementById("inventory-dialog"),r=document.getElementById("inventory-form");!e||!n||!r||(r.reset(),document.getElementById("inv-edit-id").value=e.id,document.getElementById("inv-dialog-title").textContent="Renombrar / Editar Inventario",document.getElementById("btn-submit-inv-dialog").textContent="Guardar Cambios",document.getElementById("inv-icon").value=e.icon||"📦",document.getElementById("inv-name").value=e.name,document.getElementById("inv-badge").value=e.badge||"",document.getElementById("inv-desc").value=e.description||"",n.showModal(),document.getElementById("inv-name").focus())}function Qe(){const t=document.getElementById("category-dialog"),e=document.getElementById("category-form");!t||!e||(e.reset(),t.showModal(),document.getElementById("cat-name").focus())}function Q(t=""){const e=document.getElementById("loan-dialog"),n=document.getElementById("loan-component-select"),r=document.getElementById("loan-form");if(!e||!n||!r)return;r.reset();const i=o.components.filter(s=>s.quantity>0);if(i.length===0){I("No hay componentes con stock > 0 para prestar","⚠️");return}n.innerHTML=i.map(s=>{const l=o.inventories.find(m=>m.id===s.inventoryId),b=s.id===t?"selected":"";return`<option value="${d(s.id)}" ${b}>${d(s.name)} (${d(s.model)}) — Disp: ${s.quantity} [${d(l?l.name:"General")}]</option>`}).join("");const a=new Date().toLocaleDateString("es-CO",{day:"2-digit",month:"short"});document.getElementById("loan-date").value=a,e.showModal()}function yt(){var $,w,_,Z,J,X,ee,te,ne,oe,ie,ae,re,se,de,ce,le,me,ue,pe,ge,ye,ve,be,fe,xe,Ee,Ie,he,Be,Ce,$e,we,Le,Se,ke,Ae,qe,Me,De,Fe,Te,Pe,Ne,je,Ge,Re;f();const t=document.getElementById("loan-dialog"),e=document.getElementById("inventory-dialog"),n=document.getElementById("category-dialog"),r=document.getElementById("confirm-delete-dialog");F(t),F(e),F(n),F(r),T.init(document.getElementById("component-form")),T.init(document.getElementById("loan-form")),T.init(document.getElementById("inventory-form")),T.init(document.getElementById("category-form")),($=document.getElementById("btn-cancel-confirm-delete"))==null||$.addEventListener("click",()=>{N=null,r==null||r.close()}),(w=document.getElementById("btn-accept-confirm-delete"))==null||w.addEventListener("click",()=>{const c=N;N=null,r==null||r.close(),typeof c=="function"&&c()}),(_=document.getElementById("top-screen-inventory"))==null||_.addEventListener("click",()=>{k("inventory")}),(Z=document.getElementById("top-screen-loans"))==null||Z.addEventListener("click",()=>{k("loans")}),(J=document.getElementById("btn-back-to-inventory"))==null||J.addEventListener("click",()=>{k("inventory")}),document.querySelectorAll(".view-tab").forEach(c=>{c.addEventListener("click",()=>{o.viewMode=c.getAttribute("data-view")||"table",f()})});const i=document.getElementById("search-input"),a=document.getElementById("btn-clear-search");i==null||i.addEventListener("input",c=>{o.searchQuery=c.target.value,a==null||a.classList.toggle("hidden",!o.searchQuery),W()}),a==null||a.addEventListener("click",()=>{o.searchQuery="",i.value="",a.classList.add("hidden"),W(),i.focus()}),(X=document.getElementById("left-sidebar"))==null||X.addEventListener("click",c=>{const u=c.target.closest("[data-rename-inv-id]");if(u){Ue(u.getAttribute("data-rename-inv-id"));return}const y=c.target.closest("[data-delete-inv-id]");if(y){Oe(y.getAttribute("data-delete-inv-id"));return}const p=c.target.closest(".sidebar-inv-btn");if(p){o.activeInventoryId=p.getAttribute("data-inv-id"),o.activeCategory="Todos",o.activeScreen="inventory",v(),f();return}});const s=c=>{o.activeScreen="inventory",o.activeCategory=c,v(),f()};(ee=document.getElementById("nav-filter-all"))==null||ee.addEventListener("click",()=>s("Todos")),(te=document.getElementById("kpi-card-all"))==null||te.addEventListener("click",()=>s("Todos")),(ne=document.getElementById("nav-filter-agotados"))==null||ne.addEventListener("click",()=>s("Agotados")),(oe=document.getElementById("kpi-card-agotados"))==null||oe.addEventListener("click",()=>s("Agotados")),(ie=document.getElementById("kpi-card-loans"))==null||ie.addEventListener("click",()=>k("loans")),(ae=document.getElementById("category-pills-bar"))==null||ae.addEventListener("click",c=>{if(c.target.closest("#btn-pill-new-category")){Qe();return}const u=c.target.closest("[data-delete-cat]");if(u){pt(u.getAttribute("data-delete-cat"));return}const y=c.target.closest(".cat-pill-btn");y&&(o.activeCategory=y.getAttribute("data-pill-cat")||"Todos",f())}),(re=document.getElementById("loan-filter-pills"))==null||re.addEventListener("click",c=>{const u=c.target.closest(".loan-filter-btn");u&&(o.loanFilter=u.getAttribute("data-loan-filter")||"Todos",_e())}),(se=document.getElementById("inventory-container"))==null||se.addEventListener("click",c=>{const u=c.target.closest("[data-stock-action]");if(u){const C=u.getAttribute("data-comp-id"),x=u.getAttribute("data-stock-action");ut(C,x==="inc"?1:-1);return}const y=c.target.closest(".btn-edit-comp");if(y){gt(y.getAttribute("data-edit-comp-id"));return}const p=c.target.closest(".btn-delete-comp-row");if(p){He(p.getAttribute("data-delete-comp-id"));return}const g=c.target.closest(".btn-quick-loan");if(g){Q(g.getAttribute("data-loan-comp-id"));return}if(c.target.closest("#btn-empty-reset-filters")){o.searchQuery="",o.activeCategory="Todos",i&&(i.value=""),a==null||a.classList.add("hidden"),f();return}c.target.closest("#btn-empty-new-comp")&&U()}),(de=document.getElementById("loans-container"))==null||de.addEventListener("click",c=>{const u=c.target.closest(".btn-return-loan");if(u){const p=u.getAttribute("data-return-loan-id"),g=o.loans.find(x=>x.id===p);if(!g||g.status==="Devuelto")return;g.status="Devuelto";const C=o.components.find(x=>x.id===g.componentId);C&&(C.quantity=Number(C.quantity||0)+Number(g.quantity||1)),f(),I(`Devuelto por ${g.borrowerName}: +${g.quantity} ud(s) sumadas al stock`,"🤝");return}const y=c.target.closest(".btn-delete-loan");if(y){const p=y.getAttribute("data-delete-loan-id");o.loans=o.loans.filter(g=>g.id!==p),f(),I("Registro de préstamo eliminado","🗑️")}}),(ce=document.getElementById("btn-new-component-top"))==null||ce.addEventListener("click",U),(le=document.getElementById("btn-close-drawer"))==null||le.addEventListener("click",A),(me=document.getElementById("btn-cancel-drawer"))==null||me.addEventListener("click",A),(ue=document.getElementById("comp-category"))==null||ue.addEventListener("change",L),(pe=document.getElementById("comp-quantity"))==null||pe.addEventListener("input",L),(ge=document.getElementById("drawer-qty-minus"))==null||ge.addEventListener("click",()=>{const c=document.getElementById("comp-quantity");c.value=String(Math.max(0,parseInt(c.value||"0",10)-1)),L()}),(ye=document.getElementById("drawer-qty-plus"))==null||ye.addEventListener("click",()=>{const c=document.getElementById("comp-quantity");c.value=String(Math.max(0,parseInt(c.value||"0",10)+1)),L()}),(ve=document.getElementById("comp-instant-loan"))==null||ve.addEventListener("change",c=>{var u;(u=document.getElementById("instant-loan-fields"))==null||u.classList.toggle("hidden",!c.target.checked)}),(be=document.getElementById("component-form"))==null||be.addEventListener("submit",c=>{c.preventDefault();const u=c.currentTarget;if(!u.checkValidity()){const E=u.querySelector(":invalid");E==null||E.focus();return}const y=document.getElementById("comp-id").value.trim(),p=document.getElementById("comp-name").value.trim(),g=document.getElementById("comp-model").value.trim(),C=document.getElementById("comp-category").value,x=document.getElementById("comp-inventory").value,h=Math.max(0,parseInt(document.getElementById("comp-quantity").value||"0",10)),B=document.getElementById("comp-location").value.trim(),S=document.getElementById("comp-notes").value.trim(),O=document.getElementById("comp-instant-loan").checked,Ve=document.getElementById("comp-loan-borrower").value.trim(),Je=document.getElementById("comp-loan-group").value.trim();let D=y;if(y){const E=o.components.find(z=>z.id===y);E&&(E.name=p,E.model=g,E.category=C,E.inventoryId=x,E.quantity=h,E.location=B,E.notes=S),I(`Componente actualizado: ${g}`,"✓")}else D=`comp-${Date.now()}`,o.components.unshift({id:D,inventoryId:x,name:p,model:g,category:C,quantity:h,location:B,notes:S}),o.activeInventoryId=x,o.activeScreen="inventory",I(`Componente registrado en MecaKit: ${g}`,"✨");if(O&&Ve){const E=o.components.find(Xe=>Xe.id===D);E&&E.quantity>0&&(E.quantity-=1);const z=new Date().toLocaleDateString("es-CO",{day:"2-digit",month:"short"});o.loans.unshift({id:`loan-${Date.now()}`,componentId:D,inventoryId:x,componentName:`${p} (${g})`,borrowerName:Ve,borrowerGroup:Je||"Compañero de carrera",quantity:1,date:z,status:"Pendiente",notes:""})}A(),f()}),(fe=document.getElementById("btn-delete-component"))==null||fe.addEventListener("click",()=>{const c=document.getElementById("comp-id").value;c&&He(c)}),(xe=document.getElementById("btn-drawer-new-category"))==null||xe.addEventListener("click",Qe),(Ee=document.getElementById("btn-close-cat-dialog"))==null||Ee.addEventListener("click",()=>n==null?void 0:n.close()),(Ie=document.getElementById("btn-cancel-cat-dialog"))==null||Ie.addEventListener("click",()=>n==null?void 0:n.close()),(he=document.getElementById("category-form"))==null||he.addEventListener("submit",c=>{var x;c.preventDefault();const u=c.currentTarget;if(!u.checkValidity()){(x=u.querySelector(":invalid"))==null||x.focus();return}const y=document.getElementById("cat-icon").value||"🔋",p=document.getElementById("cat-name").value.trim(),g=document.getElementById("cat-color").value||"teal";if(q().some(h=>h.name.toLowerCase()===p.toLowerCase())){I(`La categoría "${p}" ya existe`,"⚠️"),n==null||n.close(),j(p),L();return}o.categories.push({name:p,icon:y,color:g,isDefault:!1}),n==null||n.close(),f(),j(p),L(),I(`Categoría creada: ${y} ${p}`,"🏷️")}),(Be=document.getElementById("btn-open-loan-modal-top"))==null||Be.addEventListener("click",()=>Q()),(Ce=document.getElementById("btn-open-loan-modal-section"))==null||Ce.addEventListener("click",()=>Q()),($e=document.getElementById("btn-close-loan-dialog"))==null||$e.addEventListener("click",()=>t==null?void 0:t.close()),(we=document.getElementById("btn-cancel-loan-dialog"))==null||we.addEventListener("click",()=>t==null?void 0:t.close()),(Le=document.getElementById("loan-form"))==null||Le.addEventListener("submit",c=>{var S;c.preventDefault();const u=c.currentTarget;if(!u.checkValidity()){(S=u.querySelector(":invalid"))==null||S.focus();return}const y=document.getElementById("loan-component-select").value,p=document.getElementById("loan-borrower-name").value.trim(),g=document.getElementById("loan-borrower-group").value.trim(),C=Math.max(1,parseInt(document.getElementById("loan-quantity").value||"1",10)),x=document.getElementById("loan-date").value.trim()||"Hoy",h=o.components.find(O=>O.id===y);if(!h)return;const B=Math.min(h.quantity,C);h.quantity-=B,o.loans.unshift({id:`loan-${Date.now()}`,componentId:h.id,inventoryId:h.inventoryId,componentName:`${h.name} (${h.model})`,borrowerName:p,borrowerGroup:g,quantity:B,date:x,status:"Pendiente",notes:""}),t==null||t.close(),f(),I(`Préstamo registrado a ${p} (-${B} en stock)`,"🤝")}),(Se=document.getElementById("btn-new-inventory"))==null||Se.addEventListener("click",()=>{v(),ze()}),(ke=document.getElementById("btn-new-inventory-icon"))==null||ke.addEventListener("click",()=>{v(),ze()}),(Ae=document.getElementById("btn-edit-inventory"))==null||Ae.addEventListener("click",()=>{Ue(o.activeInventoryId)}),(qe=document.getElementById("btn-close-inv-dialog"))==null||qe.addEventListener("click",()=>e==null?void 0:e.close()),(Me=document.getElementById("btn-cancel-inv-dialog"))==null||Me.addEventListener("click",()=>e==null?void 0:e.close()),(De=document.getElementById("inventory-form"))==null||De.addEventListener("submit",c=>{var h;c.preventDefault();const u=c.currentTarget;if(!u.checkValidity()){(h=u.querySelector(":invalid"))==null||h.focus();return}const y=document.getElementById("inv-edit-id").value.trim(),p=document.getElementById("inv-icon").value||"🤖",g=document.getElementById("inv-name").value.trim(),C=document.getElementById("inv-badge").value.trim()||"Proyecto Personal",x=document.getElementById("inv-desc").value.trim()||`Inventario personalizado para el proyecto ${g}.`;if(y){const B=o.inventories.find(S=>S.id===y);B&&(B.icon=p,B.name=g,B.badge=C,B.description=x),e==null||e.close(),f(),I(`Inventario actualizado: ${p} ${g}`,"✏️")}else{const B=`inv-${Date.now()}`;o.inventories.push({id:B,name:g,icon:p,badge:C,description:x,isDefault:!1}),o.activeInventoryId=B,o.activeCategory="Todos",o.activeScreen="inventory",e==null||e.close(),f(),I(`Inventario creado: ${p} ${g}`,"🗂️")}}),(Fe=document.getElementById("btn-delete-inventory"))==null||Fe.addEventListener("click",()=>{Oe(o.activeInventoryId)}),(Te=document.getElementById("btn-reset-demo"))==null||Te.addEventListener("click",()=>{V({title:"¿Restaurar los datos de demostración?",message:"Se restablecerán los inventarios, categorías y componentes originales de ejemplo de Camilo.",confirmText:"Sí, restaurar ejemplo",onConfirm:()=>{o=tt();const c=document.getElementById("search-input");c&&(c.value=""),f(),I("Datos de demostración restaurados","🔄")}})});const l=document.getElementById("left-sidebar"),b=document.getElementById("mobile-sidebar-backdrop");function m(){l==null||l.classList.remove("-translate-x-full"),b==null||b.classList.remove("hidden")}function v(){l==null||l.classList.add("-translate-x-full"),b==null||b.classList.add("hidden")}(Pe=document.getElementById("btn-mobile-menu"))==null||Pe.addEventListener("click",m),(Ne=document.getElementById("btn-close-sidebar-mobile"))==null||Ne.addEventListener("click",v),b==null||b.addEventListener("click",v),(je=document.getElementById("mob-nav-inventory"))==null||je.addEventListener("click",()=>{v(),A(),k("inventory")}),(Ge=document.getElementById("mob-nav-loans"))==null||Ge.addEventListener("click",()=>{v(),A(),k("loans")}),(Re=document.getElementById("mob-nav-add"))==null||Re.addEventListener("click",()=>{v(),U()})}document.addEventListener("DOMContentLoaded",yt);

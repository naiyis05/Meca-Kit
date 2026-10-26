(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const r of d.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function a(o){if(o.ep)return;o.ep=!0;const d=n(o);fetch(o.href,d)}})();const Ye="mecakit_state_v1",U=[{name:"Sensores",icon:"📡",color:"blue",isDefault:!0},{name:"Microcontroladores",icon:"⚡",color:"purple",isDefault:!0},{name:"Actuadores",icon:"🦾",color:"orange",isDefault:!0},{name:"Pasivos",icon:"🔋",color:"green",isDefault:!0}],T={activeInventoryId:"general",viewMode:"table",activeCategory:"Todos",searchQuery:"",categories:structuredClone(U),inventories:[{id:"general",name:"Inventario General",icon:"📦",badge:"Lab Mecatrónica #4",description:"Consulta en segundos tus componentes electrónicos, ubicación física y préstamos activos de taller.",isDefault:!0},{id:"brazo-robotico",name:"Brazo Robótico 4-DOF",icon:"🤖",badge:"Proyecto Mitad Semestre",description:"Inventario dedicado de actuadores, sensores de posición y control para el brazo robótico.",isDefault:!1},{id:"seguidor-linea",name:"Seguidor de Línea Lab 3",icon:"🏎️",badge:"Control Automático",description:"Piezas separadas para el robot velocista con control PID analógico/digital.",isDefault:!1}],components:[{id:"comp-1",inventoryId:"general",name:"Módulo WiFi & Bluetooth Dual-Core",model:"ESP32-WROOM-32",category:"Microcontroladores",quantity:0,location:"Caja Antiestática 1 · Comp. B",notes:"Se usaron los últimos 2 en el prototipo IoT. Comprar con pines soldados."},{id:"comp-2",inventoryId:"general",name:"Sensor Ultrasónico de Distancia",model:"HC-SR04",category:"Sensores",quantity:4,location:"Caja Sensores · Gaveta 1",notes:"Rango 2cm a 400cm, alimentación 5V DC."},{id:"comp-3",inventoryId:"general",name:"Driver Controlador Puente H Doble",model:"L298N Dual H-Bridge",category:"Actuadores",quantity:0,location:"Cajón Potencia · Gaveta 4",notes:"Soporta hasta 2A por puente. Agotado tras práctica de motores DC."},{id:"comp-4",inventoryId:"general",name:"Micro Servomotor 9g 180°",model:"TowerPro SG90",category:"Actuadores",quantity:7,location:"Caja Organizadora A · Gaveta 3",notes:"Incluye crucetas plásticas y tornillos."},{id:"comp-5",inventoryId:"general",name:"Resistencia Película Metálica 1/4W",model:"10kΩ ±1%",category:"Pasivos",quantity:25,location:"Gavetero Pasivos · G-08",notes:"Para pull-up/pull-down en botones y sensores."},{id:"comp-6",inventoryId:"general",name:"Capacitor Cerámico Desacoplo 50V",model:"100nF (Código 104)",category:"Pasivos",quantity:35,location:"Gavetero Pasivos · G-12",notes:"Indispensable para filtrado de ruido en alimentación de MCUs."},{id:"comp-7",inventoryId:"general",name:"Placa de Desarrollo Microcontrolador",model:"Arduino Nano V3 ATmega328P",category:"Microcontroladores",quantity:2,location:"Caja Antiestática 1 · Comp. A",notes:"Bootloader Old Bootloader, conector Mini-B USB."},{id:"comp-8",inventoryId:"general",name:"Sensor IMU Acelerómetro + Giroscopio 6-DOF",model:"MPU-6050 (GY-521)",category:"Sensores",quantity:3,location:"Caja Sensores · Gaveta 2",notes:"Interfaz I2C (3.3V / 5V)."},{id:"comp-9",inventoryId:"general",name:"Regulador de Voltaje Step-Down Buck",model:"LM2596 DC-DC",category:"Pasivos",quantity:0,location:"Cajón Potencia · Gaveta 2",notes:"Ajustable 1.25V - 35V, máximo 3A."},{id:"comp-10",inventoryId:"brazo-robotico",name:"Servomotor Alto Torque Engranaje Metálico",model:"MG996R 180°",category:"Actuadores",quantity:4,location:"Maletín Brazo Robótico · Espuma 1",notes:"3 instalados en base/hombro/codo + 1 de repuesto."},{id:"comp-11",inventoryId:"brazo-robotico",name:"Controlador PWM 16 Canales I2C",model:"PCA9685",category:"Microcontroladores",quantity:1,location:"Maletín Brazo Robótico · Bolsa ESD",notes:"Alimentación externa de 6V para servos."},{id:"comp-12",inventoryId:"brazo-robotico",name:"Potenciómetro Lineal Rotativo 10k",model:"WH148 B10K",category:"Pasivos",quantity:0,location:"Caja Organizadora B · Gaveta 5",notes:"Falta comprar 2 para el modo maestro-esclavo."},{id:"comp-13",inventoryId:"seguidor-linea",name:"Sensor Óptico Reflectivo Infrarrojo",model:"TCRT5000",category:"Sensores",quantity:6,location:"Caja Seguidor · Compartimento C1",notes:"Arreglo de 5 sensores para lectura de línea negra + 1 repuesto."},{id:"comp-14",inventoryId:"seguidor-linea",name:"Motorreductor Micro Metal DC 6V",model:"N20 600RPM",category:"Actuadores",quantity:2,location:"Caja Seguidor · Compartimento C2",notes:"Con llantas de silicona de alto agarre."},{id:"comp-15",inventoryId:"seguidor-linea",name:"Driver Doble Puente H MOSFET",model:"TB6612FNG",category:"Microcontroladores",quantity:1,location:"Caja Seguidor · Bolsa Antiestática",notes:"Mucho más eficiente que el L298N, no cae voltaje."}],loans:[{id:"loan-1",componentId:"comp-2",inventoryId:"general",componentName:"Sensor Ultrasónico de Distancia (HC-SR04)",borrowerName:"Mateo Ríos",borrowerGroup:"Lab Robótica · Grupo 2",quantity:1,date:"20 Oct",status:"Pendiente",notes:"Lo necesita para calibrar su práctica hasta el viernes."},{id:"loan-2",componentId:"comp-4",inventoryId:"general",componentName:"Micro Servomotor 9g 180° (TowerPro SG90)",borrowerName:"Valentina Gómez",borrowerGroup:"Mecatrónica 5.º Sem",quantity:1,date:"22 Oct",status:"Pendiente",notes:"Prestado en el laboratorio 402 durante clase de sensores."}]};function tt(){try{const t=localStorage.getItem(Ye);if(!t)return structuredClone(T);const e=JSON.parse(t),n={...structuredClone(T),...e};return(!Array.isArray(n.categories)||n.categories.length===0)&&(n.categories=structuredClone(U)),n}catch{return structuredClone(T)}}function _e(t){try{localStorage.setItem(Ye,JSON.stringify(t))}catch(e){console.error("No se pudo guardar el estado en localStorage:",e)}}function nt(){const t=structuredClone(T);return _e(t),t}let i=tt(),P=null;function s(t=""){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function x(t,e="✓"){const n=document.getElementById("toast-container");if(!n)return;const a=document.createElement("div");a.className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#37352F] text-white text-xs font-medium shadow-md border border-black/10 transition-all duration-200",a.innerHTML=`<span class="text-sm">${s(e)}</span><span>${s(t)}</span>`,n.appendChild(a),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateY(6px)",setTimeout(()=>a.remove(),200)},2600)}function L(){return(!Array.isArray(i.categories)||i.categories.length===0)&&(i.categories=structuredClone(U)),i.categories}function j(t){const e=L().find(n=>n.name.toLowerCase()===String(t||"").toLowerCase());return e||{name:t||"General",icon:"📦",color:"gray",isDefault:!1}}function N(t){return`notion-tag-${j(t).color||"gray"}`}function G({title:t,message:e,confirmText:n="Sí, eliminar definitivamente",onConfirm:a}){const o=document.getElementById("confirm-delete-dialog"),d=document.getElementById("confirm-delete-title"),r=document.getElementById("confirm-delete-message"),p=document.getElementById("btn-accept-confirm-delete");!o||!d||!r||!p||(d.textContent=t,r.textContent=e,p.textContent=n,P=a,o.showModal())}function A(t){t&&("closedBy"in HTMLDialogElement.prototype||t.addEventListener("click",e=>{if(e.target!==t)return;const n=t.getBoundingClientRect();n.top<=e.clientY&&e.clientY<=n.top+n.height&&n.left<=e.clientX&&e.clientX<=n.left+n.width||t.close()}))}const M=(()=>{const t=new WeakMap,e=o=>{if(!o.checkValidity)return;const d=o.checkValidity();o.classList.toggle("user-invalid-fallback",!d),o.classList.toggle("user-valid-fallback",d),d?o.removeAttribute("aria-invalid"):o.setAttribute("aria-invalid","true")},n=o=>{const d=o.target;if(o.type==="reset"){const r=d.elements||[];for(const p of r)t.delete(p),p.classList.remove("user-invalid-fallback","user-valid-fallback"),p.removeAttribute("aria-invalid");return}if(!(!d||!d.checkValidity)){if(o.type==="input"||o.type==="change"){const r=t.get(d)||{hasInteracted:!1,hasBlurred:!1};r.hasInteracted=!0,t.set(d,r),r.hasBlurred&&e(d)}else if(o.type==="blur"){const r=t.get(d)||{hasInteracted:!1,hasBlurred:!1};r.hasBlurred=!0,t.set(d,r),r.hasInteracted&&e(d)}}};return{init:o=>{if(!o)return;const d=r=>{r.checkValidity()?r.removeAttribute("aria-invalid"):r.setAttribute("aria-invalid","true")};o.addEventListener("blur",r=>{r.target.matches("input[required], select[required]")&&d(r.target)},!0),o.addEventListener("submit",()=>{o.querySelectorAll("input[required], select[required]").forEach(r=>{d(r),r.classList.toggle("user-invalid-fallback",!r.checkValidity())})}),o.addEventListener("input",r=>{r.target.matches("input[required], select[required]")&&r.target.checkValidity()&&(r.target.removeAttribute("aria-invalid"),r.target.classList.remove("user-invalid-fallback"))}),CSS.supports("selector(:user-invalid)")||(o.addEventListener("blur",n,!0),o.addEventListener("input",n),o.addEventListener("change",n),o.addEventListener("reset",n,!0))}}})();function Q(){return i.inventories.find(t=>t.id===i.activeInventoryId)||i.inventories[0]}function k(t=i.activeInventoryId){return i.components.filter(e=>e.inventoryId===t)}function ot(){const t=k(i.activeInventoryId),e=i.searchQuery.trim().toLowerCase();return t.filter(n=>{if(i.activeCategory==="Agotados"){if(n.quantity>0)return!1}else if(i.activeCategory!=="Todos"&&n.category!==i.activeCategory)return!1;return e?n.name.toLowerCase().includes(e)||n.model.toLowerCase().includes(e)||n.location.toLowerCase().includes(e)||n.category.toLowerCase().includes(e):!0})}function at(t){return i.loans.filter(e=>e.componentId===t&&e.status==="Pendiente")}function y(){_e(i),it(),rt(),st(),dt(),ct(),z(),pt()}function it(){const t=document.getElementById("header-inventory-select");t&&(t.innerHTML=i.inventories.map(e=>{const n=k(e.id).length,a=e.id===i.activeInventoryId?"selected":"";return`<option value="${s(e.id)}" ${a}>${s(e.icon)} ${s(e.name)} (${n})</option>`}).join(""))}function rt(){const t=document.getElementById("sidebar-inventories-list");t&&(t.innerHTML=i.inventories.map(r=>{const p=r.id===i.activeInventoryId,B=k(r.id).length;return`
          <div class="group flex items-center justify-between rounded transition-colors ${p?"bg-[#E5E5E2] text-notion-text font-semibold":"text-notion-muted hover:bg-notion-hover hover:text-notion-text"}">
            <button
              type="button"
              data-inv-id="${s(r.id)}"
              class="sidebar-inv-btn flex-1 flex items-center gap-2 px-2.5 py-1.5 text-xs text-left truncate cursor-pointer"
            >
              <span class="text-sm">${s(r.icon)}</span>
              <span class="truncate">${s(r.name)}</span>
            </button>
            <div class="flex items-center gap-0.5 pr-1.5">
              <button
                type="button"
                data-rename-inv-id="${s(r.id)}"
                title="Renombrar o editar inventario"
                class="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-white/80 text-notion-muted hover:text-notion-text transition-opacity cursor-pointer"
              >
                <span class="material-symbols-outlined text-[13px]">edit</span>
              </button>
              ${r.isDefault?"":`<button
                      type="button"
                      data-delete-inv-id="${s(r.id)}"
                      title="Eliminar inventario"
                      class="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-[#FBE4E4] text-notion-muted hover:text-[#E03E3E] transition-opacity cursor-pointer"
                    >
                      <span class="material-symbols-outlined text-[13px]">delete</span>
                    </button>`}
              <span class="text-[10px] font-mono ${p?"bg-white text-notion-text font-semibold":"text-notion-muted"} px-1.5 py-0.5 rounded">${B}</span>
            </div>
          </div>
        `}).join(""));const e=k(i.activeInventoryId),n=e.filter(r=>r.quantity===0).length,a=i.loans.filter(r=>r.status==="Pendiente").length,o=i.components.reduce((r,p)=>r+Number(p.quantity||0),0);document.getElementById("sidebar-total-badge").textContent=String(e.length),document.getElementById("sidebar-agotados-badge").textContent=String(n),document.getElementById("sidebar-loans-badge").textContent=String(a),document.getElementById("sidebar-total-units").textContent=`${o} uds`;const d=document.getElementById("sidebar-categories-list");d&&(d.innerHTML=L().map(r=>{const p=e.filter(h=>h.category===r.name).length;return`
          <div class="group flex items-center justify-between rounded transition-colors ${i.activeCategory===r.name?"bg-[#E5E5E2] text-notion-text font-semibold":"text-notion-muted hover:bg-notion-hover hover:text-notion-text"}">
            <button
              type="button"
              data-cat="${s(r.name)}"
              class="sidebar-cat-btn flex-1 flex items-center gap-2 px-2.5 py-1.5 text-xs text-left truncate cursor-pointer"
            >
              <span>${s(r.icon||"📦")}</span>
              <span class="truncate">${s(r.name)}</span>
            </button>
            <div class="flex items-center gap-1 pr-2">
              ${r.isDefault?"":`<button
                      type="button"
                      data-delete-cat="${s(r.name)}"
                      title="Eliminar categoría ${s(r.name)}"
                      class="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-[#FBE4E4] text-notion-muted hover:text-[#E03E3E] transition-opacity cursor-pointer"
                    >
                      <span class="material-symbols-outlined text-[13px]">close</span>
                    </button>`}
              <span class="text-[10px] font-mono text-notion-muted">${p}</span>
            </div>
          </div>
        `}).join(""))}function st(){const t=Q(),e=k(t.id),n=e.reduce((r,p)=>r+Number(p.quantity||0),0),a=e.filter(r=>r.quantity===0).length,o=i.loans.filter(r=>r.status==="Pendiente").length;document.getElementById("active-inv-icon").textContent=t.icon,document.getElementById("active-inv-title").textContent=t.name,document.getElementById("active-inv-badge").textContent=t.badge||"Inventario Personal",document.getElementById("active-inv-desc").textContent=t.description;const d=document.getElementById("btn-delete-inventory");d&&d.classList.toggle("hidden",!!t.isDefault),document.getElementById("kpi-total-refs").textContent=String(e.length),document.getElementById("kpi-total-units").textContent=`${n} uds en stock`,document.getElementById("kpi-total-agotados").textContent=String(a),document.getElementById("kpi-total-loans").textContent=String(o)}function dt(){const t=document.getElementById("category-pills-bar");if(!t)return;const e=k(i.activeInventoryId),n=e.filter(o=>o.quantity===0).length,a=[{key:"Todos",label:`Todos (${e.length})`,pillClass:""},...L().map(o=>({key:o.name,label:`${o.icon} ${o.name} (${e.filter(d=>d.category===o.name).length})`,pillClass:N(o.name)})),{key:"Agotados",label:`⚠️ Solo Agotados (${n})`,pillClass:"bg-[#FBE4E4] text-[#E03E3E]"}];t.innerHTML=a.map(o=>{const d=i.activeCategory===o.key,r=d?"ring-2 ring-[#37352F] font-semibold":"opacity-85 hover:opacity-100",p=o.key==="Todos"?d?"bg-[#37352F] text-white":"bg-notion-sidebar text-notion-text":o.pillClass;return`
        <button
          type="button"
          data-pill-cat="${s(o.key)}"
          class="cat-pill-btn whitespace-nowrap px-2.5 py-1 rounded text-xs transition-all cursor-pointer ${p} ${r}"
        >
          ${s(o.label)}
        </button>
      `}).join("")}function ct(){document.querySelectorAll(".view-tab").forEach(t=>{const n=t.getAttribute("data-view")===i.viewMode;t.closest("header")?t.className=n?"view-tab text-notion-blue border-b-2 border-notion-blue font-semibold pb-1 flex items-center gap-1.5 cursor-pointer":"view-tab text-notion-muted hover:text-notion-text pb-1 flex items-center gap-1.5 transition-colors cursor-pointer":t.className=n?"view-tab px-2.5 py-1 rounded font-semibold bg-white text-notion-text shadow-sm":"view-tab px-2.5 py-1 rounded font-medium text-notion-muted hover:text-notion-text"})}function z(){const t=document.getElementById("inventory-container");if(!t)return;const e=ot();if(e.length===0){t.innerHTML=`
      <div class="border border-dashed border-notion-border rounded-lg p-8 text-center bg-notion-sidebar/40">
        <div class="text-2xl mb-2">🔍</div>
        <h3 class="text-sm font-semibold text-notion-text">No se encontraron componentes</h3>
        <p class="text-xs text-notion-muted mt-1 max-w-md mx-auto">
          No hay piezas que coincidan con tu búsqueda o filtro actual en <strong>${s(Q().name)}</strong>.
        </p>
        <div class="mt-4 flex items-center justify-center gap-2">
          ${i.searchQuery||i.activeCategory!=="Todos"?'<button type="button" id="btn-empty-reset-filters" class="px-3 py-1.5 text-xs font-medium bg-white border border-notion-border rounded hover:bg-notion-hover cursor-pointer">Ver todos los componentes</button>':""}
          <button type="button" id="btn-empty-new-comp" class="px-3 py-1.5 text-xs font-semibold bg-notion-blue text-white rounded hover:bg-notion-blue-hover cursor-pointer">+ Anotar componente aquí</button>
        </div>
      </div>
    `;return}i.viewMode==="gallery"?t.innerHTML=mt(e):i.viewMode==="locations"?t.innerHTML=ut(e):t.innerHTML=lt(e)}function Ze(t){const e=at(t.id),n=e.length>0?`<span class="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FBF3DB] text-[#8F6B00] inline-flex items-center gap-1" title="Prestado a ${s(e.map(a=>a.borrowerName).join(", "))}">🤝 ${e.reduce((a,o)=>a+o.quantity,0)} prestado(s)</span>`:"";return t.quantity===0?`
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
  `}function W(t){const e=t.quantity===0;return`
    <div class="inline-flex items-center gap-1 bg-notion-sidebar border border-notion-border rounded p-0.5">
      <button
        type="button"
        data-stock-action="dec"
        data-comp-id="${s(t.id)}"
        aria-label="Restar 1 unidad a ${s(t.name)}"
        ${e?"disabled":""}
        class="w-7 h-7 rounded bg-white hover:bg-notion-hover disabled:opacity-40 disabled:cursor-not-allowed border border-notion-border flex items-center justify-center font-bold text-sm text-notion-text transition-all active:scale-90 cursor-pointer"
      >-</button>
      <span
        data-stock-count="${s(t.id)}"
        class="w-8 text-center font-mono font-bold text-xs ${e?"text-[#E03E3E]":"text-notion-text"}"
      >${t.quantity}</span>
      <button
        type="button"
        data-stock-action="inc"
        data-comp-id="${s(t.id)}"
        aria-label="Sumar 1 unidad a ${s(t.name)}"
        class="w-7 h-7 rounded bg-white hover:bg-notion-hover border border-notion-border flex items-center justify-center font-bold text-sm text-notion-text transition-all active:scale-90 cursor-pointer"
      >+</button>
    </div>
  `}function lt(t){return`
    <div tabindex="0" role="region" aria-labelledby="inventory-table-caption" class="table-wrapper border border-notion-border rounded-lg bg-white">
      <table class="notion-table text-left text-xs">
        <caption id="inventory-table-caption" class="sr-only">
          Componentes del inventario ${s(Q().name)}
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
          ${t.map(e=>{const n=e.quantity===0,a=j(e.category),o=N(e.category);return`
                <tr class="hover:bg-notion-sidebar/50 transition-colors ${n?"row-agotado bg-[#FFF9F9]":""}">
                  <th scope="row" class="py-2.5 px-3 font-normal text-left">
                    <div class="flex items-start gap-2.5">
                      <span class="text-base mt-0.5">${s(a.icon)}</span>
                      <div>
                        <div class="font-semibold text-notion-text">${s(e.name)}</div>
                        <div class="flex flex-wrap items-center gap-1.5 mt-0.5">
                          <span class="font-mono text-[11px] text-notion-text px-1.5 py-0.2 rounded bg-notion-sidebar border border-notion-border">
                            ${s(e.model)}
                          </span>
                          ${e.notes?`<span class="text-[11px] text-notion-muted truncate max-w-[220px]" title="${s(e.notes)}">${s(e.notes)}</span>`:""}
                        </div>
                      </div>
                    </div>
                  </th>
                  <td class="py-2.5 px-3">
                    <span class="px-2 py-0.5 rounded text-[11px] font-medium ${o}">
                      ${s(e.category)}
                    </span>
                  </td>
                  <td class="py-2.5 px-3">
                    <div class="flex items-center gap-1.5 text-notion-text font-mono text-[11px]">
                      <span>📍</span>
                      <span>${s(e.location)}</span>
                    </div>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    ${Ze(e)}
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    ${W(e)}
                  </td>
                  <td class="py-2.5 px-3 text-right">
                    <div class="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        data-loan-comp-id="${s(e.id)}"
                        ${n?"disabled":""}
                        title="${n?"Sin unidades disponibles para prestar":"Prestar unidad a un compañero"}"
                        class="btn-quick-loan text-xs px-2 py-1 rounded border border-notion-border bg-white hover:bg-notion-hover disabled:opacity-40 disabled:cursor-not-allowed text-notion-text font-medium cursor-pointer"
                      >
                        🤝 Prestar
                      </button>
                      <button
                        type="button"
                        data-edit-comp-id="${s(e.id)}"
                        class="btn-edit-comp text-xs text-notion-blue hover:underline font-medium px-1 cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-delete-comp-id="${s(e.id)}"
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
  `}function mt(t){return`
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      ${t.map(e=>{const n=e.quantity===0,a=j(e.category),o=N(e.category);return`
            <article class="rounded-lg border ${n?"border-[#F5C6C6] bg-[#FFFDFD]":"border-notion-border bg-white"} p-3.5 flex flex-col justify-between gap-3 hover:border-notion-text/30 transition-all">
              <div>
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-1.5">
                    <span class="text-base">${s(a.icon)}</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-medium ${o}">${s(e.category)}</span>
                  </div>
                  ${Ze(e)}
                </div>

                <h3 class="font-headline font-semibold text-sm text-notion-text mt-2">
                  ${s(e.name)}
                </h3>
                <div class="mt-1">
                  <span class="font-mono text-xs px-1.5 py-0.5 rounded bg-notion-sidebar border border-notion-border text-notion-text">
                    ${s(e.model)}
                  </span>
                </div>

                <div class="mt-2.5 flex items-center gap-1.5 text-xs text-notion-muted font-mono">
                  <span>📍</span>
                  <span class="truncate">${s(e.location)}</span>
                </div>
                ${e.notes?`<p class="mt-1.5 text-[11px] text-notion-muted line-clamp-2">${s(e.notes)}</p>`:""}
              </div>

              <div class="pt-2.5 border-t border-notion-border flex items-center justify-between gap-2">
                <div class="flex items-center gap-1.5">
                  <button
                    type="button"
                    data-edit-comp-id="${s(e.id)}"
                    class="btn-edit-comp text-xs text-notion-blue hover:underline font-medium cursor-pointer"
                  >
                    Editar
                  </button>
                  <span class="text-notion-border">·</span>
                  <button
                    type="button"
                    data-loan-comp-id="${s(e.id)}"
                    ${n?"disabled":""}
                    class="btn-quick-loan text-xs text-notion-muted hover:text-notion-text disabled:opacity-40 cursor-pointer"
                  >
                    🤝 Prestar
                  </button>
                  <span class="text-notion-border">·</span>
                  <button
                    type="button"
                    data-delete-comp-id="${s(e.id)}"
                    title="Eliminar componente"
                    class="btn-delete-comp-row text-xs text-notion-muted hover:text-[#E03E3E] cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
                ${W(e)}
              </div>
            </article>
          `}).join("")}
    </div>
  `}function ut(t){const e=new Map;for(const n of t){const a=n.location.split("·")[0].trim()||"Sin ubicación";e.has(a)||e.set(a,[]),e.get(a).push(n)}return`
    <div class="space-y-4">
      ${Array.from(e.entries()).map(([n,a])=>`
          <div class="border border-notion-border rounded-lg overflow-hidden bg-white">
            <div class="bg-notion-sidebar px-4 py-2 border-b border-notion-border flex items-center justify-between">
              <div class="flex items-center gap-2 font-headline text-xs font-bold text-notion-text">
                <span>📍</span>
                <span>${s(n)}</span>
              </div>
              <span class="text-[11px] font-mono text-notion-muted">${a.length} referencias</span>
            </div>
            <div class="divide-y divide-notion-border">
              ${a.map(o=>`
                  <div class="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 hover:bg-notion-sidebar/40">
                    <div class="min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="font-semibold text-xs text-notion-text">${s(o.name)}</span>
                        <span class="font-mono text-[11px] px-1.5 py-0.2 rounded bg-notion-sidebar border border-notion-border">${s(o.model)}</span>
                        <span class="px-2 py-0.2 rounded text-[10px] font-medium ${N(o.category)}">${s(o.category)}</span>
                        ${o.quantity===0?'<span class="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-[#FBE4E4] text-[#E03E3E]">⚠️ Agotado</span>':""}
                      </div>
                      <div class="text-[11px] font-mono text-notion-muted mt-0.5">
                        Sub-ubicación: ${s(o.location)}
                      </div>
                    </div>
                    <div class="flex items-center gap-2.5">
                      ${W(o)}
                      <button type="button" data-edit-comp-id="${s(o.id)}" class="btn-edit-comp text-xs text-notion-blue hover:underline font-medium cursor-pointer">Editar</button>
                      <button type="button" data-delete-comp-id="${s(o.id)}" class="btn-delete-comp-row p-1 rounded text-notion-muted hover:text-[#E03E3E] hover:bg-[#FBE4E4] cursor-pointer" title="Eliminar componente">
                        <span class="material-symbols-outlined text-[15px]">delete</span>
                      </button>
                    </div>
                  </div>
                `).join("")}
            </div>
          </div>
        `).join("")}
    </div>
  `}function pt(){const t=document.getElementById("loans-container"),e=document.getElementById("loans-pending-pill");if(!t||!e)return;const n=i.loans.filter(a=>a.status==="Pendiente");if(e.textContent=`${n.length} PENDIENTE${n.length===1?"":"S"}`,i.loans.length===0){t.innerHTML=`
      <div class="p-6 text-center text-xs text-notion-muted">
        No tienes préstamos registrados todavía. Usa el botón <strong>"Registrar préstamo"</strong> cuando le prestes un componente a un compañero.
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
          ${i.loans.map(a=>{const o=a.status==="Pendiente",d=a.borrowerName.split(" ").map(r=>r[0]).join("").slice(0,2).toUpperCase();return`
                <tr class="hover:bg-notion-sidebar/40 transition-colors ${o?"":"opacity-60"}">
                  <td class="py-2.5 px-3 font-medium text-notion-text">
                    🤝 ${s(a.componentName)}
                  </td>
                  <td class="py-2.5 px-3">
                    <div class="flex items-center gap-2">
                      <span class="w-5 h-5 rounded-full bg-[#DDEBF1] text-[#0B6E99] flex items-center justify-center font-bold text-[10px]">
                        ${s(d)}
                      </span>
                      <div>
                        <span class="font-medium text-notion-text">${s(a.borrowerName)}</span>
                        ${a.borrowerGroup?`<span class="text-notion-muted text-[11px] ml-1">(${s(a.borrowerGroup)})</span>`:""}
                      </div>
                    </div>
                  </td>
                  <td class="py-2.5 px-3 text-center font-mono font-bold">
                    x${a.quantity}
                  </td>
                  <td class="py-2.5 px-3 font-mono text-[11px] text-notion-muted">
                    ${s(a.date)}
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    ${o?'<span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#FBF3DB] text-[#8F6B00]">Pendiente de devolución</span>':'<span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#EDF3EC] text-[#0F7B6C]">✓ Devuelto al taller</span>'}
                  </td>
                  <td class="py-2.5 px-3 text-right">
                    ${o?`<button
                            type="button"
                            data-return-loan-id="${s(a.id)}"
                            class="btn-return-loan px-2.5 py-1 text-xs bg-white border border-notion-border hover:bg-notion-hover text-notion-blue font-semibold rounded transition-colors cursor-pointer"
                          >
                            ✓ Marcar devuelto (+${a.quantity} stock)
                          </button>`:`<button
                            type="button"
                            data-delete-loan-id="${s(a.id)}"
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
  `}function gt(t,e){const n=i.components.find(o=>o.id===t);if(!n)return;const a=Math.max(0,Number(n.quantity||0)+e);a!==n.quantity&&(n.quantity=a,y(),a===0?x(`${n.model} quedó en 0 uds — Marcado como Agotado`,"⚠️"):x(`Stock actualizado: ${n.model} → ${a} ${a===1?"unidad":"unidades"}`,e>0?"➕":"➖"))}function Ue(t){const e=i.components.find(n=>n.id===t);e&&G({title:`¿Eliminar "${e.name}" (${e.model})?`,message:`Se eliminará este componente (${e.quantity} unidades en ${e.location}) del inventario. ¿Estás seguro de que deseas continuar?`,confirmText:"Sí, eliminar componente",onConfirm:()=>{i.components=i.components.filter(n=>n.id!==t),S(),y(),x(`Componente eliminado: ${e.model}`,"🗑️")}})}function Qe(t){const e=i.inventories.find(a=>a.id===t);if(!e||e.isDefault)return;const n=k(e.id).length;G({title:`¿Eliminar el inventario "${e.icon} ${e.name}"?`,message:n>0?`Este inventario contiene ${n} componente(s) registrado(s) que también se eliminarán. ¿Estás seguro de eliminar este inventario?`:`Se eliminará el inventario "${e.name}". ¿Estás seguro de continuar?`,confirmText:"Sí, eliminar inventario",onConfirm:()=>{i.components=i.components.filter(a=>a.inventoryId!==e.id),i.inventories=i.inventories.filter(a=>a.id!==e.id),i.activeInventoryId===e.id&&(i.activeInventoryId="general"),y(),x(`Inventario "${e.name}" eliminado`,"🗑️")}})}function yt(t){const e=L().find(a=>a.name===t);if(!e||e.isDefault)return;const n=i.components.filter(a=>a.category===t).length;G({title:`¿Eliminar la categoría "${e.icon} ${e.name}"?`,message:n>0?`Hay ${n} componente(s) con esta categoría (pasarán a "Pasivos"). ¿Estás seguro de eliminar la categoría "${e.name}"?`:`Se eliminará la categoría personalizada "${e.name}". ¿Estás seguro?`,confirmText:"Sí, eliminar categoría",onConfirm:()=>{i.components.forEach(a=>{a.category===t&&(a.category="Pasivos")}),i.categories=L().filter(a=>a.name!==t),i.activeCategory===t&&(i.activeCategory="Todos"),y(),x(`Categoría "${t}" eliminada`,"🗑️")}})}function F(t){var o;const e=document.getElementById("comp-category");if(!e)return;const n=L(),a=t&&n.some(d=>d.name===t)?t:((o=n[0])==null?void 0:o.name)||"Sensores";e.innerHTML=n.map(d=>`<option value="${s(d.name)}" ${d.name===a?"selected":""}>${s(d.icon)} ${s(d.name)}</option>`).join("")}function Je(t){const e=document.getElementById("comp-inventory");e&&(e.innerHTML=i.inventories.map(n=>`<option value="${s(n.id)}" ${n.id===t?"selected":""}>${s(n.icon)} ${s(n.name)}</option>`).join(""))}function $(){const t=document.getElementById("comp-quantity"),e=document.getElementById("drawer-stock-status-pill"),n=document.getElementById("comp-category"),a=document.getElementById("drawer-category-emoji");if(a&&n){const d=j(n.value);a.textContent=d.icon||"📦"}if(!t||!e)return;Math.max(0,parseInt(t.value||"0",10))===0?(e.textContent="⚠️ Agotado (0)",e.className="text-[11px] px-2 py-0.5 rounded font-semibold bg-[#FBE4E4] text-[#E03E3E]"):(e.textContent="Disponible",e.className="text-[11px] px-2 py-0.5 rounded font-medium bg-[#EDF3EC] text-[#0F7B6C]")}function D(){const t=document.getElementById("side-peek-drawer"),e=document.getElementById("component-form");if(!t||!e)return;e.reset(),document.getElementById("comp-id").value="",document.getElementById("drawer-mode-label").textContent="Anotar Nuevo Componente",document.getElementById("btn-delete-component").classList.add("hidden"),document.getElementById("comp-quantity").value="1";const n=i.activeCategory!=="Todos"&&i.activeCategory!=="Agotados"?i.activeCategory:"Sensores";F(n),Je(i.activeInventoryId),document.getElementById("instant-loan-fields").classList.add("hidden"),$(),t.classList.remove("hidden"),document.getElementById("comp-name").focus()}function vt(t){const e=i.components.find(o=>o.id===t),n=document.getElementById("side-peek-drawer"),a=document.getElementById("component-form");!e||!n||!a||(a.reset(),document.getElementById("comp-id").value=e.id,document.getElementById("drawer-mode-label").textContent="Editar Componente",document.getElementById("btn-delete-component").classList.remove("hidden"),document.getElementById("comp-name").value=e.name,document.getElementById("comp-model").value=e.model,F(e.category),Je(e.inventoryId),document.getElementById("comp-quantity").value=String(e.quantity),document.getElementById("comp-location").value=e.location,document.getElementById("comp-notes").value=e.notes||"",document.getElementById("instant-loan-fields").classList.add("hidden"),$(),n.classList.remove("hidden"))}function S(){var t;(t=document.getElementById("side-peek-drawer"))==null||t.classList.add("hidden")}function We(){const t=document.getElementById("inventory-dialog"),e=document.getElementById("inventory-form");!t||!e||(e.reset(),document.getElementById("inv-edit-id").value="",document.getElementById("inv-dialog-title").textContent="Crear Nuevo Inventario por Proyecto",document.getElementById("btn-submit-inv-dialog").textContent="Crear Inventario",t.showModal(),document.getElementById("inv-name").focus())}function Ke(t){const e=i.inventories.find(o=>o.id===t),n=document.getElementById("inventory-dialog"),a=document.getElementById("inventory-form");!e||!n||!a||(a.reset(),document.getElementById("inv-edit-id").value=e.id,document.getElementById("inv-dialog-title").textContent="Renombrar / Editar Inventario",document.getElementById("btn-submit-inv-dialog").textContent="Guardar Cambios",document.getElementById("inv-icon").value=e.icon||"📦",document.getElementById("inv-name").value=e.name,document.getElementById("inv-badge").value=e.badge||"",document.getElementById("inv-desc").value=e.description||"",n.showModal(),document.getElementById("inv-name").focus())}function H(){const t=document.getElementById("category-dialog"),e=document.getElementById("category-form");!t||!e||(e.reset(),t.showModal(),document.getElementById("cat-name").focus())}function O(t=""){const e=document.getElementById("loan-dialog"),n=document.getElementById("loan-component-select"),a=document.getElementById("loan-form");if(!e||!n||!a)return;a.reset();const o=i.components.filter(r=>r.quantity>0);if(o.length===0){x("No hay componentes con stock > 0 para prestar","⚠️");return}n.innerHTML=o.map(r=>{const p=i.inventories.find(h=>h.id===r.inventoryId),B=r.id===t?"selected":"";return`<option value="${s(r.id)}" ${B}>${s(r.name)} (${s(r.model)}) — Disp: ${r.quantity} [${s(p?p.name:"General")}]</option>`}).join("");const d=new Date().toLocaleDateString("es-CO",{day:"2-digit",month:"short"});document.getElementById("loan-date").value=d,e.showModal()}function bt(){var Y,_,Z,J,X,ee,te,ne,oe,ae,ie,re,se,de,ce,le,me,ue,pe,ge,ye,ve,be,fe,xe,Ee,Ie,he,Be,Ce,$e,we,Le,ke,Se,qe,Ae,Me,De,Te,Pe,Fe,je,Ne,Ge,Ve,Re,He,Oe;y();const t=document.getElementById("loan-dialog"),e=document.getElementById("inventory-dialog"),n=document.getElementById("category-dialog"),a=document.getElementById("confirm-delete-dialog");A(t),A(e),A(n),A(a),M.init(document.getElementById("component-form")),M.init(document.getElementById("loan-form")),M.init(document.getElementById("inventory-form")),M.init(document.getElementById("category-form")),(Y=document.getElementById("btn-cancel-confirm-delete"))==null||Y.addEventListener("click",()=>{P=null,a==null||a.close()}),(_=document.getElementById("btn-accept-confirm-delete"))==null||_.addEventListener("click",()=>{const c=P;P=null,a==null||a.close(),typeof c=="function"&&c()}),(Z=document.getElementById("header-inventory-select"))==null||Z.addEventListener("change",c=>{i.activeInventoryId=c.target.value,i.activeCategory="Todos",y()}),document.querySelectorAll(".view-tab").forEach(c=>{c.addEventListener("click",()=>{i.viewMode=c.getAttribute("data-view")||"table",y()})});const o=document.getElementById("search-input"),d=document.getElementById("btn-clear-search");o==null||o.addEventListener("input",c=>{i.searchQuery=c.target.value,d==null||d.classList.toggle("hidden",!i.searchQuery),z()}),d==null||d.addEventListener("click",()=>{i.searchQuery="",o.value="",d.classList.add("hidden"),z(),o.focus()}),(J=document.getElementById("left-sidebar"))==null||J.addEventListener("click",c=>{const u=c.target.closest("[data-rename-inv-id]");if(u){Ke(u.getAttribute("data-rename-inv-id"));return}const g=c.target.closest("[data-delete-inv-id]");if(g){Qe(g.getAttribute("data-delete-inv-id"));return}const m=c.target.closest(".sidebar-inv-btn");if(m){i.activeInventoryId=m.getAttribute("data-inv-id"),i.activeCategory="Todos",C(),y();return}const l=c.target.closest("[data-delete-cat]");if(l){yt(l.getAttribute("data-delete-cat"));return}const b=c.target.closest(".sidebar-cat-btn");if(b){i.activeCategory=b.getAttribute("data-cat"),C(),y();return}});const r=c=>{i.activeCategory=c,C(),y()};(X=document.getElementById("nav-filter-all"))==null||X.addEventListener("click",()=>r("Todos")),(ee=document.getElementById("kpi-card-all"))==null||ee.addEventListener("click",()=>r("Todos")),(te=document.getElementById("nav-filter-agotados"))==null||te.addEventListener("click",()=>r("Agotados")),(ne=document.getElementById("kpi-card-agotados"))==null||ne.addEventListener("click",()=>r("Agotados"));const p=()=>{var c;C(),(c=document.getElementById("loans-section"))==null||c.scrollIntoView({behavior:"smooth"})};(oe=document.getElementById("nav-scroll-loans"))==null||oe.addEventListener("click",p),(ae=document.getElementById("kpi-card-loans"))==null||ae.addEventListener("click",p),(ie=document.getElementById("category-pills-bar"))==null||ie.addEventListener("click",c=>{const u=c.target.closest(".cat-pill-btn");u&&(i.activeCategory=u.getAttribute("data-pill-cat")||"Todos",y())}),(re=document.getElementById("inventory-container"))==null||re.addEventListener("click",c=>{const u=c.target.closest("[data-stock-action]");if(u){const b=u.getAttribute("data-comp-id"),v=u.getAttribute("data-stock-action");gt(b,v==="inc"?1:-1);return}const g=c.target.closest(".btn-edit-comp");if(g){vt(g.getAttribute("data-edit-comp-id"));return}const m=c.target.closest(".btn-delete-comp-row");if(m){Ue(m.getAttribute("data-delete-comp-id"));return}const l=c.target.closest(".btn-quick-loan");if(l){O(l.getAttribute("data-loan-comp-id"));return}if(c.target.closest("#btn-empty-reset-filters")){i.searchQuery="",i.activeCategory="Todos",o&&(o.value=""),d==null||d.classList.add("hidden"),y();return}c.target.closest("#btn-empty-new-comp")&&D()}),(se=document.getElementById("loans-container"))==null||se.addEventListener("click",c=>{const u=c.target.closest(".btn-return-loan");if(u){const m=u.getAttribute("data-return-loan-id"),l=i.loans.find(v=>v.id===m);if(!l||l.status==="Devuelto")return;l.status="Devuelto";const b=i.components.find(v=>v.id===l.componentId);b&&(b.quantity=Number(b.quantity||0)+Number(l.quantity||1)),y(),x(`Devuelto por ${l.borrowerName}: +${l.quantity} ud(s) sumadas al stock`,"🤝");return}const g=c.target.closest(".btn-delete-loan");if(g){const m=g.getAttribute("data-delete-loan-id");i.loans=i.loans.filter(l=>l.id!==m),y(),x("Registro de préstamo eliminado","🗑️")}}),(de=document.getElementById("btn-new-component-top"))==null||de.addEventListener("click",D),(ce=document.getElementById("btn-sidebar-new-component"))==null||ce.addEventListener("click",()=>{C(),D()}),(le=document.getElementById("btn-close-drawer"))==null||le.addEventListener("click",S),(me=document.getElementById("btn-cancel-drawer"))==null||me.addEventListener("click",S),(ue=document.getElementById("comp-category"))==null||ue.addEventListener("change",$),(pe=document.getElementById("comp-quantity"))==null||pe.addEventListener("input",$),(ge=document.getElementById("drawer-qty-minus"))==null||ge.addEventListener("click",()=>{const c=document.getElementById("comp-quantity");c.value=String(Math.max(0,parseInt(c.value||"0",10)-1)),$()}),(ye=document.getElementById("drawer-qty-plus"))==null||ye.addEventListener("click",()=>{const c=document.getElementById("comp-quantity");c.value=String(Math.max(0,parseInt(c.value||"0",10)+1)),$()}),(ve=document.getElementById("comp-instant-loan"))==null||ve.addEventListener("change",c=>{var u;(u=document.getElementById("instant-loan-fields"))==null||u.classList.toggle("hidden",!c.target.checked)}),(be=document.getElementById("component-form"))==null||be.addEventListener("submit",c=>{c.preventDefault();const u=c.currentTarget;if(!u.checkValidity()){const f=u.querySelector(":invalid");f==null||f.focus();return}const g=document.getElementById("comp-id").value.trim(),m=document.getElementById("comp-name").value.trim(),l=document.getElementById("comp-model").value.trim(),b=document.getElementById("comp-category").value,v=document.getElementById("comp-inventory").value,E=Math.max(0,parseInt(document.getElementById("comp-quantity").value||"0",10)),I=document.getElementById("comp-location").value.trim(),w=document.getElementById("comp-notes").value.trim(),V=document.getElementById("comp-instant-loan").checked,ze=document.getElementById("comp-loan-borrower").value.trim(),Xe=document.getElementById("comp-loan-group").value.trim();let q=g;if(g){const f=i.components.find(R=>R.id===g);f&&(f.name=m,f.model=l,f.category=b,f.inventoryId=v,f.quantity=E,f.location=I,f.notes=w),x(`Componente actualizado: ${l}`,"✓")}else q=`comp-${Date.now()}`,i.components.unshift({id:q,inventoryId:v,name:m,model:l,category:b,quantity:E,location:I,notes:w}),i.activeInventoryId=v,x(`Componente registrado en MecaKit: ${l}`,"✨");if(V&&ze){const f=i.components.find(et=>et.id===q);f&&f.quantity>0&&(f.quantity-=1);const R=new Date().toLocaleDateString("es-CO",{day:"2-digit",month:"short"});i.loans.unshift({id:`loan-${Date.now()}`,componentId:q,inventoryId:v,componentName:`${m} (${l})`,borrowerName:ze,borrowerGroup:Xe||"Compañero de carrera",quantity:1,date:R,status:"Pendiente",notes:""})}S(),y()}),(fe=document.getElementById("btn-delete-component"))==null||fe.addEventListener("click",()=>{const c=document.getElementById("comp-id").value;c&&Ue(c)}),(xe=document.getElementById("btn-drawer-new-category"))==null||xe.addEventListener("click",H),(Ee=document.getElementById("btn-new-category-icon"))==null||Ee.addEventListener("click",H),(Ie=document.getElementById("btn-new-category-sidebar"))==null||Ie.addEventListener("click",()=>{C(),H()}),(he=document.getElementById("btn-close-cat-dialog"))==null||he.addEventListener("click",()=>n==null?void 0:n.close()),(Be=document.getElementById("btn-cancel-cat-dialog"))==null||Be.addEventListener("click",()=>n==null?void 0:n.close()),(Ce=document.getElementById("category-form"))==null||Ce.addEventListener("submit",c=>{var v;c.preventDefault();const u=c.currentTarget;if(!u.checkValidity()){(v=u.querySelector(":invalid"))==null||v.focus();return}const g=document.getElementById("cat-icon").value||"🔋",m=document.getElementById("cat-name").value.trim(),l=document.getElementById("cat-color").value||"teal";if(L().some(E=>E.name.toLowerCase()===m.toLowerCase())){x(`La categoría "${m}" ya existe`,"⚠️"),n==null||n.close(),F(m),$();return}i.categories.push({name:m,icon:g,color:l,isDefault:!1}),n==null||n.close(),y(),F(m),$(),x(`Categoría creada: ${g} ${m}`,"🏷️")}),($e=document.getElementById("btn-open-loan-modal-top"))==null||$e.addEventListener("click",()=>O()),(we=document.getElementById("btn-open-loan-modal-section"))==null||we.addEventListener("click",()=>O()),(Le=document.getElementById("btn-close-loan-dialog"))==null||Le.addEventListener("click",()=>t==null?void 0:t.close()),(ke=document.getElementById("btn-cancel-loan-dialog"))==null||ke.addEventListener("click",()=>t==null?void 0:t.close()),(Se=document.getElementById("loan-form"))==null||Se.addEventListener("submit",c=>{var w;c.preventDefault();const u=c.currentTarget;if(!u.checkValidity()){(w=u.querySelector(":invalid"))==null||w.focus();return}const g=document.getElementById("loan-component-select").value,m=document.getElementById("loan-borrower-name").value.trim(),l=document.getElementById("loan-borrower-group").value.trim(),b=Math.max(1,parseInt(document.getElementById("loan-quantity").value||"1",10)),v=document.getElementById("loan-date").value.trim()||"Hoy",E=i.components.find(V=>V.id===g);if(!E)return;const I=Math.min(E.quantity,b);E.quantity-=I,i.loans.unshift({id:`loan-${Date.now()}`,componentId:E.id,inventoryId:E.inventoryId,componentName:`${E.name} (${E.model})`,borrowerName:m,borrowerGroup:l,quantity:I,date:v,status:"Pendiente",notes:""}),t==null||t.close(),y(),x(`Préstamo registrado a ${m} (-${I} en stock)`,"🤝")}),(qe=document.getElementById("btn-new-inventory"))==null||qe.addEventListener("click",()=>{C(),We()}),(Ae=document.getElementById("btn-new-inventory-icon"))==null||Ae.addEventListener("click",()=>{C(),We()}),(Me=document.getElementById("btn-edit-inventory"))==null||Me.addEventListener("click",()=>{Ke(i.activeInventoryId)}),(De=document.getElementById("btn-close-inv-dialog"))==null||De.addEventListener("click",()=>e==null?void 0:e.close()),(Te=document.getElementById("btn-cancel-inv-dialog"))==null||Te.addEventListener("click",()=>e==null?void 0:e.close()),(Pe=document.getElementById("inventory-form"))==null||Pe.addEventListener("submit",c=>{var E;c.preventDefault();const u=c.currentTarget;if(!u.checkValidity()){(E=u.querySelector(":invalid"))==null||E.focus();return}const g=document.getElementById("inv-edit-id").value.trim(),m=document.getElementById("inv-icon").value||"🤖",l=document.getElementById("inv-name").value.trim(),b=document.getElementById("inv-badge").value.trim()||"Proyecto Personal",v=document.getElementById("inv-desc").value.trim()||`Inventario personalizado para el proyecto ${l}.`;if(g){const I=i.inventories.find(w=>w.id===g);I&&(I.icon=m,I.name=l,I.badge=b,I.description=v),e==null||e.close(),y(),x(`Inventario actualizado: ${m} ${l}`,"✏️")}else{const I=`inv-${Date.now()}`;i.inventories.push({id:I,name:l,icon:m,badge:b,description:v,isDefault:!1}),i.activeInventoryId=I,i.activeCategory="Todos",e==null||e.close(),y(),x(`Inventario creado: ${m} ${l}`,"🗂️")}}),(Fe=document.getElementById("btn-delete-inventory"))==null||Fe.addEventListener("click",()=>{Qe(i.activeInventoryId)}),(je=document.getElementById("btn-reset-demo"))==null||je.addEventListener("click",()=>{G({title:"¿Restaurar los datos de demostración?",message:"Se restablecerán los inventarios, categorías y componentes originales de ejemplo de Camilo.",confirmText:"Sí, restaurar ejemplo",onConfirm:()=>{i=nt();const c=document.getElementById("search-input");c&&(c.value=""),y(),x("Datos de demostración restaurados","🔄")}})});const B=document.getElementById("left-sidebar"),h=document.getElementById("mobile-sidebar-backdrop");function K(){B==null||B.classList.remove("-translate-x-full"),h==null||h.classList.remove("hidden")}function C(){B==null||B.classList.add("-translate-x-full"),h==null||h.classList.add("hidden")}(Ne=document.getElementById("btn-mobile-menu"))==null||Ne.addEventListener("click",K),(Ge=document.getElementById("btn-close-sidebar-mobile"))==null||Ge.addEventListener("click",C),h==null||h.addEventListener("click",C),(Ve=document.getElementById("mob-nav-inventory"))==null||Ve.addEventListener("click",()=>{var c;C(),S(),(c=document.getElementById("main-canvas"))==null||c.scrollTo({top:0,behavior:"smooth"})}),(Re=document.getElementById("mob-nav-projects"))==null||Re.addEventListener("click",K),(He=document.getElementById("mob-nav-loans"))==null||He.addEventListener("click",p),(Oe=document.getElementById("mob-nav-add"))==null||Oe.addEventListener("click",D)}document.addEventListener("DOMContentLoaded",bt);

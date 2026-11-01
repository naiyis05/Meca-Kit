// MecaKit — Datos base y sincronización en la nube con Supabase PostgreSQL (RLS por usuario)
import { supabase } from "./supabaseClient.js";

export const DEFAULT_CATEGORIES = [
  { name: "Sensores", icon: "📡", color: "blue", isDefault: true },
  { name: "Microcontroladores", icon: "⚡", color: "purple", isDefault: true },
  { name: "Actuadores", icon: "🦾", color: "orange", isDefault: true },
  { name: "Pasivos", icon: "🔋", color: "green", isDefault: true }
];

export const NOTION_TAG_COLORS = [
  { key: "blue", label: "Azul Notion" },
  { key: "purple", label: "Morado" },
  { key: "orange", label: "Naranja" },
  { key: "green", label: "Verde" },
  { key: "pink", label: "Rosa" },
  { key: "yellow", label: "Ámbar" },
  { key: "teal", label: "Turquesa" },
  { key: "gray", label: "Gris" }
];

export const DEMO_INVENTORIES_TEMPLATE = [
  {
    key: "general",
    name: "Inventario General",
    icon: "📦",
    badge: "Lab Mecatrónica #4",
    description:
      "Consulta en segundos tus componentes electrónicos, ubicación física y préstamos activos de taller.",
    isDefault: true
  },
  {
    key: "brazo-robotico",
    name: "Brazo Robótico 4-DOF",
    icon: "🤖",
    badge: "Proyecto Mitad Semestre",
    description:
      "Inventario dedicado de actuadores, sensores de posición y control para el brazo robótico.",
    isDefault: false
  },
  {
    key: "seguidor-linea",
    name: "Seguidor de Línea Lab 3",
    icon: "🏎️",
    badge: "Control Automático",
    description:
      "Piezas separadas para el robot velocista con control PID analógico/digital.",
    isDefault: false
  }
];

export const DEMO_COMPONENTS_TEMPLATE = [
  {
    key: "comp-1",
    invKey: "general",
    name: "Módulo WiFi & Bluetooth Dual-Core",
    model: "ESP32-WROOM-32",
    category: "Microcontroladores",
    quantity: 0,
    location: "Caja Antiestática 1 · Comp. B",
    notes: "Se usaron los últimos 2 en el prototipo IoT. Comprar con pines soldados."
  },
  {
    key: "comp-2",
    invKey: "general",
    name: "Sensor Ultrasónico de Distancia",
    model: "HC-SR04",
    category: "Sensores",
    quantity: 4,
    location: "Caja Sensores · Gaveta 1",
    notes: "Rango 2cm a 400cm, alimentación 5V DC."
  },
  {
    key: "comp-3",
    invKey: "general",
    name: "Driver Controlador Puente H Doble",
    model: "L298N Dual H-Bridge",
    category: "Actuadores",
    quantity: 0,
    location: "Cajón Potencia · Gaveta 4",
    notes: "Soporta hasta 2A por puente. Agotado tras práctica de motores DC."
  },
  {
    key: "comp-4",
    invKey: "general",
    name: "Micro Servomotor 9g 180°",
    model: "TowerPro SG90",
    category: "Actuadores",
    quantity: 7,
    location: "Caja Organizadora A · Gaveta 3",
    notes: "Incluye crucetas plásticas y tornillos."
  },
  {
    key: "comp-5",
    invKey: "general",
    name: "Resistencia Película Metálica 1/4W",
    model: "10kΩ ±1%",
    category: "Pasivos",
    quantity: 25,
    location: "Gavetero Pasivos · G-08",
    notes: "Para pull-up/pull-down en botones y sensores."
  },
  {
    key: "comp-6",
    invKey: "general",
    name: "Capacitor Cerámico Desacoplo 50V",
    model: "100nF (Código 104)",
    category: "Pasivos",
    quantity: 35,
    location: "Gavetero Pasivos · G-12",
    notes: "Indispensable para filtrado de ruido en alimentación de MCUs."
  },
  {
    key: "comp-7",
    invKey: "general",
    name: "Placa de Desarrollo Microcontrolador",
    model: "Arduino Nano V3 ATmega328P",
    category: "Microcontroladores",
    quantity: 2,
    location: "Caja Antiestática 1 · Comp. A",
    notes: "Bootloader Old Bootloader, conector Mini-B USB."
  },
  {
    key: "comp-8",
    invKey: "general",
    name: "Sensor IMU Acelerómetro + Giroscopio 6-DOF",
    model: "MPU-6050 (GY-521)",
    category: "Sensores",
    quantity: 3,
    location: "Caja Sensores · Gaveta 2",
    notes: "Interfaz I2C (3.3V / 5V)."
  },
  {
    key: "comp-9",
    invKey: "general",
    name: "Regulador de Voltaje Step-Down Buck",
    model: "LM2596 DC-DC",
    category: "Pasivos",
    quantity: 0,
    location: "Cajón Potencia · Gaveta 2",
    notes: "Ajustable 1.25V - 35V, máximo 3A."
  },
  {
    key: "comp-10",
    invKey: "brazo-robotico",
    name: "Servomotor Alto Torque Engranaje Metálico",
    model: "MG996R 180°",
    category: "Actuadores",
    quantity: 4,
    location: "Maletín Brazo Robótico · Espuma 1",
    notes: "3 instalados en base/hombro/codo + 1 de repuesto."
  },
  {
    key: "comp-11",
    invKey: "brazo-robotico",
    name: "Controlador PWM 16 Canales I2C",
    model: "PCA9685",
    category: "Microcontroladores",
    quantity: 1,
    location: "Maletín Brazo Robótico · Bolsa ESD",
    notes: "Alimentación externa de 6V para servos."
  },
  {
    key: "comp-12",
    invKey: "brazo-robotico",
    name: "Potenciómetro Lineal Rotativo 10k",
    model: "WH148 B10K",
    category: "Pasivos",
    quantity: 0,
    location: "Caja Organizadora B · Gaveta 5",
    notes: "Falta comprar 2 para el modo maestro-esclavo."
  },
  {
    key: "comp-13",
    invKey: "seguidor-linea",
    name: "Sensor Óptico Reflectivo Infrarrojo",
    model: "TCRT5000",
    category: "Sensores",
    quantity: 6,
    location: "Caja Seguidor · Compartimento C1",
    notes: "Arreglo de 5 sensores para lectura de línea negra + 1 repuesto."
  },
  {
    key: "comp-14",
    invKey: "seguidor-linea",
    name: "Motorreductor Micro Metal DC 6V",
    model: "N20 600RPM",
    category: "Actuadores",
    quantity: 2,
    location: "Caja Seguidor · Compartimento C2",
    notes: "Con llantas de silicona de alto agarre."
  },
  {
    key: "comp-15",
    invKey: "seguidor-linea",
    name: "Driver Doble Puente H MOSFET",
    model: "TB6612FNG",
    category: "Microcontroladores",
    quantity: 1,
    location: "Caja Seguidor · Bolsa Antiestática",
    notes: "Mucho más eficiente que el L298N, no cae voltaje."
  }
];

export const DEMO_LOANS_TEMPLATE = [
  {
    compKey: "comp-2",
    invKey: "general",
    componentName: "Sensor Ultrasónico de Distancia (HC-SR04)",
    borrowerName: "Mateo Ríos",
    borrowerGroup: "Lab Robótica · Grupo 2",
    quantity: 1,
    date: "20 Oct",
    status: "Pendiente",
    notes: "Lo necesita para calibrar su práctica hasta el viernes."
  },
  {
    compKey: "comp-4",
    invKey: "general",
    componentName: "Micro Servomotor 9g 180° (TowerPro SG90)",
    borrowerName: "Valentina Gómez",
    borrowerGroup: "Mecatrónica 5.º Sem",
    quantity: 1,
    date: "22 Oct",
    status: "Pendiente",
    notes: "Prestado en el laboratorio 402 durante clase de sensores."
  }
];

export function createEmptyAppState() {
  return {
    user: null,
    profile: {
      fullName: "Estudiante",
      career: "Ing. Mecatrónica",
      email: ""
    },
    activeScreen: "inventory",
    activeInventoryId: "",
    viewMode: "table",
    activeCategory: "Todos",
    loanFilter: "Todos",
    searchQuery: "",
    categories: structuredClone(DEFAULT_CATEGORIES),
    inventories: [],
    components: [],
    loans: []
  };
}

export function mapInventoryRow(row) {
  return {
    id: row.id,
    name: row.name,
    icon: row.icon || "📦",
    badge: row.badge || "Inventario Personal",
    description: row.description || "",
    isDefault: Boolean(row.is_default)
  };
}

export function mapCategoryRow(row) {
  return {
    id: row.id,
    name: row.name,
    icon: row.icon || "📦",
    color: row.color || "blue",
    isDefault: Boolean(row.is_default)
  };
}

export function mapComponentRow(row) {
  return {
    id: row.id,
    inventoryId: row.inventory_id,
    name: row.name,
    model: row.model,
    category: row.category,
    quantity: Number(row.quantity ?? 0),
    location: row.location,
    notes: row.notes || ""
  };
}

export function mapLoanRow(row) {
  return {
    id: row.id,
    componentId: row.component_id,
    inventoryId: row.inventory_id,
    componentName: row.component_name,
    borrowerName: row.borrower_name,
    borrowerGroup: row.borrower_group || "",
    quantity: Number(row.quantity ?? 1),
    date: row.loan_date || "Hoy",
    status: row.status || "Pendiente",
    notes: row.notes || ""
  };
}

export async function fetchUserCloudState(authUser) {
  const userId = authUser.id;
  const metaName = authUser.user_metadata?.full_name || authUser.email?.split("@")[0] || "Estudiante";
  const metaCareer = authUser.user_metadata?.career || "Ing. Mecatrónica";

  const [profileRes, catsRes, invsRes, compsRes, loansRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabase.from("categories").select("*").order("created_at", { ascending: true }),
    supabase.from("inventories").select("*").order("created_at", { ascending: true }),
    supabase.from("components").select("*").order("created_at", { ascending: false }),
    supabase.from("loans").select("*").order("created_at", { ascending: false })
  ]);

  let profile = profileRes.data;
  if (!profile) {
    const { data: insertedProfile } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        email: authUser.email || "",
        full_name: metaName,
        career: metaCareer
      })
      .select("*")
      .single();
    profile = insertedProfile;
  }

  let categories = (catsRes.data || []).map(mapCategoryRow);
  if (categories.length === 0) {
    const { data: insertedCats } = await supabase
      .from("categories")
      .insert(
        DEFAULT_CATEGORIES.map((c) => ({
          user_id: userId,
          name: c.name,
          icon: c.icon,
          color: c.color,
          is_default: true
        }))
      )
      .select("*");
    categories = (insertedCats || []).map(mapCategoryRow);
  }

  let inventories = (invsRes.data || []).map(mapInventoryRow);
  if (inventories.length === 0) {
    const { data: insertedInv } = await supabase
      .from("inventories")
      .insert({
        user_id: userId,
        name: "Inventario General",
        icon: "📦",
        badge: profile?.career || metaCareer,
        description:
          "Consulta en segundos tus componentes electrónicos, ubicación física y préstamos activos de taller.",
        is_default: true
      })
      .select("*")
      .single();
    if (insertedInv) {
      inventories = [mapInventoryRow(insertedInv)];
    }
  }

  const components = (compsRes.data || []).map(mapComponentRow);
  const loans = (loansRes.data || []).map(mapLoanRow);

  const defaultInv = inventories.find((i) => i.isDefault) || inventories[0];

  return {
    user: authUser,
    profile: {
      fullName: profile?.full_name || metaName,
      career: profile?.career || metaCareer,
      email: profile?.email || authUser.email || ""
    },
    categories: categories.length > 0 ? categories : structuredClone(DEFAULT_CATEGORIES),
    inventories,
    components,
    loans,
    activeInventoryId: defaultInv ? defaultInv.id : ""
  };
}

export async function seedSampleDataForUser(authUser) {
  const userId = authUser.id;

  // Limpiar datos previos del usuario actual (RLS garantiza que solo afecta a userId)
  await supabase.from("loans").delete().eq("user_id", userId);
  await supabase.from("components").delete().eq("user_id", userId);
  await supabase.from("inventories").delete().eq("user_id", userId);
  await supabase.from("categories").delete().eq("user_id", userId);

  // Insertar categorías base
  await supabase.from("categories").insert(
    DEFAULT_CATEGORIES.map((c) => ({
      user_id: userId,
      name: c.name,
      icon: c.icon,
      color: c.color,
      is_default: true
    }))
  );

  // Insertar inventarios de ejemplo y mapear claves
  const invKeyToId = new Map();
  for (const tpl of DEMO_INVENTORIES_TEMPLATE) {
    const { data: invRow } = await supabase
      .from("inventories")
      .insert({
        user_id: userId,
        name: tpl.name,
        icon: tpl.icon,
        badge: tpl.badge,
        description: tpl.description,
        is_default: tpl.isDefault
      })
      .select("*")
      .single();
    if (invRow) {
      invKeyToId.set(tpl.key, invRow.id);
    }
  }

  // Insertar componentes de ejemplo
  const compKeyToId = new Map();
  for (const compTpl of DEMO_COMPONENTS_TEMPLATE) {
    const invId = invKeyToId.get(compTpl.invKey);
    if (!invId) continue;
    const { data: compRow } = await supabase
      .from("components")
      .insert({
        user_id: userId,
        inventory_id: invId,
        name: compTpl.name,
        model: compTpl.model,
        category: compTpl.category,
        quantity: compTpl.quantity,
        location: compTpl.location,
        notes: compTpl.notes
      })
      .select("*")
      .single();
    if (compRow) {
      compKeyToId.set(compTpl.key, compRow.id);
    }
  }

  // Insertar préstamos de ejemplo
  for (const loanTpl of DEMO_LOANS_TEMPLATE) {
    const invId = invKeyToId.get(loanTpl.invKey);
    const compId = compKeyToId.get(loanTpl.compKey) || null;
    if (!invId) continue;
    await supabase.from("loans").insert({
      user_id: userId,
      component_id: compId,
      inventory_id: invId,
      component_name: loanTpl.componentName,
      borrower_name: loanTpl.borrowerName,
      borrower_group: loanTpl.borrowerGroup,
      quantity: loanTpl.quantity,
      loan_date: loanTpl.date,
      status: loanTpl.status,
      notes: loanTpl.notes
    });
  }

  return fetchUserCloudState(authUser);
}

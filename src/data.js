// MecaKit — Datos iniciales y persistencia en localStorage para Camilo (5.º Semestre Mecatrónica)

const STORAGE_KEY = "mecakit_state_v1";

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

export const INITIAL_STATE = {
  activeScreen: "inventory", // 'inventory' | 'loans'
  activeInventoryId: "general",
  viewMode: "table", // 'table' | 'gallery' | 'locations'
  activeCategory: "Todos", // 'Todos' | category name | 'Agotados'
  loanFilter: "Todos", // 'Todos' | 'Pendiente' | 'Devuelto'
  searchQuery: "",
  categories: structuredClone(DEFAULT_CATEGORIES),
  inventories: [
    {
      id: "general",
      name: "Inventario General",
      icon: "📦",
      badge: "Lab Mecatrónica #4",
      description: "Consulta en segundos tus componentes electrónicos, ubicación física y préstamos activos de taller.",
      isDefault: true
    },
    {
      id: "brazo-robotico",
      name: "Brazo Robótico 4-DOF",
      icon: "🤖",
      badge: "Proyecto Mitad Semestre",
      description: "Inventario dedicado de actuadores, sensores de posición y control para el brazo robótico.",
      isDefault: false
    },
    {
      id: "seguidor-linea",
      name: "Seguidor de Línea Lab 3",
      icon: "🏎️",
      badge: "Control Automático",
      description: "Piezas separadas para el robot velocista con control PID analógico/digital.",
      isDefault: false
    }
  ],
  components: [
    // --- INVENTARIO GENERAL ---
    {
      id: "comp-1",
      inventoryId: "general",
      name: "Módulo WiFi & Bluetooth Dual-Core",
      model: "ESP32-WROOM-32",
      category: "Microcontroladores",
      quantity: 0,
      location: "Caja Antiestática 1 · Comp. B",
      notes: "Se usaron los últimos 2 en el prototipo IoT. Comprar con pines soldados."
    },
    {
      id: "comp-2",
      inventoryId: "general",
      name: "Sensor Ultrasónico de Distancia",
      model: "HC-SR04",
      category: "Sensores",
      quantity: 4,
      location: "Caja Sensores · Gaveta 1",
      notes: "Rango 2cm a 400cm, alimentación 5V DC."
    },
    {
      id: "comp-3",
      inventoryId: "general",
      name: "Driver Controlador Puente H Doble",
      model: "L298N Dual H-Bridge",
      category: "Actuadores",
      quantity: 0,
      location: "Cajón Potencia · Gaveta 4",
      notes: "Soporta hasta 2A por puente. Agotado tras práctica de motores DC."
    },
    {
      id: "comp-4",
      inventoryId: "general",
      name: "Micro Servomotor 9g 180°",
      model: "TowerPro SG90",
      category: "Actuadores",
      quantity: 7,
      location: "Caja Organizadora A · Gaveta 3",
      notes: "Incluye crucetas plásticas y tornillos."
    },
    {
      id: "comp-5",
      inventoryId: "general",
      name: "Resistencia Película Metálica 1/4W",
      model: "10kΩ ±1%",
      category: "Pasivos",
      quantity: 25,
      location: "Gavetero Pasivos · G-08",
      notes: "Para pull-up/pull-down en botones y sensores."
    },
    {
      id: "comp-6",
      inventoryId: "general",
      name: "Capacitor Cerámico Desacoplo 50V",
      model: "100nF (Código 104)",
      category: "Pasivos",
      quantity: 35,
      location: "Gavetero Pasivos · G-12",
      notes: "Indispensable para filtrado de ruido en alimentación de MCUs."
    },
    {
      id: "comp-7",
      inventoryId: "general",
      name: "Placa de Desarrollo Microcontrolador",
      model: "Arduino Nano V3 ATmega328P",
      category: "Microcontroladores",
      quantity: 2,
      location: "Caja Antiestática 1 · Comp. A",
      notes: "Bootloader Old Bootloader, conector Mini-B USB."
    },
    {
      id: "comp-8",
      inventoryId: "general",
      name: "Sensor IMU Acelerómetro + Giroscopio 6-DOF",
      model: "MPU-6050 (GY-521)",
      category: "Sensores",
      quantity: 3,
      location: "Caja Sensores · Gaveta 2",
      notes: "Interfaz I2C (3.3V / 5V)."
    },
    {
      id: "comp-9",
      inventoryId: "general",
      name: "Regulador de Voltaje Step-Down Buck",
      model: "LM2596 DC-DC",
      category: "Pasivos",
      quantity: 0,
      location: "Cajón Potencia · Gaveta 2",
      notes: "Ajustable 1.25V - 35V, máximo 3A."
    },

    // --- PROYECTO: BRAZO ROBÓTICO 4-DOF ---
    {
      id: "comp-10",
      inventoryId: "brazo-robotico",
      name: "Servomotor Alto Torque Engranaje Metálico",
      model: "MG996R 180°",
      category: "Actuadores",
      quantity: 4,
      location: "Maletín Brazo Robótico · Espuma 1",
      notes: "3 instalados en base/hombro/codo + 1 de repuesto."
    },
    {
      id: "comp-11",
      inventoryId: "brazo-robotico",
      name: "Controlador PWM 16 Canales I2C",
      model: "PCA9685",
      category: "Microcontroladores",
      quantity: 1,
      location: "Maletín Brazo Robótico · Bolsa ESD",
      notes: "Alimentación externa de 6V para servos."
    },
    {
      id: "comp-12",
      inventoryId: "brazo-robotico",
      name: "Potenciómetro Lineal Rotativo 10k",
      model: "WH148 B10K",
      category: "Pasivos",
      quantity: 0,
      location: "Caja Organizadora B · Gaveta 5",
      notes: "Falta comprar 2 para el modo maestro-esclavo."
    },

    // --- PROYECTO: SEGUIDOR DE LÍNEA LAB 3 ---
    {
      id: "comp-13",
      inventoryId: "seguidor-linea",
      name: "Sensor Óptico Reflectivo Infrarrojo",
      model: "TCRT5000",
      category: "Sensores",
      quantity: 6,
      location: "Caja Seguidor · Compartimento C1",
      notes: "Arreglo de 5 sensores para lectura de línea negra + 1 repuesto."
    },
    {
      id: "comp-14",
      inventoryId: "seguidor-linea",
      name: "Motorreductor Micro Metal DC 6V",
      model: "N20 600RPM",
      category: "Actuadores",
      quantity: 2,
      location: "Caja Seguidor · Compartimento C2",
      notes: "Con llantas de silicona de alto agarre."
    },
    {
      id: "comp-15",
      inventoryId: "seguidor-linea",
      name: "Driver Doble Puente H MOSFET",
      model: "TB6612FNG",
      category: "Microcontroladores",
      quantity: 1,
      location: "Caja Seguidor · Bolsa Antiestática",
      notes: "Mucho más eficiente que el L298N, no cae voltaje."
    }
  ],
  loans: [
    {
      id: "loan-1",
      componentId: "comp-2",
      inventoryId: "general",
      componentName: "Sensor Ultrasónico de Distancia (HC-SR04)",
      borrowerName: "Mateo Ríos",
      borrowerGroup: "Lab Robótica · Grupo 2",
      quantity: 1,
      date: "20 Oct",
      status: "Pendiente", // 'Pendiente' | 'Devuelto'
      notes: "Lo necesita para calibrar su práctica hasta el viernes."
    },
    {
      id: "loan-2",
      componentId: "comp-4",
      inventoryId: "general",
      componentName: "Micro Servomotor 9g 180° (TowerPro SG90)",
      borrowerName: "Valentina Gómez",
      borrowerGroup: "Mecatrónica 5.º Sem",
      quantity: 1,
      date: "22 Oct",
      status: "Pendiente",
      notes: "Prestado en el laboratorio 402 durante clase de sensores."
    }
  ]
};

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(INITIAL_STATE);
    const parsed = JSON.parse(raw);
    const merged = {
      ...structuredClone(INITIAL_STATE),
      ...parsed
    };
    if (!Array.isArray(merged.categories) || merged.categories.length === 0) {
      merged.categories = structuredClone(DEFAULT_CATEGORIES);
    }
    return merged;
  } catch {
    return structuredClone(INITIAL_STATE);
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("No se pudo guardar el estado en localStorage:", err);
  }
}

export function resetStateToDemo() {
  const fresh = structuredClone(INITIAL_STATE);
  saveState(fresh);
  return fresh;
}

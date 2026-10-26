# ⚙️ MecaKit — Sistema de Gestión de Inventario Personal para Ingeniería Mecatrónica

**MecaKit** es una aplicación web minimalista inspirada en el estilo de **Notion**, diseñada para que estudiantes de Ingeniería Mecatrónica puedan consultar y organizar en segundos sus componentes electrónicos, su ubicación física en cajas/gavetas y los préstamos activos a compañeros de laboratorio.

🔗 **Demo en vivo (GitHub Pages):** [https://naiyis05.github.io/Meca-Kit/](https://naiyis05.github.io/Meca-Kit/)

---

## ✨ Funcionalidades Principales (PRD)

1. **Anotar y editar componentes**: Registra piezas indicando nombre, modelo técnico (`JetBrains Mono`), categoría, cantidad inicial y ubicación física.
2. **Sumar y restar stock (`+` / `-`) con un toque**: Ajusta las unidades disponibles directamente desde la lista o tarjetas sin abrir submenús.
3. **Búsqueda y filtrado instantáneo**: Busca en tiempo real por nombre, modelo o caja, y filtra por categorías personalizables (`Sensores`, `Microcontroladores`, `Actuadores`, `Pasivos`, o nuevas categorías como `Capacitores`).
4. **Detección automática de `"Agotado"`**: Cuando un componente llega a `0` unidades, muestra automáticamente la insignia `⚠️ Agotado`.
5. **Múltiples inventarios por usuario**: Incluye un *Inventario General* por defecto y permite crear, renombrar o eliminar inventarios independientes por proyecto (ej. *Brazo Robótico 4-DOF*, *Seguidor de Línea*).
6. **Seguimiento de préstamos**: Registra préstamos a compañeros (descontando del stock disponible) y restituye las unidades automáticamente al marcarlos como devueltos.

---

## 🚀 Ejecución en Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
```

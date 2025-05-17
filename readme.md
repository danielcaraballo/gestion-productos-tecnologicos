![1736969490860](https://github.com/user-attachments/assets/4d457f81-ce15-4c6c-8c29-647bf0efeb91)

# Gestión de Productos Tecnológicos

Aplicación web para la gestión integral de productos tecnológicos, tales como aplicaciones web, aplicaciones móviles, portales institucionales y entre otros. Esta herramienta está diseñada para facilitar la gestion, documentación y seguimiento de los productos.

Este proyecto está organizado como un monorepo, donde el frontend y el backend coexisten en carpetas separadas. El backend está desarrollado con **Django**, asegurando una arquitectura escalable y mantenible. El frontend se encuentra implementado con **JavaScript Vanilla**, permitiendo una interfaz ligera y funcional.

---

## 🚀 Funcionalidades

- **Gestión de Productos**: Crea, edita y elimina registros de productos tecnológicos con atributos clave.
- **API RESTful**: Estructura basada en buenas prácticas REST para facilitar la integración con interfaces externas.
- **Escalabilidad**: Arquitectura modular preparada para adaptarse a futuros componentes frontend más robustos.
- **Interfaz ligera**: Frontend sencillo enfocado en la eficiencia y usabilidad.

---

## 📦 Versión Actual

### v1.5.0

> **Nota:** Esta es una versión inicial en fase de desarrollo. Es posible que se introduzcan cambios importantes en futuras actualizaciones.

---

### 📂 Estructura del Monorepo

```bash
gestion-productos-tecnologicos/
├── client/                 # Frontend (JavaScript Vanilla)
│   ├── src/
│   │   ├── components/     # Navbar, formularios, etc.
│   │   └── services/       # Funciones para consumir la API
│   └── vite.config.js      # Configuración del bundler Vite
│
└── services/               # Backend (Django)
    ├── apps/
    │   ├── productos/      # Modelos, vistas y rutas de productos
    │   └── usuarios/       # Gestión de usuarios y autenticación
    ├── config/             # Configuración del proyecto Django
    ├── deployment/         # Archivos de despliegue (nginx, systemd, etc.)
    └── manage.py
```

## 🛠️ Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/danielcaraballo/gestion-productos-tecnologicos.git
   cd gestion-productos-tecnologicos
   ```

2. **Instalación del Backend (Django)**:

   ```bash
   cd services
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   pip install -r requirements.txt

   ```

3. **Configura las variables de entorno**:

   - Copia el archivo de ejemplo:

   ```bash
   cp .env.example .env
   ```

   - Asegúrate de configurar las variables como SECRET_KEY, DEBUG, etc.

4. **Aplica las migraciones de base de datos**:

   ```bash
   python manage.py migrate
   ```

5. **Inicia el servidor de desarrollo**:

   ```bash
   python manage.py runserver
   ```

6. **Instalación del Frontend (Vite + JS Vanilla)**:
   - En otra terminal:
   ```bash
   cd client
   npm install
   npm run dev
   ```

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Para colaborar, sigue estos pasos:

1. Haz un fork del repositorio.
2. Clona tu fork:
   ```bash
   git clone https://github.com/danielcaraballo/gestion-productos-tecnologicos.git
   ```
3. Crea una nueva rama:
   ```bash
   git checkout -b feature/mi-nueva-feature
   ```
4. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "feat(contexto): descripción breve del cambio"
   ```
5. Sube tus cambios:
   ```bash
   git push origin feature/mi-nueva-feature
   ```
6. Abre un Pull Request.

---

© 2025 - Daniel Caraballo. Todos los derechos reservados.

> Si este proyecto te ha sido útil, ¡considera darle una estrella ⭐ al repositorio!

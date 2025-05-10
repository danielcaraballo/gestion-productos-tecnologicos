![1736969490860](https://github.com/user-attachments/assets/4d457f81-ce15-4c6c-8c29-647bf0efeb91)

# Gestión de Productos Tecnológicos

Aplicación web para la gestión integral de productos tecnológicos, tales como soluciones web, aplicaciones móviles, portales corporativos y APIs. Esta herramienta está diseñada para facilitar el control, documentación y seguimiento de productos en entornos técnicos. 

El backend está desarrollado con **Django** y **Django Rest Framework**, asegurando una arquitectura escalable y mantenible. En su versión actual, el frontend se encuentra implementado con **JavaScript Vanilla**, permitiendo una interfaz ligera y funcional.

---

## 🚀 Funcionalidades

- **Gestión de Productos**: Crea, edita y elimina registros de productos tecnológicos con atributos clave.
- **API RESTful**: Estructura basada en buenas prácticas REST para facilitar la integración con interfaces externas.
- **Escalabilidad**: Arquitectura modular preparada para adaptarse a futuros componentes frontend más robustos.
- **Interfaz ligera**: Frontend sencillo enfocado en la eficiencia y usabilidad.

---

## 📦 Versión Actual

### v1.0.0

> **Nota:** Esta es una versión inicial en fase de desarrollo. Es posible que se introduzcan cambios importantes en futuras actualizaciones.

---

## 🛠️ Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/danielcaraballo/gestion-productos-tecnologicos.git
   cd gestion-productos-tecnologicos
   ```

2. **Crea un entorno virtual**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. **Instala las dependencias**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configura las variables de entorno**:
   - Crea un archivo `.env` en el directorio raíz.
   - Usa `.env.example` como referencia.

5. **Aplica las migraciones de base de datos**:
   ```bash
   python manage.py migrate
   ```

6. **Inicia el servidor de desarrollo**:
   ```bash
   python manage.py runserver
   ```

Accede a la aplicación en `http://127.0.0.1:8000/`.

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
   git commit -m "feat(mi-feature): descripción breve del cambio"
   ```
5. Sube tus cambios:
   ```bash
   git push origin feature/mi-nueva-feature
   ```
6. Abre un Pull Request.

---

© 2024 - Daniel Caraballo. Todos los derechos reservados.  

> Si este proyecto te ha sido útil, ¡considera darle una estrella ⭐ al repositorio!

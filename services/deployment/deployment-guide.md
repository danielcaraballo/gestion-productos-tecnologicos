# 🚀 Guía de Despliegue

Esta guía describe el proceso de despliegue del proyecto **Gestión de Productos Tecnológicos**, una aplicación web con backend en Django y frontend en JavaScript Vanilla. A continuación se detallan los pasos a seguir desde la instalación de archivos de configuración hasta la puesta en marcha del sistema en un entorno de servidor Ubuntu/Debian.

> **Requisitos previos:**
>
> - Servidor con sistema operativo Ubuntu/Debian
> - Nginx, Python y Node.js instalado
> - Acceso SSH como usuario con permisos sudo.
> - Repositorio clonado en `/var/www/html/gestion-productos-tecnologicos`
> - Haber seguido el proceso de instalación descrito en el README para preparar el entorno del proyecto.
> - Archivos de configuración preparados:
>   - gestionproductos.service (systemd)
>   - gestionproductos.socket (systemd)
>   - gestionproductos.conf (Nginx backend)
>   - gestionproductos-front.conf (Nginx frontend)

---

## ⚙️ Instalación de Archivos de Configuración

### 1. Copiar archivos systemd (backend)

Estos archivos permiten que el backend se ejecute como un servicio con socket:

```bash
sudo cp services/deployment/gestionproductos.service /etc/systemd/system/
sudo cp services/deployment/gestionproductos.socket /etc/systemd/system/
```

### 2. Copiar archivos de configuración de Nginx

El archivo `gestionproductos.conf` es para el backend (usando socket) y `gestionproductos-front.conf` sirve contenido estático del frontend:

```bash
sudo cp services/deployment/gestionproductos.conf /etc/nginx/sites-available/
sudo cp services/deployment/gestionproductos-front.conf /etc/nginx/sites-available/
```

### 3. Crear enlaces simbólicos para habilitar los bloques de servidor

```bash
sudo ln -s /etc/nginx/sites-available/gestionproductos.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/gestionproductos-front.conf /etc/nginx/sites-enabled/
```

---

## 🔌 Activación del Servicio Backend

### 4. Habilitar el servicio systemd (gestionproductos)

Esto asegura que el servicio se inicie automáticamente al arrancar el sistema:

```bash
sudo systemctl enable gestionproductos.service
```

### 5. Iniciar el socket

El socket gestiona las conexiones entrantes para el backend:

```bash
sudo systemctl start gestionproductos.socket
```

### 6. Verificar que el socket fue creado correctamente:

```bash
file /run/gestionproductos.sock
```

---

## 🌐 Configuración de Nginx

### 7. Verificar y reiniciar Nginx:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

### 8. (Opcional) Editar el archivo `/etc/hosts` para pruebas locales

```bash
sudo nano /etc/hosts
```

Agrega una línea como:

```
127.0.0.1   gestionproductos.local
```

---

## 🧪 Verificar servicios y resolver errores

### Ver estado de los servicios:

```bash
sudo systemctl status gestionproductos.socket
sudo systemctl status gestionproductos.service
```

### Recargar configuración y reiniciar servicios:

```bash
sudo systemctl daemon-reload
sudo systemctl restart gestionproductos.service
```

### Ver logs del servicio en tiempo real:

```bash
sudo journalctl -u gestionproductos.service -f
```

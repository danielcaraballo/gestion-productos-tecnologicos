class navbar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
          <header class="navbar navbar-expand-md navbar-overlap d-print-none" data-bs-theme="dark">
          <div class="container-xl">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu"
              aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
              <a href="../pages/dashboard.html">
                <img src="../../public/logo.svg" width="300" height="40" alt="MPPE" class="navbar-brand-image">
              </a>
            </h1>
            <div class="navbar-nav flex-row order-md-last">
              <div class="d-none d-md-flex me-2">
                <a href="?theme=dark" class="nav-link px-0 hide-theme-dark" title="Habilitar el modo oscuro"
                  data-bs-toggle="tooltip" data-bs-placement="bottom">
                  <!-- Download SVG icon from http://tabler-icons.io/i/moon -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                  </svg>
                </a>
                <a href="?theme=light" class="nav-link px-0 hide-theme-light" title="Habilitar el modo claro"
                  data-bs-toggle="tooltip" data-bs-placement="bottom">
                  <!-- Download SVG icon from http://tabler-icons.io/i/sun -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                  </svg>
                </a>
                
              </div>
              <div class="nav-item dropdown">
                <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown"
                  aria-label="Open user menu">
                  <span class="bg-primary text-white avatar avatar-sm">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                  </span>
                  <div id="user-info" class="d-none d-xl-block ps-2">
                    <div id="full-name"></div>
                    <div id="user-group" class="mt-1 small text-secondary"></div>
                  </div>
                </a>
                <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow" data-bs-theme="light">
                  <!--<a href="./settings.html" class="dropdown-item">Configuración</a>-->
                  <a id="signout-button" href="../pages/sign-in.html" class="dropdown-item">Cerrar sesión</a>
                </div>
              </div>
            </div>
            <div class="collapse navbar-collapse" id="navbar-menu">
              <div class="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link" href="../pages/dashboard.html">
                      <span
                        class="nav-link-icon d-md-none d-lg-inline-block"><!-- Download SVG icon from http://tabler-icons.io/i/home -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                      </span>
                      <span class="nav-link-title">
                        Inicio
                      </span>
                    </a>
                  </li>
                  <li class="nav-item"></li>
                  <a class="nav-link" href="../pages/products.html">
                    <span
                      class="nav-link-icon d-md-none d-lg-inline-block"><!-- Download SVG icon from http://tabler-icons.io/i/home -->
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-apps"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 7l6 0" /><path d="M17 4l0 6" /></svg>
                    </span>
                    <span class="nav-link-title">
                      Productos
                    </span>
                  </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="../pages/error-maintenance.html">
                      <span
                        class="nav-link-icon d-md-none d-lg-inline-block"><!-- Download SVG icon from http://tabler-icons.io/i/checkbox -->
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-server"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" /><path d="M3 12m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" /><path d="M7 8l0 .01" /><path d="M7 16l0 .01" /></svg>
                      </span>
                      <span class="nav-link-title">
                        Trabajos Operativos
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        `;
  }
}

customElements.define("navbar-component", navbar);

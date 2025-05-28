class footer extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
            <footer class="footer footer-transparent d-print-none">
            <div class="container-xl">
            <div class="row text-center align-items-center flex-row-reverse">
                <div class="col-lg-auto ms-lg-auto">
                <ul class="list-inline list-inline-dots mb-0">
                    <li class="list-inline-item">
                    v1.6.0
                    </li>
                </ul>
                </div>
                <div class="col-12 col-lg-auto mt-3 mt-lg-0">
                <ul class="list-inline list-inline-dots mb-0">
                    <li class="list-inline-item">
                        &copy; 2025 - Daniel Caraballo. Todos los derechos reservados.
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </footer>
        `;
  }
}

customElements.define("footer-component", footer);

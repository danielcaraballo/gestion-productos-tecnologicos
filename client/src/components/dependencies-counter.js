class dependenciesCounter extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
          <div class="card" style="height: 20rem">
            <div class="card-header">
              <h3 class="card-title">Productos por dependencias</h3>
            </div>
              <div class="card card-body-scrollable card-body-scrollable-shadow">
              <table class="table card-table table-vcenter">
              <thead>
              <tr>
              <th>Dependencias</th>
              <th colspan="2" style="text-align: center">Productos</th>
              </tr>
              </thead>
                <tbody id="dependencias-tbody">
                  <!-- Filas generadas dinámicamente aquí -->
                </tbody>
                </table>
              </div>
          </div>
        `;
  }
}

customElements.define("dependencies-counter", dependenciesCounter);

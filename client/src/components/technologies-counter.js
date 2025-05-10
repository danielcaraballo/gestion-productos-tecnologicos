class technologiesCounter extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = /*html*/ `
          <div class="card">
            <div class="card-body">
              <div id="chart-demo-pie"></div>
            </div>
          </div>
        </div>
          `;
    }
  }
  
  customElements.define("technologies-counter", technologiesCounter);
class btnReportExcel extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
            <button
                id="btn-generar-reporte"
                class="btn btn-primary btn-5 d-none d-sm-inline-block"
                >
                Generar Reporte
            </button>
        `;
  }
}

customElements.define("btn-report-excel", btnReportExcel);

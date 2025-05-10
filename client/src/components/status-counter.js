class statusCounter extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
            <div class="row row-cards">
            <!-- Contador: Productos Operativos -->
            <div class="col-sm-6 col-lg-3">
                <div class="card card-sm">
                <div class="card-body">
                    <div class="row align-items-center">
                    <div class="col-auto">
                        <span class="bg-green text-white avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-check">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                        </svg>
                        </span>
                    </div>
                    <div class="col">
                        <div id="contador-operativos" class="font-weight-medium">
                        0 Productos
                        </div>
                        <div class="text-secondary">
                        Operativos
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <!-- Contador: Productos en Mantenimiento -->
            <div class="col-sm-6 col-lg-3">
                <div class="card card-sm">
                <div class="card-body">
                    <div class="row align-items-center">
                    <div class="col-auto">
                        <span class="bg-azure text-white avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-refresh">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                        </svg>
                        </span>
                    </div>
                    <div class="col">
                        <div id="contador-mantenimiento" class="font-weight-medium">
                        0 Productos
                        </div>
                        <div class="text-secondary">
                        En Mantenimiento
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <!-- Contador: Productos Inactivos -->
            <div class="col-sm-6 col-lg-3">
                <div class="card card-sm">
                <div class="card-body">
                    <div class="row align-items-center">
                    <div class="col-auto">
                        <span class="bg-red text-white avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-down">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M18 13l-6 6" />
                            <path d="M6 13l6 6" />
                        </svg>
                        </span>
                    </div>
                    <div class="col">
                        <div id="contador-inactivos" class="font-weight-medium">
                        0 Productos
                        </div>
                        <div class="text-secondary">
                        Inactivos
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <!-- Contador: Productos Retirados -->
            <div class="col-sm-6 col-lg-3">
                <div class="card card-sm">
                <div class="card-body">
                    <div class="row align-items-center">
                    <div class="col-auto">
                        <span class="bg-blue text-white avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-archive">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                            d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                            <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
                            <path d="M10 12l4 0" />
                        </svg>
                        </span>
                    </div>
                    <div class="col">
                        <div id="contador-retirados" class="font-weight-medium">
                        0 Productos
                        </div>
                        <div class="text-secondary">
                        Retirados
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
          `;
  }
}

customElements.define("status-counter", statusCounter);

class formAddProduct extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
            <div
            class="modal modal-blur fade"
            id="modal-report"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            >
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title">Nuevo producto</h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
                </div>

                <!-- Paso 1 - Información Básica -->
                <div id="step-1" class="step">
                <div class="card-body">
                    <ul class="steps steps-blue steps-counter my-4">
                    <li class="step-item active">Información básica</li>
                    <li class="step-item">Información tecnica</li>
                    <li class="step-item">Solicitante y responsables</li>
                    </ul>
                </div>
                <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Nombre</label>
                    <input
                    id="nombre"
                    type="text"
                    class="form-control"
                    placeholder="Coloca el nombre del producto"
                    />
                </div>
                <div class="col-lg-12">
                    <div>
                    <label class="form-label">Descripción</label>
                    <textarea id="descripcion" class="form-control" rows="3" placeholder="Coloca la descripción del producto"></textarea>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-8">
                    <div class="mb-3">
                        <label class="form-label">Dirección URL</label>
                        <div class="input-group input-group-flat">
                        <span class="input-group-text">
                            http://
                        </span>
                        <input
                            type="text"
                            class="form-control ps-0"
                            id="url"
                            autocomplete="off"
                            placeholder="ejemplo.com"
                        />
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-4">
                    <div class="mb-3">
                        <label class="form-label">Estatus</label>
                        <select id="estatus" class="form-select">
                        <option value="1" selected>Operativo</option>
                        <option value="2">En Mantenimiento</option>
                        <option value="3">Inactivo</option>
                        <option value="4">Retirado</option>
                        </select> 
                    </div>
                    </div>
                    <div class="col-lg-12">
                    <div class="mb-3">
                        <label class="form-label">Fecha de lanzamiento</label>
                        <input type="date" id="fecha_lanzamiento" class="form-control" />
                    </div>
                    </div>
                    <!-- MENSAJE DE ERROR -->
                    <div id="error-alert" class="alert alert-important alert-danger alert-dismissible hidden" role="alert">
                        <div class="d-flex">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
                            </div>
                        <div id="error-message"></div>
                    </div>
                    <a class="btn-close" data-bs-dismiss="alert" aria-label="close"></a>
                </div>
                    </div>
                </div>
                    <div class="modal-footer">
                        <button href="#" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary ms-auto" id="nextStep1">Siguiente</button>
                    </div>
                </div>

                <!-- Paso 2 - Información Técnica -->
                <div id="step-2" class="step" style="display: none;">
                    <div class="card-body">
                        <ul class="steps steps-blue steps-counter my-4">
                            <li class="step-item">Información básica</li>
                            <li class="step-item active">Información tecnica</li>
                            <li class="step-item">Solicitante y responsables</li>
                        </ul>
                    </div>
                    <div class="modal-body">
                        <div class="col-lg-12">
                            <div class="mb-3">
                                <label class="form-label">Tecnologias</label>
                                <select type="text" class="form-select" placeholder="Seleccione la tecnologia" id="select-tags" value="" multiple>
                                    <option value="Django">Django</option>
                                    <option value="Django Rest Framework">Django Rest Framework</option>
                                    <option value="React">React</option>
                                    <option value="Next">Next</option>
                                    <option value="Vue">Vue</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="prevStep2" style="display: none;">Anterior</button>
                        <button type="button" class="btn btn-primary ms-auto" id="nextStep2">Siguiente</button>
                    </div>
                </div>

                    <!-- Paso 3 - Solicitante y Responsables -->
                    <div id="step-3" class="step" style="display: none;">
                    <div class="card-body">
                        <ul class="steps steps-blue steps-counter my-4">
                        <li class="step-item">Información básica</li>
                        <li class="step-item">Información tecnica</li>
                        <li class="step-item active">Solicitante y responsables</li>
                        </ul>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                        <label class="form-label">Solicitante</label>
                        <input type="text" id="solicitante" class="form-control" placeholder="Seleccione el solicitante" />
                        </div>
                        <div class="mb-3">
                        <label class="form-label">Responsable</label>
                        <input type="text" id="responsable" class="form-control" placeholder="Selecciones los responsables" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="prevStep3" style="display: none;">Anterior</button>
                        <button type="submit" class="btn btn-success ms-auto">Agregar producto</button>
                    </div>
                    </div>
                    
                    </div>
                </div>
            </div>
        </div>

        `;

    this.initializeTomSelect(); // Llamamos la función de inicialización al crear el componente
  }

  initializeTomSelect() {
    // Nos aseguramos de que Tom Select esté disponible
    document.addEventListener("DOMContentLoaded", () => {
      const el = document.getElementById("select-tags");
      if (window.TomSelect && el) {
        new TomSelect(el, {
          copyClassesToDropdown: false,
          dropdownParent: document.getElementById("tags-input"),
          controlInput: "<input>",
          render: {
            item: function (data, escape) {
              return `<div>${escape(data.text)}</div>`;
            },
            option: function (data, escape) {
              return `<div>${escape(data.text)}</div>`;
            },
          },
        });
      }
    });
  }
}

customElements.define("form-add-product-component", formAddProduct);

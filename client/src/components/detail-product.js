class detailProduct extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
        <div class="modal modal-blur fade" id="modal-simple" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">Nombre del producto</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <h5 class="modal-title">Informacion del producto</h5>
                        <p><strong>Descripción:</strong> <span id="modal-description"></span></p>
                        <p><strong>Fecha de lanzamiento:</strong> <span id="modal-release-date"></span></p>
                        <p><strong>Categoría:</strong> <span id="modal-category"></span></p>
                        <p><strong>Tecnologías:</strong> <span id="modal-technologies"></span></p>
                        <p><strong>Solicitante:</strong> <span id="modal-requester"></span></p>
                        <p><strong>Responsables:</strong></p>
                            <ul id="modal-responsibles-list"></ul>
                        <p><strong>Estatus:</strong> <span id="modal-status"></span></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn me-auto" data-bs-dismiss="modal">Cerrar</button>
                        <a id="modal-url-button" href="#" class="btn btn-primary" target="_blank">Ver producto</a>
                    </div>
                </div>
            </div>
        </div>
          `;
  }
}

customElements.define("detail-product", detailProduct);

import { imagesURL } from "./constants.js";
import { mediator } from "./mediator.js";

class Modal {
    constructor() {
        this.init();
        this.bindModalTrigger();
    }

    init() {
        var modal = $("#myModal")[0];
        this.modal = modal;
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    bindModalTrigger() {
        var context = this;

        mediator.on("modal-trigger", function (data) {
            context.data = data;
            context.render();
        })
    }

    render() {
        $("#modal-title").text(this.data.original_title);
        $("#modal-description").text(this.data.overview);
        $("#modal-image").attr("src", `${imagesURL}${this.data.poster_path}`);

        this.modal.style.display = "block";
    }
}

export default Modal;
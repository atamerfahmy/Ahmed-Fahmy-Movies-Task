import { mediator } from "./mediator.js";

class Page {

    constructor() {
        this.pageNumber = 1;
        this.cacheElements();
        this.bindListeners();
    }

    cacheElements() {
        this.previous = $("#previous");
        this.next = $("#next");
    }

    bindListeners() {
        this.previous.click(this.decrement.bind(this));
        this.next.click(this.increment.bind(this));
    }

    increment() {
        this.pageNumber += 1;
        mediator.emit("page_number_changed", this.pageNumber);
    }

    decrement() {
        if(this.pageNumber > 1){
            this.pageNumber -= 1;
            mediator.emit("page_number_changed", this.pageNumber);
        }
    }
}

export default Page;
import { imagesURL, url } from "./constants.js";
import { mediator } from "./mediator.js";

class Movies {
    constructor() {
        this.init();
    }

    async init() {
        this.pageNumber = 1;
        this.cacheElements();
        this.bindPageNumber();
        await this.fetchData();
    }

    cacheElements() {
        this.moviesContainer = $(".movies-container")[0];
    }

    bindPageNumber() {
        var context = this;
        mediator.on("page_number_changed", function (data) {
            context.pageNumber = data;
            context.fetchData();
        })
    }

    bindListeners() {
        var context = this;

        $(".modal-trigger").click(function () {
            var movie = context.movies[parseInt($(this).attr("data-index"))];
            mediator.emit("modal-trigger", movie);
        })

    }

    async fetchData() {
        var context = this;

        await $.get(url + `&page=${this.pageNumber}`, {},
            (data, textStatus, jqXHR) => {
                mediator.emit("update", data);
                context.movies = data.results;
                context.render();
                context.bindListeners();
            },
            "json"
        );
    }

    render() {
        var row = `
            <div id="row-{{data}}" class="row">
            </div>
        `;

        var column = `
        <div class="col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div id="modal-trigger" data-index={{index}} class="card d-flex flex-column justify-content-between mb-4 modal-trigger" style="border-radius: 0px;">
                <img src="{{baseURL}}{{poster_path}}" class="image" alt="...">
                <div class="card-body card_bg_color card_divs">
                    <h5 class="card-title text-center main_color">{{original_title}}</h5>
                    <p class="card-text text-center secondary_color">
                        {{vote_average}}
                    </p>
                </div>
            </div>
        </div>
        `;

        var context = this;
        var index = 0;

        $(context.moviesContainer).html("");

        for(let i = 0; i < 5; i++){
            var x = Mustache.render(row, { data: i });
            $(context.moviesContainer).append(x);
            index++;
        }

        index = 0;
        this.movies.map((movie, i) => {
            if (i % 4 === 0) {
                index++;
            }
            let text = Mustache.render(column, {...movie, baseURL: imagesURL, index: i});            
            $(`#row-${index}`).append(text);
        })
    }
}

export default Movies;
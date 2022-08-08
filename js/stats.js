import { mediator } from "./mediator.js";

class Stats {
    constructor() {
        this.pageNumber = 0;
        this.moviesNumber = 0;
        this.topRated = "";
        this.rating = 0;

        this.cacheElements();
        this.updateStats();
    }

    cacheElements() {
        this.currentPageElement = $("#current_page");
        this.moviesNumberElement = $("#movies_number");
        this.topRatedElement = $("#top_rated");
        this.ratingElement = $("#rating");
    }

    updateStats() {
        var context = this;
        mediator.on("update", function (data) {
            let topRatedMovie = context.findTopRated(data.results);
            context.pageNumber = data.page;
            context.moviesNumber = data.total_results;
            context.topRated = topRatedMovie.original_title;
            context.rating = topRatedMovie.vote_average;
            context.render();
        })
    }

    findTopRated(data) {
        let max = data.reduce(function(prev, current) {
            return (prev.vote_average > current.vote_average) ? prev : current
        })

        return max;
    }

    render() {
        this.currentPageElement.text(this.pageNumber);
        this.moviesNumberElement.text(this.moviesNumber);
        this.topRatedElement.text(this.topRated);
        this.ratingElement.text(this.rating);
    }
}

export default Stats;
//Initialization of variables
var listFilms = [];
var v = $(window);
var cont = 1;
var film;
var flag = 0;
var petition = false;
var selector = document.getElementById("tittle");
var currentFilmId;
var detailFilm;

//Code
$("#valor").click(function findFilm() {
    document.getElementById("loading").style.display = "block";
    film = document.getElementById("peli").value;
    $('.card').remove();
    $.ajax({
        url: "http://www.omdbapi.com/?s=" + film + "&type=movie&apikey=e5e10b8a",
        success: function (result) {
            document.getElementById("loading").style.display = "none";
            if (result.Response === 'True') {
                console.log(result, "The server has responded to the request");
                listFilms = result;
                if (flag === 0) {
                    document.getElementById("carouselExampleIndicators").remove();
                    flag = 1;
                }
                addFilm(listFilms);
            }
        },
        error: function () {
            console.log("Something goes wrong.");
        }
    });
});

function errorImage(error) {
    error.src = "img/notload.jpg"
}

function addFilm(listFilms) {
    for (let i = 0; i < listFilms.Search.length; i++) {
        $("#content").append('<div class="card text-white bg-dark border-white col-lg-3 col-md-4 col-sm-6 col-xs-12 col-12" style="height: 700px; display: inline-flex;">\n' + '<br>' +
            '  <img class="card-img-top" style="height: 400px; width: 100%;" src="' + listFilms.Search[i].Poster + '" onerror="errorImage(this)">\n' +
            '  <div class="card-body">\n' +
            '    <h5 class="card-title">' + listFilms.Search[i].Title + '</h5>\n' +
            '    <p class="card-text">Year: ' + listFilms.Search[i].Year + '</p>\n' +
            'imdbID: ' + ' <p class="card-text">' + listFilms.Search[i].imdbID + '</p>\n' +
            '<button type="button" class="btn btn-info" onclick="moreDetails(event)" data-toggle="modal" data-target="#exampleModalCenter">' +
            'More Details' + '</button>' +
            '</div>');
    }
    v.scroll(function () {
        if ($(document).height() - v.height() <= (v.scrollTop() + 90)) {
            if (!petition) {
                document.getElementById("loading").style.display = "block";
                petition = true;
                cont++;
                $.ajax({
                    url: "http://www.omdbapi.com/?s=" + film + "&type=movie&page=" + cont + "&apikey=e5e10b8a",
                    success: function (parameter) {
                        document.getElementById("loading").style.display = "none";
                        addFilm(parameter);
                        petition = false;
                    }
                });
            }
        }
    });
}

function moreDetails(event) {
    currentFilmId = event.target.parentElement.children[2].innerHTML;
    document.getElementById("loading").style.display = "block";
    $.ajax({
        url: "http://www.omdbapi.com/?i=" + currentFilmId + "&plot=full&apikey=e5e10b8a",
        success: function (result) {
            document.getElementById("loading").style.display = "none";
            console.log(result);
            detailFilm = result;
            document.getElementById("currentFilmImage").src = detailFilm.Poster;
            document.getElementById("currentFilmTitle").innerHTML = detailFilm.Title;
            document.getElementById("currentFilmDirector").innerHTML = "Director: " + detailFilm.Director;
            document.getElementById("currentFilmActors").innerHTML = "Actors: " + detailFilm.Actors;
            document.getElementById("currentFilmPlot").innerHTML = "Synapses: " + detailFilm.Plot;
            document.getElementById("currentFilmProduction").innerHTML = "Production company: " + detailFilm.Production;
            document.getElementById("currentFilmPEGI").innerHTML = "Age rating: " + detailFilm.Rated;
            document.getElementById("currentFilmReleased").innerHTML = "Year released: " + detailFilm.Released;
            document.getElementById("currentFilmRuntime").innerHTML = "Runtime Film: " + detailFilm.Runtime;
            document.getElementById("currentFilmAwards").innerHTML = "Awards:  " + detailFilm.Awards;
            document.getElementById("currentFilmimdbRating").innerHTML = "imdbRating: " + detailFilm.imdbRating;
            document.getElementById("currentFilmWriter").innerHTML = "Writer Film: " + detailFilm.Writer;

            //styles
            document.getElementById("currentFilmTitle").setAttribute("align", "center");
            document.getElementById("currentFilmTitle").style.fontWeight = "900";
            document.getElementById("currentFilmTitle").style.textTransform = "uppercase";


        },
        error: function () {
            console.log("Something goes wrong.");
        }
    });
}

v.ready(function () {
    var random = Math.floor(Math.random() * 4) + 1;
    if (random === 1) {
        selector.innerHTML = "<img src='tittle_banner/tittle1.jpg'>";
    }
    if (random === 2) {
        selector.innerHTML = "<img src='tittle_banner/tittle2.jpg'>";
    }
    if (random === 3) {
        selector.innerHTML = "<img src='tittle_banner/tittle3.jpg'>";
    }
    if (random === 4) {
        selector.innerHTML = "<img src='tittle_banner/tittle4.jpg'>";
    }
});
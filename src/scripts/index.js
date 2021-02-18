$(document).ready( () => {
    $('#searchForm').on('submit', (e) => {
        let searchText = ($('#searchText').val());
        getMovies(searchText);
        e.preventDefault();
    })
})

function getMovies(searchText) {
    console.log(`get movies ${searchText}`);
    const url = `http://www.omdbapi.com/?s=${searchText}&apikey=${config.apiKey}`;
    axios.get(url)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                <div class="col-sm-3">
                    <div class="well text-center bg-light">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>
                `;
            })
            $('#movies').html(output);
            console.log(output);
        })
        .catch((err)=> {
            console.log(err);
        })
}

function movieSelected(id) {
    sessionStorage.setItem('movieid', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieid');
    console.log(movieId);
    const url = `http://www.omdbapi.com/?i=${movieId}&apikey=${config.apiKey}`;
    const imdbLink = `https://www.imdb.com/title/${movieId}/`;
    axios.get(url)
        .then((response) => {
            let movie = response.data;
            let output = `
                <div class="row">
                    <div clas="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8>
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:</strong> ${movie.Release}</li>
                            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.Plot}
                        <hr>
                        <a href=${imdbLink} target="_blank" class="btn btn-primary">View IMDB</a>
                        <a src"index.html" class="btn btn-default">Go back to Search</a>
                    </div>
                </div>
            `;

            $('#movie').html(output);

        })
        .catch((err)=> {
            console.log(err);
        })
}
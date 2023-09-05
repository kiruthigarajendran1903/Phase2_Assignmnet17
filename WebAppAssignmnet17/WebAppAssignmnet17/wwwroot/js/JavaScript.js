document.addEventListener("DOMContentLoaded", () => {
    const movieList = document.getElementById("movieList");
    const createMovieForm = document.getElementById("createMovieForm");
    const updateMovieForm = document.getElementById("updateMovieForm");
    const deleteMovieForm = document.getElementById("deleteMovieForm");

    function displayMovies() {
        fetch("http://localhost:5178/api/movies")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status :${response.status}`);
                }
                return response.json();
            })
            .then(movies => {
                movieList.innerHTML = "";
                movies.forEach(movie => {
                    const listitem = document.createElement("li");
                    listitem.textContent = `ID:${movie.id},Title:${movie.title},ReleaseDate :${movie.releaseDate},Rating:${movie.rating}`;
                    movieList.appendChild(listitem);
                });
            })
            .catch(error => {
                console.error("Fetch Error :", error);
                movieList.innerHTML = "Error Fetching movies."
            });
    }

    createMovieForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const releaseDate = document.getElementById("releaseDate").value;
        const rating = document.getElementById("rating").value;

        fetch(`http://localhost:5178/api/movies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, releaseDate, rating })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status :${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                //clear fields after successfull creation
                document.getElementById("title").value = "";
                document.getElementById("releaseDate").value = "";
                document.getElementById("rating").value = "";
                //refresh the movieList
                displayMovies();
            })
            .catch(error => {
                console.error("Fetch Error :", error);
            });
    });
    updateMovieForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const movieId = document.getElementById("movieId").value;
        const newTitle = document.getElementById("newTitle").value;
        const newreleaseDate = document.getElementById("newreleaseDate").value;
        const newRating = document.getElementById("newRating").value;

        fetch(`http://localhost:5178/api/movies/${movieId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: movieId, title: newTitle, releaseDate: newreleaseDate, rating: newRating })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status :${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                document.getElementById("movieId").value = "";
                document.getElementById("newTitle").value = "";
                document.getElementById(" newreleaseDate").value = "";
                document.getElementById("newRating").value = "";
                displayMovies();
            })
            .catch(error => {
                console.error("Fetch Error :", error);
            });
    });
    //Event Listener for Delete movie Form Submission
    deleteMovieForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const deletemovieId = document.getElementById("deletemovieId").value;

        fetch(`http://localhost:5178/api/movies/${deletemovieId}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status :${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                document.getElementById("deletemovieId").value = "";
                displayMovies();
            })
            .catch(error => {
                console.error("Fetch Error :", error);
            });
    });

    displayMovies();

});
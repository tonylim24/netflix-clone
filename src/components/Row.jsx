import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
// import movieTrailer from 'movie-trailer';
// Remember that we exported default instance in axios. Because we use default instance,
// We can rename that instance into anything that we want, in this case we called it axios.
import axiosTMDB from '../axiosTMDB';
import '../stylesheets/Row.css';
import axios from 'axios';

// Set Base URL to grab locally (in TMDB) stored images.
const baseUrl = "https://image.tmdb.org/t/p/original/";
const YoutubeSearchAPI = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyAD_VnznUvqAs0BE8qhT-h-rkR4fX6A-GM&type=video&q=";

const Row = ({ title, fetchUrl, isLargeRow }) => {
    // Here because we are using useState function, when setMovies(param) is called,
    // It will store param into a variable called movies.
    // This is how a state is declared when using function hook.
    // It is equivalent to the code in Class component:
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         movies: []
    //     };
    // }
    // However we cannot invoke this.state.movies, we can only call it with clg(movies)
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // Code that runs if the given array is being loaded or changed.
    // If array given is empty, then useEffect will only be triggered once on load.
    // If we pass in a variable, in this case fetchUrl, we have to pass it onto the argument array.
    useEffect(() => {
        // Here we use async function to enforce load first.
        async function fetchData() {
            const request = await axiosTMDB.get(fetchUrl);
            setMovies(request.data.results);
        }
        fetchData();
    }, [fetchUrl]);


    // Set Optional Configuration Settings for React-youtube
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };
    // handleClick function when a poster is clicked.
    const handleClick = (movie) => {
        if (trailerUrl) {
            // Reset trailer URL and close YouTube player if we already have a trailerUrl
            setTrailerUrl('');
        } else {
            // movieTrailer is npm module that we installed using npm i movie-trailer.
            console.log(movie);
            let movieName = movie?.name || movie?.title;
            let movieYear = "";
            if (movie?.first_air_date !== undefined) {
                movieYear = (movie?.first_air_date).substr(0, 4);
            } else if (movie?.release_date !== undefined) {
                movieYear = (movie?.release_date).substr(0, 4);
            }
            else {
                console.log('Neither first air date nor release date is defined. Will not search with year.');
                movieYear = "";
            }

            // let movieYear = ((movie?.first_air_date).substr(0, 4) || (movie?.release_date).substr(0, 4));
            let additionalSearchQuery1 = "movie";
            let additionalSearchQuery2 = "trailer";
            // Replace the whitespace between movie's name with +
            console.log(YoutubeSearchAPI + movieName.replace(/\s/g, '+') + "+" + movieYear + "+" + additionalSearchQuery1 + "+" + additionalSearchQuery2);
            let fullYoutubeAPIURL = YoutubeSearchAPI + movieName.replace(/\s/g, '+') + "+" + movieYear + "+" + additionalSearchQuery1 + "+" + additionalSearchQuery2;

            const axiosYoutubeAPI = axios.create();
            axiosYoutubeAPI
                .get(fullYoutubeAPIURL)
                .then(function(response) {
                    console.log(response.data.items[0].id.videoId);
                    setTrailerUrl(response.data.items[0].id.videoId);
                });
        };
    };
    

    return (
        <div className="row">
            <h2 className="row-title">{title}</h2>
            <div className="rowPosters">
                {movies.map(movie => (
                    <img 
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        // Add all poster with class poster-image. ALso if it isLargeRow, then we added
                        // an additional class called poster-large. Note we do not use ?
                        className={`poster-image ${isLargeRow && "poster-large"}`}
                        // src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.poster_path}`} 
                        alt={movie.name}
                    />
                ))}
            </div>
            {/* <YouTube videoId='CHWHp3rbpGY' opts={opts} /> */}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
};

export default Row;

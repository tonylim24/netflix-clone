import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axiosTMDB from '../axiosTMDB';
import requests from '../requests';
import '../stylesheets/Banner.css';
import getMovieAPI from '../getMovieAPI';
import axios from 'axios';

function Banner() {
    const [bannerMovie, setBannerMovie] = useState([]);
    const [bannerMovieUrl, setBannerMovieUrl] = useState("");
    const [playButtonClicked, setPlayButtonState] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const request = await axiosTMDB.get(requests.fetchNetflixOriginals);
            setBannerMovie(
                request.data.results[
                    // Get a Random Movie from Netflix Originals to be put into the banner.
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
        }
        fetchData();
    }, []);

    // Set Optional Configuration Settings for React-youtube
    const opts = {
        // height: document.getElementById('banner-player').getBoundingClientRect().height,
        // width: document.getElementById('banner-player').getBoundingClientRect().width,
        width: "350px",
        height: "200px",
        playerVars: {
            autoplay: 1,
        },
    };


    // A function to take a maximum amount of characters before adding ...
    function truncateString(str, n) {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    const playBtnClick = (bannerMovie) => {

        if (bannerMovieUrl) {
            setBannerMovieUrl('');
            setPlayButtonState(false);
        }
        else {
            let fullYoutubeAPIURL = getMovieAPI(bannerMovie);

            const axiosYoutubeAPI = axios.create();
            axiosYoutubeAPI
                .get(fullYoutubeAPIURL)
                .then(function(response) {
                    setPlayButtonState(!playButtonClicked);
                    setBannerMovieUrl(response.data.items[0].id.videoId);
                })
                .catch(function (error){
                    console.log('Cannot obtain playback from API.');
                    console.log(error);
                });
        };
    }

    return (
        // document.getElementById('banner-player').addEventListener("resize", getScreenInfoOnResize),
        <header>
            <div
                className="banner-container" 
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(
                        "https://image.tmdb.org/t/p/original/${bannerMovie?.backdrop_path}"
                    )`,
                    backgroundPosition: "top center"
                }}
            >
                <div className="banner-info">
                    <div className="banner-contents">
                        <h1 className="banner-title">
                            {/* Sometimes in netflix original, the movie can have either of the following:
                                title or name or original_name.
                            */}
                            {bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name}
                        </h1>

                        <div className="description">
                            <h1 className="banner-description">
                                {/* {bannerMovie?.overview} */}
                                {/* Let banner description max words of 150. */}
                                {truncateString(bannerMovie?.overview, 150)}
                            </h1>
                        </div>

                        <div className="banner-player">
                            {bannerMovieUrl && <YouTube videoId={bannerMovieUrl} opts={opts} />}
                        </div>
                        
                        <div className="banner-buttons">
                            <button 
                                className="banner-button"
                                onClick={() => playBtnClick(bannerMovie)}> {playButtonClicked ? "Close Player" : "Play"}
                            </button>
                            {/* <button className="banner-button">My List</button> */}
                        </div>
                    </div>

                    {/* Maturity Rating */}
                    <span className="tmdb-rating">
                        <span className="tmdb-number">{`${bannerMovie?.vote_average}/10 (${bannerMovie?.vote_count})`}</span>
                    </span>
                </div>

                {/* An Empty div to be used for CSS to fade the bottom of the banner */}
                <div className="banner-fadeBottom" />
            </div>
        </header>
    );
}

export default Banner
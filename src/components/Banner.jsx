import React, { useState, useEffect } from 'react';
import axios from '../axiosTMDB';
import requests from '../requests';
import '../stylesheets/Banner.css';

function Banner() {
    const [bannerMovie, setBannerMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setBannerMovie(
                request.data.results[
                    // Get a Random Movie from Netflix Originals to be put into the banner.
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
        }
        fetchData();
    }, []);

    // console.log(bannerMovie);

    // A function to take a maximum amount of characters before adding ...
    function truncateString(str, n) {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    return (
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

                        <div className="banner-buttons">
                            <button className="banner-button">Play</button>
                            <button className="banner-button">My List</button>
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
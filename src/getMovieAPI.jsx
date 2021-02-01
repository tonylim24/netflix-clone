function getMovieAPI(movie) {

    const YoutubeSearchAPI = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyAD_VnznUvqAs0BE8qhT-h-rkR4fX6A-GM&type=video&q=";

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
    
    let additionalSearchQuery1 = "movie";
    let additionalSearchQuery2 = "trailer";
    // Replace the whitespace between movie's name with +
    let fullYoutubeAPIURL = YoutubeSearchAPI + movieName.replace(/\s/g, '+') + "+" + movieYear + "+" + additionalSearchQuery1 + "+" + additionalSearchQuery2;


    return fullYoutubeAPIURL;
}

export default getMovieAPI

import axios from "axios";

/**
 * Base URL to make request to the TMDB
 * It uses instance.get to send GET command to baseURL/instance.get's URL
 * ie: if instance.get('/foo-bar');
 * Then it will send request to https://api.themoviedb.org/3/foo-bar
 */
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",

});

export default instance;
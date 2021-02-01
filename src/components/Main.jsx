import React, { Component } from 'react';
import Row from './Row';
import requests from '../requests';
import Banner from './Banner';
import TopNav from './TopNav';
import '../stylesheets/Main.css';

class Main extends Component {
    render() {
        return (
            <div className="App">
                {/* Navbar */}
                <TopNav />
                {/* Banner */}
                <Banner />

                <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow="true" />
                <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
                <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
                <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
                <Row title="Adventure Movies" fetchUrl={requests.fetchAdventureMovies} />
                <Row title="Animation Movies" fetchUrl={requests.fetchAnimationMovies} />
                <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
                <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
                <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
                <Row title="Science Fiction Movies" fetchUrl={requests.fetchScifiMovies} />
                <Row title="Thriller Movies" fetchUrl={requests.fetchThrillerMovies} />
                <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
            </div>
        );
    }
}

export default Main;
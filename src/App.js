import React from 'react';
import logo from './logo.svg';
import './App.css';
import Row from './Row';
import requests from "./requests";
import Banner from "./Banner"
import Nav from './Nav';

//api key = 94608ba3c308eeddd6e7430bdb6d12a1
//example api request = https://api.themoviedb.org/3/movie/550?api_key=94608ba3c308eeddd6e7430bdb6d12a1

function App() {
  return (
    <div className="app">
      <h1>hello</h1>

      <Nav/>
      <Banner />

      <Row title="Netflix originals" fetchUrl={requests.fetchNetflixOriginals }  isLargeRow = {true}/>
      <Row title="trending now" fetchUrl={requests.fetchTrending}/>
      <Row title="top rated" fetchUrl={requests.fetchTopRated}/>
      <Row title="action" fetchUrl={requests.fetchActionMovies}/>
      <Row title="comedy" fetchUrl={requests.fetchComedyMovies}/>
      <Row title="horror" fetchUrl={requests.fetchHorrorMovies}/>
      <Row title="romance" fetchUrl={requests.fetchRomanceMovies}/>
      <Row title="docu" fetchUrl={requests.fetchDocumentaries}/>

    </div>  
  );
}

export default App;

import React, { useState,useEffect } from 'react'
import axios from './axios'
import requests from './requests'
import "./Banner.css"

function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(
                request.data.results[ 
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
            //console.log(request.data.results[            Math.floor(Math.random() * request.data.results.length - 1)]);//we just want one, in oreder to randomly select one  use
            //Math.floor(Math.random() * request.data.results.length - 1)
        } 
        fetchData();
    }, []);
    //test if async function is working
    console.log(movie)


    //truncate function. from stack overflow
    function truncate(str,n){
        return str?.length > n ? str.substr(0,n - 1) + "..." : str;
    }



    return (
        <header className="banner"
            style={{
                backgroundSize:"cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition:"center center",
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {/* some apis give you inconsistent content,
                    so if movie title doesnt exist tserach .name ... */}
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">play</button>
                    <button className="banner__button">my list</button>

                </div>
                <h1 className="banner__description">
                    {/* movie?.overview */}
                    {truncate(movie?.overview, 150)}
                </h1>

            </div>
            {/* title */}
            {/* div, 2 buttons */}
            {/* description */}
            

            {/* empty div,
            in BEM -- is a modifier */}
            <div className="banner--fadeBottom"/>
        </header>
    )
}

export default Banner

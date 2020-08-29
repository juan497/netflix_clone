import React,{useState,useEffect} from 'react'
import axios from "./axios";//if you have a defalut eport, you can rename variable more on 51:00:00 in netflix video
import request from './requests';
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";
function Row({title, fetchUrl, isLargeRow}) {
    const [movies,setMovies] = useState([])
    const [trailerUrl,setTrailerUrl] = useState("");
    
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };
    useEffect(()=>{
        //pull info(image) from tdm

        //make async call, because making request to outside service it will take like half a sec,
        //so to run a asyn cunction in use effect you write internal function and than call
        async function fetchData(){
            //await, when make this request, wait for promise(ansewer) to come back, and than do something
            const request =  await axios.get(fetchUrl);
            //console.log(request);//to see the data structure that you get back, look at object than data.results
            setMovies(request.data.results);
            return request;
        }
        fetchData();


    },[fetchUrl]);//blank, run ounce when row loads and dont run again
    //fectchUrl is a dependancy,  it being used outside of use effect , 

    // remeber,Row is inside of a map function
    const handleClick = (movie) => {
        if(trailerUrl){//if already click set it empty to close
            setTrailerUrl('');
        }else{
            movieTrailer(movie?.name || "")
            .then((url) =>{//then is a promise
                
                //the bottom is the url
                //https://www.youtube.com/watch?v=p3pDJoO7pSs
                //all we need is p3pDJoO7pSs, the id
                
                const urlParans = new URLSearchParams( new URL(url).search);
                setTrailerUrl( urlParans.get("v") );

            })
            .catch((error) => console.log(error));
            
        }
    }

    //console.log(movies);
    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">

                {/*look at <img key,  remeber, react has a key that just needs unique info for each pic, so that react doesnt rerender the entire row
                but rather it renders what it needs   */}

                {movies.map(movie =>(
                    //poster path = "/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg" (not a url)
                    //so need a base url (look at top of Row.js) to concat with poster path,
                    //sonny new the base url from api docs

                    // `  ${}  `  is called string interpolation (javascript feture)
                 <img 
                 key={movie.id} 
                 onClick = {() => handleClick(movie)}
                 className ={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                   src={` ${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path }`} 
                   alt={movie.name}/>   
                
                ))}
            </div>

            {/* <YouTube videoId={"p3pDJoO7pSs"} opts={opts}/>  */}
            {/* we only want to show when we click pic */}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/> }
        </div>
    )
}

export default Row

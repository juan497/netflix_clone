//this file is for requests
//every single repqest is fonna have the same statring url

import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

//instance.get('/foo') -> https://api.themoviedb.org/3/foo

export default instance;
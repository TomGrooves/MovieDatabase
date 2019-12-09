const MOVIE_ENDPOINT ="https://api.themoviedb.org/3/"
const MOVIE_ENDPOINT_FIND = "https://api.themoviedb.org/3/search/movie&"
const MOVIE_KEY ="7edb637499f19f042190fdac6c5ae5c3";
const MOVIE_IMAGE_ENDPOINT = "https://image.tmdb.org/t/p/w500/"


async function getData(param) 
{
    fetch(param) 
    .then(response => response.json()) 
    .then(data => {
 	dataset = data;
        logDataset(dataset); 
    });
}

function logDataset(data){
    console.log(data);
   // insert(createImgCont(data.poster_path, data.id));
}
const search = document.getElementById("search");
const input = document.getElementById("inputemail");
const container = document.getElementById("movie-container");
const searchcontainer = document.getElementById("movie-searchable");
let modal = document.getElementById("modal");
let savedData;
const key ="7edb637499f19f042190fdac6c5ae5c3";


async function getData(param) 
{
    fetch(param) 
    .then(response => response.json()) 
    .then(data => {
     dataset = data;
        logDataset(dataset);
    });
}

async function getModalData(param) 
{
    fetch(param) 
    .then(response => response.json()) 
    .then(data => {
     dataset = data;
     console.log(dataset);
     insert(modal, createModalContent(dataset.poster_path, dataset.title, dataset.overview, dataset.release_date));
    });
}

function logDataset(data){
    savedData = data;
    insertImages(savedData);
}

function insertImages(data){
    console.log(data);
     for (var i = 0; i < data.results.length; i++){
         if (!data.results[i].poster_path == ""){
         insert(container, createImgCont(data.results[i].poster_path, data.results[i].id, data.results[i].title, data.results[i].vote_average));
         }
     }
}

function createImgCont(imageUrl, id, name, rating){
    const tempDiv = document.createElement("div");
    tempDiv.classList.add("imagecontainer");
    tempDiv.setAttribute('id', id);
    const movieElm = `<img src="https://image.tmdb.org/t/p/w500/${imageUrl}" alt="" data-movie-id="${id}">`;
    const titleElm = `<h4 class="title">${name}</h4>`
    const ratingElm = `<h5 class="rating">Rating: ${rating}</h5>`
    const btnElm = `<span class="readmore" onclick="openModal(this)">Read more</span>`
    tempDiv.innerHTML = titleElm + movieElm +ratingElm + btnElm;
    return tempDiv;
}

function createModalContent(imageUrl, name, overview, release){
    clearModal();
    const tempDiv = document.createElement("div");
    tempDiv.classList.add("modalcontent");
    tempDiv.setAttribute('id', "modalcontent");
    const movieElm = `<img src="https://image.tmdb.org/t/p/w500/${imageUrl}">`;
    const titleElm = `<h4 class="title">${name}</h4>`
    const descElm = `<h5 class="overview">Description:</h5><br><p>${overview}</p>`
    const releaseElm = `<h5 class="overview">Release date: ${release}</h5>`
    const closeElm = `<span class="close" onclick="closeModal()">X</span>`
    console.log("created all modal content");
    tempDiv.innerHTML = movieElm + titleElm + descElm + releaseElm + closeElm ;
    return tempDiv;
}

function clearModal(){
    modal.innerHTML = "";
}

function insert(dest,elm){
    dest.append(elm);
}

function searchData(){
    resetCanvas();
        let searchTarget = input.value;
        console.log(searchTarget); 
        let urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchTarget}`
        getData(urlSearch);
}

function resetInput(){
    input.value = "";
}

function resetCanvas(){
    container.innerText = "";
}

function closeModal(){
console.log("closing sir!")
    if (modal.style.display == "block"){
        modal.style.display = "none";
    }
}

var parentDiv

function openModal(elem){
parentDiv = elem.parentNode;
var id = parentDiv.getAttribute("id");
var idUrl =  `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`
console.log(id)

    if (modal.style.display == "none"){
        modal.style.display = "block";
        getModalData(idUrl);
    }
}

function start(){
    let somemodal = document.getElementById("modal");
    somemodal.style.display = "none";
}

start();
const search = document.getElementById("search");
const input = document.getElementById("inputemail");
const container = document.getElementById("movie-container");
const searchcontainer = document.getElementById("movie-searchable");
const maincontainer = document.getElementById("container");
let modal = document.getElementById("modal");
let loading = document.getElementById("loading");
let blocker = document.getElementById("blocker");
let savedData;
let pagenr = 1;
let parentDiv;
let rdy = true;
let doneLoading = false;

function createImgCont(imageUrl, id, name, rating){
    const tempDiv = document.createElement("div");
    tempDiv.classList.add("imagecontainer");
    tempDiv.setAttribute('id', id);
    tempDiv.setAttribute("onclick", "openModal(this)");

if (imageUrl){
    if (imageUrl.includes("/")){
     //   const movieElm = `<img src="https://image.tmdb.org/t/p/w500${imageUrl}" alt="movie${id}" data-movie-id="${id}">`;
     let movieElm = document.createElement("div");
     movieElm.classList.add("movieposter");
    insert(movieElm, tempDiv);
     tempDiv.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${imageUrl}')`;
    // tempDiv.innerHTML = movieElm;
        //tempDiv.style.background = `https://image.tmdb.org/t/p/w500${imageUrl}`;
        return movieElm;
        }
    }
}

function createModalContent(name, overview, release, videokey, runtime, actors, producer, rating){
    const tempDiv = document.createElement("div");
    tempDiv.classList.add("modalcontent");
    tempDiv.setAttribute('id', "modalcontent");
    
    const closeElm = `<span class="close" onclick="closeModal()">X</span>`;
    if (!name == "") {titleElm = `<h4 class="title">${name}</h4>`;}
    if (!overview == "") {descElm = `<div class="descrip"><h4>Description:</h4><p>${overview}</p></div>`;}
    if (!release == "") {releaseElm = `<div class="release"><h4>Release date:</h4><p> ${release}</p><br><h4 class="runtime">Runtime:</h4><p>${runtime} min</p></div>`;}
    if (!videokey == "") {iframeElm = `<iframe class="tube" src="https://www.youtube.com/embed/${videokey}"></iframe>`;}
    if (!actors == "") {actorsElm = `<div class="actor actorwrapper"><h4>Actors: </h4><p>${setupActors(actors)}</p></div>`;}
    if (!producer == ""){producerElm =`<div class="producer"><h4>Producer:</h4><p>${producer}<p></div>`}
    if (!rating == "") {ratingElm = `<div class="rating"><h4>Rating</h4> <p>${rating}/10</p></div>`;}
    console.log("created all modal content");
    tempDiv.innerHTML = titleElm + descElm + releaseElm + iframeElm  + actorsElm + closeElm + ratingElm + producerElm;
    return tempDiv;
}

function setupActors(actors){
    let holder = "";
    for (let y = 0; y < 5; y++){
        if (actors[y]){
        let thisActor = `<div class="actor">${actors[y].name} as ${actors[y].character}</div>`
        holder += thisActor;
        }
    }
    return holder; 
}

function clearModal(){
    modal.innerHTML = "";
}

function insert(dest,elm){
    dest.append(elm);
}

function searchData(){
   if (doneLoading){

    clearScreen(); 
   let searchTarget = input.value;
        let dataArr = getAllData()
        for (var i = 0; i < dataArr.length; i++){
            for (var x = 0; x < dataArr[i].length; x++){
            if (dataArr[i][x].title.toLowerCase().includes(searchTarget.toLowerCase())){
             insert(container, createImgCont(dataArr[i][x].poster_path, dataArr[i][x].id, dataArr[i][x].title, dataArr[i][x].vote_average));
            } 
            else{
                console.log("not found");
            }
        }
        } 
    }
}

function fetchAllChristmasMovies(){

if (localStorage.getItem('ChristmasMovies')){
    console.log("Data loaded from local storage");
    getAllData();
    loading.style.display = "none";
    doneLoading = true;
}
else{
    setTimeout(function () {
        if (pagenr < 67) {           
            let urlTest = `http://api.themoviedb.org/3/discover/movie?api_key=${key}&with_keywords=207317&page=${pagenr}`;
            getData(urlTest)
            pagenr++;
            console.log(pagenr);
            fetchAllChristmasMovies();
        }
        if (pagenr >= 67){
            doneLoading = true;
            loading.style.display = "none";
            getAllData();
        }
        }, 255)
    }
}

function resetInput(){
    input.value = "";
}

function clearScreen(){
    container.innerText = "";
    if (document.getElementById("top-movies")){
        removeElement("top-movies");
    }
}

function closeModal(){
    clearModal();
    if (modal.style.display == "block"){
        modal.style.display = "none";
        blocker.style.display = "none";
    }
}

function openModal(elem){
var id = elem.getAttribute("id");
var idUrl =  `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&append_to_response=videos,credits`

    if (modal.style.display == "none"){
        modal.style.display = "block";
        blocker.style.display = "block";
        getModalData(idUrl);
    }
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function start(){
    let somemodal = document.getElementById("modal");
    somemodal.style.display = "none";
    blocker.style.display = "none";
    fetchAllChristmasMovies();
    if (doneLoading){
        displayTopMovies();
    }
}

function displayTopMovies(){
    dataArr = getAllData();
    let temp = document.createElement("div");
    temp.setAttribute("id", "top-movies");
    let headline = `<h2 class="top-movies">Most popular: </h2>`;
    temp.innerHTML = headline;
    maincontainer.prepend(temp);
    for (var i = 0; i < dataArr.length; i++){
        for (var x = 0; x < dataArr[i].length; x++){
            if (dataArr[i][x].popularity >= 30.000){
            insert(container, createImgCont(dataArr[i][x].poster_path, dataArr[i][x].id, dataArr[i][x].title, dataArr[i][x].vote_average));
            }
            else{
                console.log("not found");
            }
        }
    }
}
//dataArr[i][x].vote_average >= 9.5 || dataArr[i][x].vote_count >= 8000

start();



// TEST STUFF
let testArr = ["some", "man", "named", "arthur"];
let myTarget1 = "some";
let myTarget2 = "man";

function findInArray(arr, target){
y = target;
result = arr.find(x => x == y);
return result;}
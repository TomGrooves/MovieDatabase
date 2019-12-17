// Declare all the variables needed
const search = document.getElementById("search");
const input = document.getElementById("inputemail");
const container = document.getElementById("movie-container");
const searchcontainer = document.getElementById("movie-searchable");
const maincontainer = document.getElementById("container");
let modal = document.getElementById("modal");
let loading = document.getElementById("dirboard");
let boardanim = document.getElementById("boardanim");
let loadtext = document.getElementById("loadtext");
let blocker = document.getElementById("blocker");
let savedData;
let pagenr = 1;
let parentDiv;
let rdy = true;
let doneLoading = false;

// Creates the image content.
function createImgCont(imageUrl, id){
    const tempDiv = document.createElement("div");
    tempDiv.classList.add("imagecontainer");
    tempDiv.setAttribute('id', id);
    tempDiv.setAttribute("onclick", "openModal(this)");

    // Checks if there is an imageUrl, else dont insert that title
if (imageUrl){
    if (imageUrl.includes("/")){
     let movieElm = document.createElement("div");
     movieElm.classList.add("movieposter");
    insert(movieElm, tempDiv);
     tempDiv.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${imageUrl}')`;
        return movieElm;
        }
    }
}

// Create the modal content by taking name, description, videokey, runtime, actors, producers and rating. 
// Appends these elements to a div and returns it. 
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

// Loops through the first 5 actors, and returns them in a div. 
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

// Clear modal
function clearModal(){
    modal.innerHTML = "";
}

// Appends whatever to whatever.
function insert(dest,elm){
    dest.append(elm);
}

// Search through all data in the array and look for the target search word with includes. 
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

//Get local storage and if localstorage is not set, then 
//loop through each page and add those 20 results to the array.
//once done, save all data.  
function fetchAllChristmasMovies(){

if (localStorage.getItem('ChristmasMovies')){
    console.log("Data loaded from local storage");
    getAllData();
    loading.style.display = "none";
    doneLoading = true;
    runCurtainAnim();
}
else{
    setTimeout(function () {
        if (pagenr < 67) {           
            let urlTest = `http://api.themoviedb.org/3/discover/movie?api_key=${key}&with_keywords=207317&page=${pagenr}`;
            getData(urlTest)
            pagenr++;
            console.log(pagenr);
            result = Math.round(getPct(pagenr, 67));
            loadtext.innerText = "Loading " + result + "%";
            fetchAllChristmasMovies();
        }
        if (pagenr >= 67){
            doneLoading = true;
            getAllData();
            setTimeout(() => {
                loading.style.display = "none";
                displayTopMovies();
            }, 1500);
        }
        }, 255)
    }
}

// Reset input value
function resetInput(){
    input.value = "";
}

// Clear screen by removing everything in container
function clearScreen(){
    container.innerText = "";
    if (document.getElementById("top-movies")){
        removeElement("top-movies");
    }
}

// Close modal
function closeModal(){
    clearModal();
    if (modal.style.display == "block"){
        modal.style.display = "none";
        blocker.style.display = "none";
    }
}

// Open modal, upon opening, gets the ID of the element clicked and sends that 
// with a fetch to get the modal content for that particular movie
function openModal(elem){
var id = elem.getAttribute("id");
var idUrl =  `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&append_to_response=videos,credits`

    if (modal.style.display == "none"){
        modal.style.display = "block";
        blocker.style.display = "block";
        getModalData(idUrl);
    }
}

// Removes an element from the document
function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

// Start runs once every time the page is refreshed
function start(){
    let somemodal = document.getElementById("modal");
    somemodal.style.display = "none";
    blocker.style.display = "none";
    fetchAllChristmasMovies();
    if (doneLoading){
        displayTopMovies();
    }
}

// Loop through the entire array and get all movies 
// with more then 30k popularity (eg. the most popular movies).
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

function runCurtainAnim(){
    let left = document.getElementById("leftside");
    let right = document.getElementById("rightside");

    boardanim.style.animationPlayState = "running";    
    
        left.style.animationPlayState = "running";
        right.style.animationPlayState = "running";
}

function getPct(param, max){
    var pct = (param/max) * 100;
    return pct;
}

/* 
let result = getPct(6.6, 66);
console.log(result + "%"); */

// Run start on startup.
start();
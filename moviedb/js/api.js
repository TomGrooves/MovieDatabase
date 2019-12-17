const key ="7edb637499f19f042190fdac6c5ae5c3";
let arrConst = [];

// Function to fetch the data from the url the function takes as a parameter
async function getData(param) 
{
    fetch(param) 
    .then(response => response.json()) 
    .then(data => {
     dataset = data;
        saveAllData(dataset);
    });
}

// Function to fetch all data about a specific title for modal data.
async function getModalData(param) {
    fetch(param) 
    .then(response => response.json()) 
    .then(data => {
     dataset = data;
    
if (dataset.videos.results[0] == null){
        
    if (dataset.credits.crew[0] == null){
    insert(modal, 
        createModalContent(dataset.title, dataset.overview, dataset.release_date, "no-key", dataset.runtime, dataset.credits.cast, "No producer", dataset.vote_average));    
}
    else{
     insert(modal, 
        createModalContent(dataset.title, dataset.overview, dataset.release_date, "no-key", dataset.runtime, dataset.credits.cast, dataset.credits.crew[0].name, dataset.vote_average));

    }
}

else if (dataset.credits.crew[0] == null){
        insert(modal, 
            createModalContent(dataset.title, dataset.overview, dataset.release_date, dataset.videos.results[0].key, dataset.runtime, dataset.credits.cast, "No producer", dataset.vote_average));    
     }

     else{
        insert(modal, 
            createModalContent(dataset.title, dataset.overview, dataset.release_date, dataset.videos.results[0].key, dataset.runtime, dataset.credits.cast, dataset.credits.crew[0].name, dataset.vote_average));
     }
    });
}

// Function to save all data to localstorage after it has been loaded first time.
function saveAllData(data){
    arrConst.push(data.results);
    if (doneLoading){
        console.log("Setting local storage item");
        runCurtainAnim();
        localStorage.setItem('ChristmasMovies', JSON.stringify(arrConst));
    }
}

// Function to load all saved data from localstorage and return it back to whatever called it.
function getAllData(){
    var allData = JSON.parse(localStorage.getItem('ChristmasMovies'));
    console.log(allData);
    return allData;
}

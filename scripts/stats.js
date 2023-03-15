console.log("Stats");

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

fetch(urlApi)
    .then(response => response.json())
    .then(data => {

        console.log(data.currentDate);
    })
    .catch(error => {
        console.log(`Mi error: ${error}`);
    })

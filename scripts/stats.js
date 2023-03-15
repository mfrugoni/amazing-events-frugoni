console.log("Stats");

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

//Function that filters and sorts the existing categories:
function filterArrayCat(dataArray){

    let aECategoriesArray = [];

    dataArray.forEach(event => {
        if (!aECategoriesArray.includes(event.category)) {
            aECategoriesArray.push(event.category)
        }
    })

    return aECategoriesArray.sort();
}

function attPercentaje(event){
    return Math.round(event.assistance * 100 / event.capacity); 
}


fetch(urlApi)
    .then(response => response.json())
    .then(data => {

        let bufferEvents = data.events.map((evento) => evento);
        console.log("buffer events", bufferEvents);

        let bufferDate = data.currentDate;
        console.log("buffer date", bufferDate);

        let categories = filterArrayCat(bufferEvents);

        let pastEvents = bufferEvents.filter((event) => event.date < bufferDate);

        let futureEvents = bufferEvents.filter((event) => event.date >= bufferDate);
 


 


    })
    .catch(error => {
        console.log(`Mi error: ${error}`);
    })

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

function orderLowAtt(a, b) {
    if (a.percentageOfAtt < b.percentageOfAtt){return -1;}
        
    if (a.percentageOfAtt > b.percentageOfAtt){return 1;}
        
    return 0;
}
function orderHiAtt(a, b) {
    if (a.percentageOfAtt > b.percentageOfAtt){return -1;}
        
    if (a.percentageOfAtt < b.percentageOfAtt){return 1;}
        
    return 0;
}
function orderCapacity(a, b){
    if (a.capacity > b.capacity){return -1;}
        
    if (a.capacity < b.capacity){return 1;}
        
    return 0;
}


fetch(urlApi)
    .then(response => response.json())
    .then(data => {

        console.log(data.events);

        let categories = filterArrayCat(data.events);

        let pastEvents = data.events.filter((event) => event.date < data.currentDate);

        let futureEvents = data.events.filter((event) => event.date >= data.currentDate);
        
        //Adds the property Percentage of attendance t the obj in pastEvents array:
        pastEvents.forEach((event) => {
            event.percentageOfAtt = (event.assistance * 100 / event.capacity).toFixed(2);
        })
        console.log("past ", pastEvents);

        //Array sorted hi to low:
        let eventsOrderHigh = pastEvents.map((event) => event);
        eventsOrderHigh.sort(orderHiAtt);
        console.log("high", eventsOrderHigh);

        //Array sorted low to hi:
        let eventsOrderLow = pastEvents.map((event) => event);
        eventsOrderLow.sort(orderLowAtt);
        console.log("low", eventsOrderLow);

        let eventsOrderCapacity = pastEvents.map((event) => event);
        eventsOrderCapacity.sort(orderCapacity);
        console.log("cap", eventsOrderCapacity);

 

    })
    .catch(error => {
        console.log(`Mi error: ${error}`);
    })

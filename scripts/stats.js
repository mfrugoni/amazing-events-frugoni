console.log("Stats");

const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";


//Function that filters and sorts the existing categories:
function filterArrayCat(dataArray) {

    let aECategoriesArray = [];

    dataArray.forEach(event => {
        if (!aECategoriesArray.includes(event.category)) {
            aECategoriesArray.push(event.category)
        }
    })

    return aECategoriesArray.sort();
}

//Order functions for sort method:
function orderLowAtt(a, b) {
    if (a.percentageOfAtt < b.percentageOfAtt) { return -1; }

    if (a.percentageOfAtt > b.percentageOfAtt) { return 1; }

    return 0;
}
function orderHiAtt(a, b) {
    if (a.percentageOfAtt > b.percentageOfAtt) { return -1; }

    if (a.percentageOfAtt < b.percentageOfAtt) { return 1; }

    return 0;
}
function orderCapacity(a, b) {
    if (a.capacity > b.capacity) { return -1; }

    if (a.capacity < b.capacity) { return 1; }

    return 0;
}

//Function that returns an array with the info needed to fill the 2nd & 3rd part of the table:
function statsByCategory(arrCategories, arrEvents) {
    let eventsByCat = [];

    for (let cat of arrCategories) {
        let totalRevenues = 0;
        let percentageSum = 0;
        let eventPercentage = 0;
        let eventCount = 0;

        let eventObj = {};
        eventObj.category = cat;

        for (let event of arrEvents) {
            if (event.category.toLowerCase() == cat.toLowerCase()) {
                totalRevenues += event.price * (event.estimate || event.assistance);
                eventPercentage = (event.percentageEst || event.percentageOfAtt);
                percentageSum += eventPercentage;
                eventCount++;
            }
        }
        eventObj.totalRevenues = totalRevenues;

        if (percentageSum != 0) {
            eventObj.mediaPercentage = (percentageSum / eventCount).toFixed(2);
        }
        else {
            eventObj.mediaPercentage = 0;
        }

        eventsByCat.push(eventObj);
    }
    return eventsByCat;
}

//Function that returns the string to asign to the elements of the 2nd & 3rd table:
function infoToRender(infoArray){
    let info = ``;
    for(let i = 0; i < infoArray.length; i++){
        info += `
        <tr class ="table-info">
            <td> ${infoArray[i].category} </td>
            <td> $ ${infoArray[i].totalRevenues} ✓ </td>
            <td> ${infoArray[i].mediaPercentage} %</td>
        </tr>
        `
    }
    return info;
}

//Loader:
let top3 = document.getElementById("top-3");
let future = document.getElementById("future");
let past = document.getElementById("past");
const loader = `<div class="loader">Loading...</div>`;
top3.innerHTML = loader;
future.innerHTML = loader;
past.innerHTML = loader;

//Asinchronic block:
fetch(urlApi)
    .then(response => response.json())
    .then(data => {

        //Filter categories:
        let categories = filterArrayCat(data.events);

        //Filter events by date:
        let pastEvents = data.events.filter((event) => event.date < data.currentDate);

        let futureEvents = data.events.filter((event) => event.date >= data.currentDate);

        //Adds the property Percentage of attendance to each event in pastEvents array:
        pastEvents.forEach((event) => {
            event.percentageOfAtt = parseFloat((event.assistance * 100 / event.capacity).toFixed(2));
        })

        //Adds the property Percentage estimated to each event in futureEvents array:
        futureEvents.forEach((event) => {
            event.percentageEst = parseFloat((event.estimate * 100 / event.capacity).toFixed(2));
        })

        //TOP Three:
        //Array sorted hi to low:
        let eventsOrderHigh = pastEvents.map((event) => event).sort(orderHiAtt);

        //Array sorted low to hi:
        let eventsOrderLow = pastEvents.map((event) => event).sort(orderLowAtt);

        //Array sorted by capacity:
        let eventsOrderCapacity = pastEvents.map((event) => event).sort(orderCapacity);

        //Compute info for the 1st table, and asign the string to the element:
        let tInfoTop3 = ``;
        const rowsToRender = 3;
        
        for(let i = 0; i < rowsToRender; i++){
            tInfoTop3 += `
            <tr class ="table">
            <td> ${eventsOrderHigh[i].name}: ${eventsOrderHigh[i].percentageOfAtt} % </td>
            <td> ${eventsOrderLow[i].name}: ${eventsOrderLow[i].percentageOfAtt} % </td>
            <td> ${eventsOrderCapacity[i].name}: ${eventsOrderCapacity[i].capacity} people </td>
            </tr>
            `
        }
        
        top3.innerHTML = tInfoTop3;

        //The same for the 2nd table:
        let futureEventsByCat = statsByCategory(categories, futureEvents);
        let upcomigInfo = infoToRender(futureEventsByCat);

        future.innerHTML = upcomigInfo;

        //And for the 3rd:
        let pastEventsByCat = statsByCategory(categories, pastEvents);
        let pastInfo = infoToRender(pastEventsByCat);

        past.innerHTML = pastInfo;

    })
    .catch(error => {
        console.log(error);
    })
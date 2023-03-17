console.log("Stats");

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";



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




fetch(urlApi)
    .then(response => response.json())
    .then(data => {

        console.log(data.events);

        let categories = filterArrayCat(data.events);
        console.log("cat", categories);

        let pastEvents = data.events.filter((event) => event.date < data.currentDate);

        let futureEvents = data.events.filter((event) => event.date >= data.currentDate);

        //Adds the property Percentage of attendance to each event in pastEvents array:
        pastEvents.forEach((event) => {
            event.percentageOfAtt = parseFloat((event.assistance * 100 / event.capacity).toFixed(2));
        })
        // console.log("past ", pastEvents);

        //Adds the property Percentage estimated to each event in futureEvents array:
        futureEvents.forEach((event) => {
            event.percentageEst = parseFloat((event.estimate * 100 / event.capacity).toFixed(2));
        })
        // console.log("fut ", futureEvents);

        //Array sorted hi to low:
        let eventsOrderHigh = pastEvents.map((event) => event);
        eventsOrderHigh.sort(orderHiAtt);
        // console.log("high", eventsOrderHigh);

        //Array sorted low to hi:
        let eventsOrderLow = pastEvents.map((event) => event);
        eventsOrderLow.sort(orderLowAtt);
        // console.log("low", eventsOrderLow);

        //Array sorted by capacity:
        let eventsOrderCapacity = pastEvents.map((event) => event);
        eventsOrderCapacity.sort(orderCapacity);
        // console.log("cap", eventsOrderCapacity);

        //UPCOMING EVENTS stats by category:
        let futureEventsByCat = [];

        for (let cat of categories) {
            let totalRevenues = 0;
            let percentageSum = 0;
            let eventCount = 0;

            let eventObj = {};
            eventObj.category = cat;

            for (let event of futureEvents) {
                if (event.category.toLowerCase() == cat.toLowerCase()) {
                    totalRevenues += event.price * event.estimate;
                    percentageSum += event.percentageEst; 
                    eventCount ++;

                    // console.log("adentro", percentageSum);
                }
            }
            // console.log("afuera", percentageSum);
            eventObj.totalRevenues = totalRevenues;

            if(percentageSum != 0){
                eventObj.mediaPercentage = (percentageSum / eventCount).toFixed(2);
            }
            else{
                eventObj.mediaPercentage = 0;
            }

            futureEventsByCat.push(eventObj);
        }
        console.log("futureEventsByCat: ", futureEventsByCat);


        //PAST EVENTS stats by category:
        let pastEventsByCat = [];

        for (let cat of categories) {
            let totalRevenues = 0;
            let percentageSum = 0;
            let eventCount = 0;

            let eventObj = {};
            eventObj.category = cat;

            for (let event of pastEvents) {
                if (event.category.toLowerCase() == cat.toLowerCase()) {
                    totalRevenues += event.price * event.assistance;
                    percentageSum += event.percentageOfAtt; 
                    eventCount ++;

                    // console.log("adentro", percentageSum);
                }
            }
            // console.log("afuera", percentageSum);
            eventObj.totalRevenues = totalRevenues;

            if(percentageSum != 0){
                eventObj.mediaPercentage = (percentageSum / eventCount).toFixed(2);
            }
            else{
                eventObj.mediaPercentage = 0;
            }

            pastEventsByCat.push(eventObj);
        }
        console.log("pastEventsByCat: ", pastEventsByCat);



        let tHead = `<table>
        <thead>
            <tr class="top">
                <th colspan="3">Events Statistics</th>
            </tr>
        </thead>
        `

        let tBodyHeaders1 = `<tbody id="stats">
            <tr class="heading">
                <th>Events with the highest percentage of attendance</th>
                <th>Events with the lowest percentage of attendance</th>
                <th>Events with larger capacity</th>
            </tr>
        `

        let tInfoTop3;
        
        for(let i = 0; i < 3; i++){
            tInfoTop3 += `
            <tr>
            <td> ${eventsOrderHigh[i].name}: ${eventsOrderHigh[i].percentageOfAtt} % </td>
            <td> ${eventsOrderLow[i].name}: ${eventsOrderLow[i].percentageOfAtt} % </td>
            <td> ${eventsOrderCapacity[i].name}: ${eventsOrderCapacity[i].capacity} people </td>
            </tr>
            `
        }



        let table = ` 
            <tr class="top">
                <th colspan="3">Upcoming events statistics by category</th>
            </tr>

            <tr class="heading">
                <th>Categories</th>
                <th>Revenues</th>
                <th>Percentage of attendance</th>
            </tr>
            <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
            </tr>
            <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
            </tr>
            <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
            </tr>
            <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
            </tr>
            <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
            </tr>
            <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
            </tr>
            <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
            </tr>

            <tr class="top">
                <th colspan="3">Past events statistics by category</th>
            </tr>

            <tr class="heading">
                <th>Categories</th>
                <th>Revenues</th>
                <th>Percentage of attendance</th>
            </tr>
            <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
            </tr>
            <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
            </tr>
            <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
            </tr>
            <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
            </tr>
            <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
            </tr>
            <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
            </tr>
            <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
            </tr>
        </tbody>
    </table>`


    let box = document.getElementById("box");
    box.innerHTML = tHead + tBodyHeaders1 + tInfoTop3 +  table;

    })
    .catch(error => {
        console.log(`Mi error: ${error}`);
    })

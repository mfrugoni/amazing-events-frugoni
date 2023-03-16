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


        let table = ` <table>
        <thead>
            <tr class="top">
                <th colspan="3">Events Statistics</th>
            </tr>
        </thead>
        <tbody id="stats">
            <tr class="heading">
                <th>Events with the highest percentage of attendance</th>
                <th>Events with the lowest percentage of attendance</th>
                <th>Events with larger capacity</th>
            </tr>
            <tr>
                <td> ${eventsOrderHigh[0].name}: ${eventsOrderHigh[0].percentageOfAtt} % </td>
                <td> ${eventsOrderLow[0].name}: ${eventsOrderLow[0].percentageOfAtt} % </td>
                <td> ${eventsOrderCapacity[0].name}: ${eventsOrderCapacity[0].capacity} people </td>
            </tr>
            <tr>
                <td> ${eventsOrderHigh[1].name}: ${eventsOrderHigh[1].percentageOfAtt} % </td>
                <td> ${eventsOrderLow[1].name}: ${eventsOrderLow[1].percentageOfAtt} % </td>
                <td> ${eventsOrderCapacity[1].name}: ${eventsOrderCapacity[1].capacity} people </td>
            </tr>
            <tr>
                <td> ${eventsOrderHigh[2].name}: ${eventsOrderHigh[2].percentageOfAtt} % </td>
                <td> ${eventsOrderLow[2].name}: ${eventsOrderLow[2].percentageOfAtt} % </td>
                <td> ${eventsOrderCapacity[2].name}: ${eventsOrderCapacity[2].capacity} people </td>
            </tr>

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
        </tbody>
    </table>`

    // console.log(table);
    let box = document.getElementById("box");
    box.innerHTML = table;

    })
    .catch(error => {
        console.log(`Mi error: ${error}`);
    })

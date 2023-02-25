console.log("Upcoming Events");

//Declaration of the arrays where past and future events will be stored:
let pastEvents = [];
let futureEvents = [];

//Function that filters past and future events based on currentDate:
function filterEvents(dataArray) {

    for (let event of dataArray) {
        if (event.date < data.currentDate) {
            pastEvents.push(event);
        }
        else if (event.date >= data.currentDate) {
            futureEvents.push(event);
        }
    }
}

//Function that creates the card templates in string format:
function createCards(dataArray) {
    let cardString = ``;
    for (let event of dataArray) {
        cardString += `<div class="card">
    <img src="${event.image}">
    <h3>${event.name}</h3>
    <p>Date: ${event.date}</p>
    <p>Description: ${event.description} </p>
    <div class="card-foot">
        <p>Price: ${event.price}</p>
        <a href="./details.html">More...</a>
    </div>
</div>
`
    }
    return cardString;
}

//Function call to filter the events:
filterEvents(data.events);
// console.log(futureEvents)
//Capture the html element where we want to put the cards:
const box = document.getElementById("box");
//Create the cards and put them inside the captured element:
box.innerHTML = createCards(futureEvents);



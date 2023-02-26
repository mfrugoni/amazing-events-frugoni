console.log("Index");

//Function that creates the card templates in string format:
function createCards(dataArray) {
    let cardString = ``;

    for (let event of dataArray) {
        cardString += `<div class="card">
    <img src="${event.image}">
    <h3>${event.name}</h3>
    <p class="date">Date: ${event.date}</p>
    <p class="desc">${event.description}</p>
    <div class="card-foot">
        <p>Price: ${event.price}</p>
        <a href="./details.html">More...</a>
    </div>
</div>
`
    }
    return cardString;
}

// console.log(createCards(data.events));
//Capture the html element where we want to put the cards:
const box = document.getElementById("box");
//Create the cards and put them inside the captured element:
box.innerHTML = createCards(data.events);
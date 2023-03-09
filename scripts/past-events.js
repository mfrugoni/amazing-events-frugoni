console.log("Past Events");

//----Cards----//
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

    if (dataArray.length > 0) {
        for (let event of dataArray) {
            cardString += `<div class="card">
    <img src="${event.image}">
    <h3>${event.name}</h3>
    <p class="date">Date: ${event.date}</p>
    <p class="desc">${event.description}</p>
    <div class="card-foot">
        <p>Price: $${event.price}.-</p>
        <a href="./details.html?id=${event._id}">More...</a>
    </div>
</div>
`
        }
    }
    else {
        cardString += `<p>We are sorry. Your search 🔭 did not return any results.😢 
        Please try again with other information 😎 Or... you can visit 
        <a href="./upcoming-events.html">THIS</a> awesome events we got for you!</p>`
    }
    return cardString;
}


//Function call to filter the events:
filterEvents(data.events);

//Capture the html element where we want to put the cards:
const box = document.getElementById("box");
//Create the cards and put them inside the captured element:
box.innerHTML = createCards(pastEvents);

//----Categories----//
//Creates an array of categories iterating data.events:
let arrCategory = [];

for(let event of data.events){
  arrCategory.push(event.category)
}

//Iterates the categories array and saves the non-repeating categories in a new array:
let aECategoriesArray = [];

arrCategory.forEach(category =>{
  if (!aECategoriesArray.includes(category)){
    aECategoriesArray.push(category)
  }
})
//Sorts the resulting array
aECategoriesArray.sort()

//Creates the checkboxes by passing the resulting array to the function create:
function createCategoriesCheckBox(categoriesArray){
    let categoriesString = "";
    for (const category of categoriesArray){
        categoriesString += `
    <div>
        <input type="checkbox" name="category" id="${category.toLowerCase()}" value="${category.toLowerCase()}">
        <label for="${category.toLowerCase()}">${category}</label>
    </div> `
    }
    return categoriesString;
}

const form = document.querySelector(".category");
form.innerHTML = createCategoriesCheckBox(aECategoriesArray);

//----Search----//
const searchBar = document.getElementById("search-bar")

let searchBarEvents = [];

let checkedCats = [];

let searchCheckedEvents = [];

let bufferEvents = [];

//----Search input----//

searchBar.addEventListener("keyup", () => {

    if (checkedCats.length == 0) {
        searchBarEvents = pastEvents.filter((evento) =>
            evento.name.toLowerCase().includes(searchBar.value.toLowerCase()))
    }
    else {

        searchBarEvents = bufferEvents.filter((evento) =>
            evento.name.toLowerCase().includes(searchBar.value.toLowerCase()))

    }

    box.innerHTML = createCards(searchBarEvents);
})

//---Checkboxes---//

form.addEventListener("click", (e) => {
    if (e.target.checked != undefined) {
        if (e.target.checked) {
            checkedCats.push(e.target.value)
        }
        else {
            let index = checkedCats.indexOf(e.target.value)
            if (index != -1) {
                checkedCats.splice(index, 1)
                
            }
        }
    }
    let checkedEvents = [];

    for (let cat of checkedCats) {
        for (let event of pastEvents) {

            if (event.category.toLowerCase().includes(cat)) {

                checkedEvents.push(event);

            }
        }
    }

    if (searchBar.value == 0) {
        
        box.innerHTML = createCards(checkedEvents);

    }
    else {
        searchCheckedEvents = checkedEvents.filter((evento) =>
            evento.name.toLowerCase().includes(searchBar.value.toLowerCase()))

            box.innerHTML = createCards(searchCheckedEvents);
    }

    bufferEvents = checkedEvents.map((evento) => evento);

    if(checkedCats.length === 0){

        box.innerHTML = createCards(pastEvents);

    }

})

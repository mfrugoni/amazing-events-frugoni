console.log("Upcoming Events");

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
    for (let event of dataArray) {
        cardString += `<div class="card">
    <img src="${event.image}">
    <h3>${event.name}</h3>
    <p class="date">Date: ${event.date}</p>
    <p class="desc">${event.description}</p>
    <div class="card-foot">
        <p>Price: ${event.price}</p>
        <a href="./details.html?id=${event._id}">More...</a>    </div>
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

//----Categories----//
//Creates an array of categories iterating data.events:
let arrCategory = [];

for(let event of data.events){
  arrCategory.push(event.category)
}
// console.log(`arrCategory ${arrCategory}`);
//Iterates the categories array and saves the non-repeating categories in a new array:
let aECategoriesArray = [];

arrCategory.forEach(category =>{
  if (!aECategoriesArray.includes(category)){
    aECategoriesArray.push(category)
  }
})
//Sorts the resulting array
aECategoriesArray.sort()

// console.log(`aECategoriesArray:  ${aECategoriesArray}`)

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
// console.log(createCategoriesCheckBox(aECategoriesArray));

//search input//
const cardSearch = document.getElementById("card-search")

cardSearch.addEventListener("keyup", () =>{

    let filteredEvents = futureEvents.filter((evento) => 
    evento.name.toLowerCase().includes(cardSearch.value.toLowerCase()))
    
    box.innerHTML = createCards(filteredEvents);
})


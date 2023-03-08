console.log("Index");
console.log([document]);

//----Cards----//
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
        cardString += `<p>🔭We're sorry, but your search didn't match any result. 
    Please try again with different search keys.</p>
    `
    }
    return cardString;
}

// console.log(createCards(data.events));
//Capture the html element where we want to put the cards:
const box = document.getElementById("box");
//Create the cards and put them inside the captured element:
box.innerHTML = createCards(data.events);

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
// console.log(createCategoriesCheckBox(aECategoriesArray));

//----Search input----//
const searchBar = document.getElementById("search-bar")

let searchBarEvents = [];

let checkedCats = [];

let searchCheckedEvents = [];

let bufferEvents = [];

searchBar.addEventListener("keyup", () => {

    if (checkedCats.length == 0) {
        searchBarEvents = data.events.filter((evento) =>
            evento.name.toLowerCase().includes(searchBar.value.toLowerCase()))
    }
    else {
        console.log("buffer", bufferEvents);
        searchBarEvents = bufferEvents.filter((evento) =>
            evento.name.toLowerCase().includes(searchBar.value.toLowerCase()))
            console.log("searchbarev", searchBarEvents);
    }

    box.innerHTML = createCards(searchBarEvents);
})

form.addEventListener("click", (e) => {//ok
    if (e.target.checked != undefined) {
        if (e.target.checked) {
            checkedCats.push(e.target.value)
        }
        else {
            let index = checkedCats.indexOf(e.target.value)
            if (index != -1) {
                checkedCats.splice(index, 1)
                console.log("checkout");
                
            }
        }
    }
    let checkedEvents = [];
    console.log(checkedCats);
    console.log("1", checkedEvents);
    for (let cat of checkedCats) {
        for (let event of data.events) {

            if (event.category.toLowerCase().includes(cat)) {

                checkedEvents.push(event);

            }
        }
    }

    if (searchBar.value == 0) {
        
        console.log("2", checkedEvents);
        box.innerHTML = createCards(checkedEvents);

    }
    else {
        searchCheckedEvents = checkedEvents.filter((evento) =>
            evento.name.toLowerCase().includes(searchBar.value.toLowerCase()))

            box.innerHTML = createCards(searchCheckedEvents);
    }

    bufferEvents = checkedEvents.map((evento) => evento);

    if(checkedCats.length === 0){
        console.log("parche");
        box.innerHTML = createCards(data.events);
    }

})

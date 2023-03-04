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

//----Categories----//
//Creates an array of categories iterating data.events:
let arrCategory = [];

for(let event of data.events){
  arrCategory.push(event.category)
}
console.log(`arrCategory ${arrCategory}`);
//Iterates the categories array and saves the non-repeating categories in a new array:
let aECategoriesArray = [];

arrCategory.forEach(category =>{
  if (!aECategoriesArray.includes(category)){
    aECategoriesArray.push(category)
  }
})
//Sorts the resulting array
aECategoriesArray.sort()

console.log(`aECategoriesArray:  ${aECategoriesArray}`)

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
console.log(form);
form.innerHTML = createCategoriesCheckBox(aECategoriesArray);
console.log(createCategoriesCheckBox(aECategoriesArray));

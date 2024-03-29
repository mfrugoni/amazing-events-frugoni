console.log("Past Events");

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

//----Cards----//

//Function that creates the card templates in string format:
function createCards(dataArray) {

    let cardString = ``;

        for (let event of dataArray) {
            cardString += `<div class="card">
    <img src="${event.image}">
    <h3>${event.name}</h3>
    <p class="desc">${event.description}</p>
    <p class="date">Date: ${event.date}</p>
    <div class="card-foot">
        <p>Price: $${event.price}.-</p>
        <a href="./details.html?id=${event._id}">More...</a>
    </div>
</div>
`
        }

    return cardString;
}

//Function that creates the array of categories to render:
function filterArrayCat(dataArray){

    let aECategoriesArray = [];

    dataArray.forEach(event => {
        if (!aECategoriesArray.includes(event.category)) {
            aECategoriesArray.push(event.category)
        }
    })

    return aECategoriesArray.sort();
}

//Function that creates the checkboxes by passing the filtered categories array:
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

//Function that creates the cards of the founded events:
function createFoundedCards(foundedDataArray){

    let cardString = ``;

    if (foundedDataArray.length > 0) {
        for (let event of foundedDataArray) {
            cardString += `<div class="card">
    <img src="${event.image}">
    <h3>${event.name}</h3>
    <p>Description: ${event.description} </p>
    <p>Date: ${event.date}</p>
    <div class="card-foot">
        <p>Price: ${event.price}</p>
        <a href="./details.html?id=${event._id}">More...</a>
    </div>
</div>
`
        }
    }

else {
    cardString += `<div class="not-founded">
    <p>We are sorry... but your search 🔭 did not return any results.😢</p>
    <p>Please try again with different words 😎</p>
    <p>Or... you can visit <a href="./upcoming-events.html">THIS</a> awesome events that we got for you!</p>
</div>
`
}

    return cardString;

}

//Capture the html element where we want to put the cards:
const box = document.getElementById("box");
//Capture the html element where we want to put the categories:
const form = document.querySelector(".category");

//Loader:
const loader = `<div class="loader">Loading...</div>`;
box.innerHTML = loader;

//Asinchronic block:
fetch(urlApi)
    .then(response => response.json())
    .then(data => {

        //Filter the events by date:
        let pastEvents = data.events.filter((event) => event.date < data.currentDate);

        //Create the cards and put them inside the captured element:
        box.innerHTML = createCards(pastEvents);

        //Create the categories inputs and put them inside the captured element:
        form.innerHTML = createCategoriesCheckBox(filterArrayCat(data.events));


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

            box.innerHTML = createFoundedCards(searchBarEvents);
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

                box.innerHTML = createFoundedCards(checkedEvents);

            }
            else {
                searchCheckedEvents = checkedEvents.filter((evento) =>
                    evento.name.toLowerCase().includes(searchBar.value.toLowerCase()))

                box.innerHTML = createFoundedCards(searchCheckedEvents);
            }

            bufferEvents = checkedEvents.map((evento) => evento);

            if (checkedCats.length === 0 && searchBar.value == 0) {

                box.innerHTML = createCards(pastEvents);
            }
            else if (checkedCats.length === 0 && searchBar.value != 0) {
                searchBarEvents = pastEvents.filter((evento) =>
                    evento.name.toLowerCase().includes(searchBar.value.toLowerCase()))

                box.innerHTML = createFoundedCards(searchBarEvents);
            }

        })

    })
    .catch(error => {
        console.log(`Mi error: ${error}`);
    })

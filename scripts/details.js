console.log("details.js");

console.log([document]);

const queryString = location.search;
const params = new URLSearchParams(queryString);
const eventId = params.get("id")
const evento = data.events.find(evento => evento._id == eventId)

console.log("queryString", queryString)
console.log("params", params);
console.log("eventId", eventId);


const detail = document.querySelector(".detail")

const detailString = `
<img src="${evento.image}" alt="">

<div class="detail-list">
    <ul>
        <li>Name: ${evento.name}</li>
        <li>Category: ${evento.category}</li>
        <li>Date: ${evento.date}</li>
        <li>Description: ${evento.description}</li>
        <li>Place: ${evento.place}</li>
        <li>Price: ${evento.price}</li>
        <li>Capacity: ${evento.capacity}</li>
        <li>Assistance: ${evento.assistance}</li>
        <li>Estimate: ${evento.estimate}</li>
    </ul>
</div>

`
detail.innerHTML = detailString;

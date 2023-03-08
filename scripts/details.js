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
        <li><span class="li-title">Name:</span> ${evento.name}.</li>
        <li><span class="li-title">Category:</span> ${evento.category}.</li>
        <li><span class="li-title">Date:</span> ${evento.date}.</li>
        <li><span class="li-title">Description:</span> ${evento.description}.</li>
        <li><span class="li-title">Place:</span> ${evento.place}.</li>
        <li><span class="li-title">Price:</span> $ ${evento.price}.-</li>
        <li><span class="li-title">Capacity:</span> ${evento.capacity}.</li>
`;

const assistance = `<li><span class="li-title">Assistance:</span> ${evento.assistance}.</li>
<li><a href="javascript:history.back()">Back</a></li>
</ul>
</div>`;

const estimate = `<li><span class="li-title">Estimate:</span> ${evento.estimate}</li>
<li><a href="javascript:history.back()">Back</a></li>
</ul>
</div>`;

const defecto = `<li><a href="javascript:history.back()">Back</a></li>
</ul>
</div>`;

if(evento.assistance != undefined){
    detail.innerHTML = detailString + assistance;
}
else if(evento.estimate != undefined){
    detail.innerHTML = detailString + estimate;
}
else{
    detail.innerHTML = detailString + defecto;
}

console.log("details.js");

const detail = document.querySelector(".detail")

const detailString = `
<img src="./assets/img/Marathon.jpg" alt="">

<div class="detail-list">
    <ul>
        <li>Name:</li>
        <li>Category:</li>
        <li>Date:</li>
        <li>Description:</li>
        <li>Place:</li>
        <li>Price:</li>
        <li>Capacity:</li>
        <li>Assistance:</li>
        <li>Estimate:</li>
    </ul>
</div>

`
detail.innerHTML = detailString;

const nfts = document.querySelector(".productHolder");

function createCard([productId, warrantyDetails, issueDate, expirationDate]){
    let code = `
        <div class="card">
            <div class="cardText">
                <h2 class="productId">${productId}</h2>
                <h4 class="warrantyDetails">${warrantyDetails}</h4>
                <p class="issueDate">${issueDate}</p>
                <p class="expirationDate">${expirationDate}</p>
            </div>
        </div>
    `;
    nfts.innerHTML += code;
}

let json = [
    {
     productId: "123",
     warrantyDetails: "hello world",
     issueDate: "2022-07-28",
     expirationDate: "2022-07-29"
     },
 
    {
     productId: "232",
     warrantyDetails: "hi world",
     issueDate: "2022-07-28",
     expirationDate: "2022-07-29"
     },
     
 ]; 

for(i = 0; i < json.length; i++){
    createCard([json[i].productId, json[i].warrantyDetails, json[i].issueDate, json[i].expirationDate]);
}
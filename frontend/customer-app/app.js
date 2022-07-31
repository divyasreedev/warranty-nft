const body = document.querySelector(".body");

function createCard([productId, warrantyDetails, issueDate, expirationDate]) {
  let code = `
        <div class="card">
            <div class="cardText">
                <h2 class="productId">Product Id: ${productId}</h2>
                <h4 class="warrantyDetails">Warranty Details: ${warrantyDetails}</h4>
                <p class="issueDate">Issue Date: ${issueDate}</p>
                <p class="expirationDate">Expiry Date: ${expirationDate}</p>
            </div>
        </div>
    `;
  const nfts = document.querySelector(".productHolder");
  nfts.innerHTML += code;
}

async function getData() {
  const walletAddress = prompt("Please enter your wallet address: ");
  let response = await fetch(
    `http://localhost:3000/viewWarrantyTokens/?walletAddress=${walletAddress}`
  );
  let data = await response.json();
  body.innerHTML =
    '<div class="productHolder"><h1>You have the following products:</h1></div>';
  if (data.length === 0) {
    body.innerHTML = '<p class="loader-text">No Warranties found</p>';
  }
  for (i = 0; i < data.length; i++) {
    createCard([
      data[i].productId,
      urlify(data[i].warrantyDetails),
      data[i].issueDate.split(" ")[0],
      data[i].expirationDate.split(" ")[0],
    ]);
  }
}

function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url + '">' + url + "</a>";
  });
}

body.innerHTML =
  '<center class="loader"></center><p class="loader-text">Loading your data...</p>';
getData();

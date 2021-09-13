const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then(data => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  console.log(products)
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList = `product card-group`;
    div.innerHTML = `




      <div class="card py-4">
        <img src="${product.image}" class="card-img-top w-50 mx-auto h-48" alt="...">
        <div class="card-body">
          <h5 class="card-title text-2xl">${product.title}</h5>
          <p class="card-text">Category: ${product.category}</p>
          <p class="card-text">Price: $ ${product.price}</p>
        </div>
        <div class="card-footer card-footer-modify">
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn bg-purple-500 hover:bg-purple-600 text-white">Add to cart</button>
            <button type="button" id="details-btn" class="btn bg-green-500 hover:bg-green-600 text-white">Details</button>
            </div>
        </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;

  //only price amount will be updated by clicking 'add to cart' button.
  updatePrice("price", price);

  updateTaxAndCharge();

  //Total prodact will be updated by addin 1 after each click on 'add to cart' button.
  document.getElementById("total-Products").innerText = count;

  updateTotal()
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


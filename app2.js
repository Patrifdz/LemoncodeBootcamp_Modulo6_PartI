const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Entrada.
const products = [
    {
    description: "Goma de borrar",
    price: 0.25,
    tax: LOWER_TYPE,
    stock: 2,
    units: 0,
    },
    {
    description: "Lápiz H2",
    price: 0.4,
    tax: LOWER_TYPE,
    stock: 5,
    units: 0,
    },
    {
    description: "Cinta rotular",
    price: 9.3,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
    },
    {
    description: "Papelera plástico",
    price: 2.75,
    tax: REGULAR_TYPE,
    stock: 5,
    units: 0,
    },
    {
    description: "Escuadra",
    price: 8.4,
    tax: REGULAR_TYPE,
    stock: 3,
    units: 0,
    },
    {
    description: "Pizarra blanca",
    price: 5.95,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
    },
    {
    description: "Afilador",
    price: 1.2,
    tax: LOWER_TYPE,
    stock: 10,
    units: 0,
    },
    {
    description: "Libro ABC",
    price: 19,
    tax: EXEMPT_TYPE,
    stock: 2,
    units: 0,
    },
    ];

var productList = document.getElementById("list");
function createList () {

    for(product of products) {
        createElement(product);
    }
}

createList();
document.getElementById("button").disabled = isDisabled();

function createElement (product) {
    var productLine = document.createElement("li");
    var productDescription = document.createElement("span");
    productDescription.innerText = product.description;
    productDescription.setAttribute("class", "item");
    var productInput = document.createElement("input");
    productInput.setAttribute("type","number");
    productInput.setAttribute("class", "input");
    productInput.setAttribute("value", "0");
    productInput.setAttribute("min", "0");
    productInput.setAttribute("max",product.stock);
    productInput.addEventListener("change", (evento) => {
        product.units = parseInt(evento.target.value);
        document.getElementById("button").disabled = isDisabled();
    });
    productLine.appendChild(productInput);
    productLine.appendChild(productDescription);
    productList.appendChild(productLine);
}

function calcularTotal() {
    var subtotal=0;
    var impuestos=0;
    for(product of products) {
        subtotal += product.units * product.price;
        impuestos +=  product.units>0?(product.units * product.price)*(product.tax/100):0;
    }
        document.getElementById("subtotal").innerText = subtotal.toFixed(2);
        document.getElementById("impuestos").innerText = impuestos.toFixed(2);
        document.getElementById("total").innerText = (subtotal + impuestos).toFixed(2);
}
function isDisabled() {
    for(product of products) {
        if(product.units>0) {
            return false;
        }
    }
    return true;
}

document.getElementById("button").addEventListener("click", calcularTotal);

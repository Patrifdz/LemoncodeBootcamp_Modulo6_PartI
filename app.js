// Constantes.
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

//Creo un fragment para no sobrecargar el document (lo he mirado por Internet, pero no tengo muy claro que es el "reflow"). Creo una lista ordenada y la asigno como hija del fragment. Le asigno también un "id" para poder usarla después como madre de los elementos que cree para la lista:
var fragment = document.createDocumentFragment();
var listaOrdenada = document.createElement("ol");
listaOrdenada.setAttribute("id","list");
fragment.appendChild(listaOrdenada);
//El fragment lo asigno como hijo al main que tengo creado en el html:
var main = document.getElementById("main");
main.appendChild(fragment);

// Función para crear elementos en el Html con JavaScript:
function createElementHTML (element, id, clase, mother, valorMin, valorMax) {
    var element = document.createElement(element);
    element.setAttribute("id", id);
    element.setAttribute("class",clase);
    var mother = document.getElementById(mother).appendChild(element);
    //Le implemento algunos atributos que solamente quiero que realice cuando necesite crear los inputs:
    if(clase=="input") {
        element.setAttribute("type", "number");
        element.setAttribute("value","0");
        element.setAttribute("min", valorMin);
        element.setAttribute("max", valorMax);
    }
    return element;
}

//Hago un bucle del array products y dentro llamo a la función para crear un elemento para cada producto y encadenarlo a la lista ordenada creada:
    for(product in products) {
        createElementHTML("li", "item"+product, "item", "list");
        
        //También llamo a la función para crear un label y encadenarlo a cada elemento de la lista ordenada. Le creo también un "for" para el "name" de los inputs que crearé después y le asigno como nombre la descripción de cada producto del array:
        createElementHTML("label","label"+product,"label","item"+product).setAttribute("for",products[product].description);
        document.getElementById("label"+product).textContent = `${products[product].description} - ${products[product].price}€/ud.`;
        
        //Llamo a la función para crear los inputs y le asigno el atributo "name" para asociarlo al "for" del label y así asociarlo a su vez con la descripción de cada producto:
        createElementHTML("input","input"+product,"input","label"+product,"0", products[product].stock).setAttribute("name", products[product].description);
    }
        

// Función para calcular subtotal:
function calcularTotal() {
    var subtotal=0;
    var impuestos=0;
    for(product in products) {
        var input = parseInt(document.getElementById("input"+product).value);
        subtotal += input * products[product].price;
        impuestos += products[product].price * (input*products[product].tax/100);
    }
        document.getElementById("subtotal").textContent = subtotal.toFixed(2);
        document.getElementById("impuestos").textContent = impuestos.toFixed(2);
        document.getElementById("total").textContent = (subtotal + impuestos).toFixed(2);
}

var boton = document.getElementById("button");
boton.addEventListener("click", calcularTotal);
boton.disabled = true;
function botonAbled () {
    var valor = 0;
    boton.disabled = true;
    for(product in products) {
        var input = document.getElementById("input"+product).value;
        valor += input;
    }
    if(valor!=0) {
        boton.disabled = false;
    } else calcularTotal();
}

for(product in products) {
    var input = document.getElementById("input"+product);
    input.addEventListener("change", botonAbled); 
}



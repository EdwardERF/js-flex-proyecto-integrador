``
const tienda = {
  carrito: [],
  agregarProducto(){
    const nombreProducto = prompt("Ingrese el nombre del producto").toUpperCase()
    const precioProducto = prompt("Ingrese el costo del producto")

    const nuevoProducto = {
      nombreProducto,
      precioProducto
    }
    
    tienda.carrito.push(nuevoProducto)
  },
  quitarUltimoProducto(){

    if (tienda.carrito.length > 1) {
      const ultimoProducto = tienda.carrito.pop()
      alert(`Se ha eliminado el producto ${ultimoProducto.nombreProducto} del carrito.`)
    } else {
      alert('El carrito está vacío')
    }

  },
  buscarProducto(){
    const nombreProducto = prompt('Ingrese el producto a buscar').toUpperCase()

    const consulta = tienda.carrito.findIndex(producto => producto.nombreProducto === nombreProducto)

    if (consulta === -1) {
      alert(`El producto ${nombreProducto} no está cargado en el carrito`)
    } else {
      alert(`El producto ${nombreProducto} está en la posición ${consulta+1}`)
    }
    
  },
  verCarrito(){

    let carritoCompleto = ''

    for (producto of tienda.carrito) {
      carritoCompleto += `${producto.nombreProducto} - $${producto.precioProducto} \n`
    }
    
    alert(carritoCompleto)
  },
  verTotalAPagar(){
    let precioTotal = 0

    for (producto of tienda.carrito) {
      precioTotal += Number(producto.precioProducto)
    }
    
    alert(`Total a pagar: ${precioTotal}`)
  },
  checkout(){

    if (tienda.carrito.length === 0) {
      alert('El carrito está vacío, no se puede hacer checkout.')
    } else {
      tienda.carrito.splice(0, tienda.carrito.length);
      alert('La compra se ha generado con éxito. \nEl carrito ha quedado vacío.')
    }
  }
}

function ingresarNumero(){
  let operacionIngresada = parseInt(prompt("Ingrese: \n 1 - Agregar producto a la lista.\n 2 - Quitar producto de la lista.\n 3 - Buscar producto de la lista. \n 4 - Ver Carrito de Compras. \n 5 - Ver Total a Pagar. \n 6 - Checkout \n 7 - Salir"))
  while(isNaN(operacionIngresada) || operacionIngresada < 1 || operacionIngresada > 7){
    operacionIngresada = parseInt(prompt("Ingrese: \n 1 - Agregar producto a la lista.\n 2 - Quitar producto de la lista.\n 3 - Buscar producto de la lista. \n 4 - Ver Carrito de Compras. \n 5 - Ver Total a Pagar. \n 6 - Checkout \n 7 - Salir \n POR FAVOR INGRESE UN VALOR DEL 1 AL 7"))
  }
  return operacionIngresada
}

function seleccionarOperacion(operacion){
  switch(operacion){
    case 1:
      tienda.agregarProducto()
      break;
    case 2:
      tienda.quitarUltimoProducto()
      break;
    case 3:
      tienda.buscarProducto()
      break;
    case 4:
      tienda.verCarrito()
      break;
    case 5:
      tienda.verTotalAPagar()
      break;
    case 6:
      tienda.checkout()
      break;
    case 7:
      loop = false
      break;
    default:
      alert("Por favor, ingrese solo números del 1 al 7")
  }
}

// Instancio la variable loop fuera para que tenga scope global y por tanto sea accesible a todas las funciones
// De este modo, el case 7 del switch va a afectar el mismo loop de la function app
let loop = true

function app () {
  alert('Bienvenido a la tienda de productos!')
  while(loop) {
    let operacion = ingresarNumero()
    seleccionarOperacion(operacion)
  }
  alert('Gracias por utilizar la tienda de productos. \nQue tenga un buen día.')
}

// // Genero un tiempo de espera para la ejecución de la app, de modo tal que doy tiempo para que se imprima la descripción del negocio, solicitada en la consigna.
// setTimeout(() => {
//   app()  
// }, 500);

const listaProductos = document.getElementById("productosDisponibles")
let productos = []

const mostrarProductos = ()=>{
  listaProductos.innerHTML = ""
  productos.forEach(prod =>{
    const div = document.createElement("div")
    div.className = 'item'

    const ul = document.createElement("ul")
    ul.innerHTML = `${prod.nombre} - $${prod.precio}`

    const input = document.createElement("input")
    input.type = 'button'
    input.id = 'btnPanMolde'
    input.value = 'Agregar'

    div.appendChild(ul)
    div.appendChild(input)

    listaProductos.appendChild(div)

    // `
    //     <ul>Pan de molde</ul><input type="button" id="btnPanMolde" value="Quitar"></input type="button">
    // `
    // listaProductos.appendChild(ul)

    // <div class="item">
    // <ul>Pan de molde</ul><input type="button" id="btnPanMolde" value="Quitar"></input type="button">
    // </div>
  })
}

const traerProductos = async ()=>{
  try {
    const datosJson = await fetch("./datos/catalogoProductos.json") // pedimos info de la api
    const datosProcesados = await datosJson.json() // la convertimos a js
    console.log(datosProcesados)

    // utilizamos los datos que conseguimos
    productos = datosProcesados
    mostrarProductos()
  } catch (error) {
    console.warn("Este es el error:", error)
    listaProductos.innerText = "Error 404, no se consiguieron los datos, intenta más tarde"
  }
}

traerProductos()
const tienda = {
  carrito: [],
  agregarProducto(id, nombre, precio){
    const nuevoProducto = {
      id,
      nombre,
      precio
    }
    
    tienda.carrito.push(nuevoProducto)

    actualizarContadorCarrito()
    mostrarCarrito()
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
  eliminarPorId(id){
    const index = tienda.carrito.findIndex(item => item.id === id)

    if (index !== -1) {
      tienda.carrito.splice(index, 1)
    }

    actualizarContadorCarrito()
    mostrarCarrito()
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
      precioTotal += Number(producto.precio)
    }
    
    return precioTotal
  },
  checkout(){
    if (tienda.carrito.length === 0) {
      alert('El carrito está vacío, no se puede hacer checkout.')
    } else {
      let carritoAprobado = confirm(`Confirma la compra del carrito por valor $${tienda.verTotalAPagar()}?`)

      if (carritoAprobado) {
        tienda.carrito.splice(0, tienda.carrito.length);
        alert('La compra se ha generado con éxito. \nEl carrito ha quedado vacío.')
      }
    }
    actualizarContadorCarrito()
    mostrarCarrito()
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


// Codigo para generar lista de productos disponibles
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
    input.id = `btn${prod.id}`
    input.value = 'Agregar'

    input.addEventListener("click", ()=>{
      tienda.agregarProducto(prod.id, prod.nombre, prod.precio)
    })
    
    div.appendChild(ul)
    div.appendChild(input)

    listaProductos.appendChild(div)
  })
}

const traerProductos = async ()=>{
  try {
    const datosJson = await fetch("./datos/catalogoProductos.json") // pedimos info de la api
    const datosProcesados = await datosJson.json() // la convertimos a js

    // utilizamos los datos que conseguimos
    productos = datosProcesados
    mostrarProductos()
  } catch (error) {
    console.warn("Este es el error:", error)
    listaProductos.innerText = "Error 404, no se consiguieron los datos, intenta más tarde"
  }
}

// Codigo para mostrar contador de productos en el carrito.
const actualizarContadorCarrito = async ()=>{
  try {
    const contador = document.getElementById("tituloPreviaCarrito")
    contador.innerHTML = `Carrito: ${tienda.carrito.length}`
  } catch (error) {
    console.warn("Este es el error:", error)
  }
}


// Codigo para listar los productos del carrito
const listaCarrito = document.getElementById("previaCarrito")

const mostrarCarrito = ()=>{
  if (tienda.carrito.length === 0) {
    listaCarrito.innerHTML = "Carrito vacío!"
  } else {
    listaCarrito.innerHTML = ""
  }
  tienda.carrito.forEach(prod =>{
    const div = document.createElement("div")
    div.className = 'item'

    const ul = document.createElement("ul")
    ul.innerHTML = `${prod.nombre} - $${prod.precio}`

    const input = document.createElement("input")
    input.type = 'button'
    input.id = `btn${prod.id}`
    input.value = 'Quitar'

    input.addEventListener("click", ()=>{
      tienda.eliminarPorId(prod.id)
    })

    div.appendChild(ul)
    div.appendChild(input)

    listaCarrito.appendChild(div)
  })

  const h3 = document.createElement("h3")
  h3.className = 'tituloSecundario'
  h3.innerHTML = `Total: ${tienda.verTotalAPagar()}`

  listaCarrito.appendChild(h3)
}



// Agrego evento para boton de comprar
let btnComprar = document.getElementById("btnComprar")
btnComprar.addEventListener("click", ()=>{
  tienda.checkout()
})

actualizarContadorCarrito()
traerProductos()
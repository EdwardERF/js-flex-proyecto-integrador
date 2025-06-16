
const tienda = {
  carrito: [],
  agregarProducto(){
    alert('Operación pendiente de programar.')
  },
  quitarProducto(){
    alert('Operación pendiente de programar.')
  },
  buscarProducto(){
    alert('Operación pendiente de programar.')
  },
  verCarrito(){
    alert('Operación pendiente de programar.')
  },
  verTotalAPagar(){
    alert('Operación pendiente de programar.')
  },
  checkout(){
    alert('Operación pendiente de programar.')
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
      tienda.quitarProducto()
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

app()
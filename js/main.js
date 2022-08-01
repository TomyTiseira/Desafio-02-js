// Variables
const menu = document.querySelector('#menu');
let carrito = [];

// Eventos
menu.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        crearProducto(e.target.parentElement);
    }
});

// Clases
class Producto {
    constructor(nombre, precio, cantidad, id, imagen) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.id = parseInt(id);
        this.imagen = imagen;
    }

    calcularPrecioConIva() {
        return this.precio * 1.21 * this.cantidad;
    }
}

// Crear producto valiendo su cantidad
const crearProducto = (infoProducto) => {

    const nombre = infoProducto.querySelector('h3').textContent;
    const precio = infoProducto.querySelector('div span').textContent;
    const id = infoProducto.querySelector('a').getAttribute('data-id');
    const cantidad = 1;
    const imagen = infoProducto.querySelector('img').src;

    // Creando el objeto producto
    const producto = new Producto(nombre, precio, cantidad, id, imagen);

    // Recorrer el array buscando el índice del producto
    const index = carrito.findIndex( produc => produc.id === producto.id);

    if(index !== -1) {
        carrito[index].cantidad++;

    } else {
        // Actualizando el array
        carrito = [...carrito, producto];
    }
    
    mostrarCarrito();
}

// Mostrar los productos del carrito en el HTML
const mostrarCarrito = () => {
    
    limpiarCarrito();

    // Creando un div para cada producto del carrito
    carrito.forEach( (producto) => {
        // Creación del div
        const div = document.createElement('div');
        // Estableciendole el id
        div.dataset.id = producto.id;

        // Creación del nombre del producto
        const nombre = document.createElement('h3');
        nombre.innerHTML = `<span class="text-uppercase">Producto:</span> ${producto.nombre}`;
        nombre.classList.add('fs-5', 'py-2');
        div.appendChild(nombre);

        // Creación de la cantidad del producto
        const cantidad = document.createElement('div');
        cantidad.innerHTML = `<span class="text-uppercase">Cantidad:</span> ${producto.cantidad}`;
        cantidad.classList.add('fs-6');
        div.appendChild(cantidad);

        // Creación del precio del producto
        const precio = document.createElement('div');
        precio.innerHTML = `<span class="text-uppercase">Precio</span> (con iva): $${producto.calcularPrecioConIva().toFixed(2)}`
        precio.classList.add('fs-6', 'p-2');
        div.appendChild(precio);

        // Creación de la imagen del producto
        const imagen = document.createElement('img');
        imagen.src = producto.imagen;
        div.appendChild(imagen);

        // Agregando un botón para eliminar el producto
        const btnEliminar = document.createElement('button');
        btnEliminar.innerHTML = `Eliminar &times`;
        btnEliminar.classList.add('btn', 'btn-danger', 'mr-2', 'd-flex');
        div.appendChild(btnEliminar);

        // Eliminar producto según id
        btnEliminar.onclick = () => eliminarProducto(producto.id);

        // Incorporando el div del producto al HTML
        div.classList.add('box-grid', 'text-center');
        document.querySelector('#carrito').appendChild(div);
    });

    const totalCarrito = (carrito.reduce( (acc, producto) => acc + producto.calcularPrecioConIva(), 0)).toFixed(2);
    
    if(totalCarrito > 0) {
        const total = document.createElement('div');
        total.innerHTML = `El precio total es: ${totalCarrito}`;
        total.classList.add('box-total', 'text-center');
        document.querySelector('#carrito').appendChild(total);
    }
}

// Limpiar carrito para no encontrar duplicados
const limpiarCarrito = () => {
    const contenedorCarrito = document.querySelector('#carrito');
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

// Eliminar productos según id
const eliminarProducto = (id) => {
    carrito = carrito.filter( (producto) => producto.id !== id);

    mostrarCarrito();
}

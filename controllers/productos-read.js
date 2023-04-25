import { productoServices } from "../servicios/producto-servicios.js";
import { formatPrice } from "../formatterPrices.js";

const contenedorProducto = document.querySelector('.vista-producto');
const url = new URL(window.location);
const idURL = Number(url.searchParams.get("id"));
const contenedorProductos = document.querySelector('.productos');

function similares(id, name, imageUrl, price, link) {

    const div = document.createElement('div');
    div.classList.add('producto2');
    const contenido = `

        <img src="${imageUrl}" alt="imagen producto" class="producto_img">
        <p class="producto_nombre">${name}</p>
        <p class="producto_precio">${formatPrice(price)}</p>
        <a class="ver-producto" href="../screens/producto.read.html?id=${id}">Ver Producto</a>

    `;

    div.innerHTML = contenido;

    return div;
}

function obtenerInfoProducto(name, imageUrl, price) {

    const div = document.createElement('div');
    div.classList.add('vista_producto');
    const contenido = `
            <img src="${imageUrl}" alt="imagen producto" class="vista_producto-img">
            <div class="vista_producto-texto">
                <h2 class="productos_listado-titulo">${name}</h2>
                <p class="vista_producto-parrafo">Fusce eget cursus felis. Proin quis urna nunc. Quisque ac sollicitudin sapien. Curabitur dictum quis neque a semper. Nunc sit amet venenatis metus. Suspendisse nibh turpis, venenatis vitae est et, vulputate interdum ipsum. Morbi interdum elit non enim pretium imperdiet. Nunc iaculis porta risus ullamcorper aliquam. Nullam aliquet purus ac ullamcorper cursus. Nullam in eros euismod, semper magna ac, tincidunt nulla. Phasellus eu lectus viverra, rhoncus risus a, iaculis turpis. Integer tortor quam, faucibus a malesuada eget, tempor ac metus.
                </p>       
                <h2 class="h2_precio">${formatPrice(price)}</h2>
            </div> 
        `;
    div.innerHTML = contenido;

    return div;
}

productoServices.listaProductos()
    .then(async respuesta => {

        for (let i = 0; i < respuesta.length; i++) {

            const id = await respuesta[i].id;
            const imagen = await respuesta[i].imageUrl;
            const nombre = await respuesta[i].name;
            const precio = await respuesta[i].price;

            if (Number(id) === idURL) {
                
                const mostrarProducto = obtenerInfoProducto(nombre, imagen,precio);
                contenedorProducto.appendChild(mostrarProducto);

                return;
            }
        }
    })
    
productoServices.listaProductos()
    .then(async respuesta => {

        let contador = 0;
        let nuevoArray = [];
        do {
            const max = respuesta.length;
            const aleatorio = Math.floor(Math.random() * max);
            nuevoArray.push(respuesta[aleatorio]);

            contador++;

        } while (contador < 6);

        nuevoArray.forEach(({ id, name, imageUrl, price, link }) => {

            const productoAleatorio = similares(id, name, imageUrl, price, link);
            contenedorProductos.appendChild(productoAleatorio);

        })

    })
    .catch(error => console.log(error));


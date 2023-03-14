//Productos con precios y cantidad
const productos = [];
const carrito = [];

let iva = 0.21;
let costoEnvio = 2500;

class Producto {
    constructor(id, nombre, precio, categoria, marca, descripcion, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.categoria = categoria;
        this.marca = marca;
        this.descripcion = descripcion;
        this.stock = parseInt(stock);
        //Las imágenes del producto se cargarán en una carpeta con el mismo id del objeto (assets/img/productos/"categoria"/"marca"/"id"/1.webp, 2.webp, 3.webp)
    }
    //Asignar el id de forma autoincremental
    asignarId(array) {
        this.id = array.length;
    }
    //Cambiar el precio después de creado el objeto
    asignarPrecio(precio) {
        this.precio = precio;
    }
    
    //Cambiar el stock después de creado el objeto
    reposicionStock(stock) {
        this.stock += stock;
    }
    venta(stock) {
        this.stock -= stock;
    }
};

//Se cargan los productos de las tarjetas al objeto productos
productos.push(
    new Producto(1, "Auriculares Zeus", 5800, "Auriculares", "Redragon", "", 430),
    new Producto(2, "Pendrive 8Gb", 2500, "Almacenamiento externo", "Sandisk", "", 573),
    new Producto(3, "Silla Gamer", 65000, "Sillas", "Corsair", "", 254),
    new Producto(4, "Geforce RTX 3080", 89500, "Placas de video",  "Gigabyte Aorus", "", 329),
    new Producto(5, "Router Wr820N", 4800, "Redes y conectividad", "Tp-Link", "", 49),
    new Producto(6, "Mini Pc i3", 65000, "Mini computadoras", "Intel", "", 17)
);

//Función para crear una nueva tarjeta
function cargaProducto() {
    let nombre = prompt("Ingresa el nombre del producto");
    let precio = prompt("Ingresa el precio del producto");
    if (isNan(precio)){
        ("No ha ingresado un precio válido, ¿desea cargar nuevamente el producto?")
    }
    let categoria = prompt("Ingresa la categoria del producto");
    let marca = prompt("Ingresa la marca del producto");
    let descripcion = prompt("Ingresa la descripcion del producto");
    let stock = prompt("Ingresa el stock del producto");

    if (isNan(stock)){
        ("No ha ingresado un stock válido, ¿desea cargar nuevamente el producto?")
    }
    let producto = new Producto(nombre, precio, id, categoria, marca, descripcion, stock);
    productos.push(producto);

    let verificacion = confirm("¿Desea agregar otro producto? (S/N)");
    if (verificacion == true) {
        cargaProducto();
    }
}

//Productos con precios y cantidad

function agregarProducto(id){
    let cantidad = prompt("Ingrese la cantidad del producto que desea agregar al carrito");
    if (isNaN(cantidad)){
        alert("Ingrese un número");
    }else{
        cantidad = parseInt(cantidad);
        if (cantidad > 0){
            productos.forEach(producto => {
                if (id > productos.length){
                    alert("El producto no existe");
                }

                else if (producto.id === id){
                    if (producto.stock >= cantidad){
                        if (carrito.length == 0){
                            carrito.push({
                                id: id,
                                nombre: producto.nombre,
                                marca: producto.marca,
                                precio: producto.precio,
                                cantidad: cantidad
                            });
                            console.log(id)
                            producto.stock -= cantidad;  
                            alert("Producto agregado al carrito");
                        }
                        else{
                            carrito.forEach(elemento => {
                                if(elemento.id === id){
                                    elemento.cantidad += cantidad;
                                    
                                    productos[id].stock -= cantidad;
                                    alert("Producto agregado al carrito");
                                }else{
                                    carrito.push({
                                        id: id,
                                        nombre: producto.nombre,
                                        marca: producto.marca,
                                        precio: producto.precio,
                                        cantidad: cantidad
                                    });
                                    productos[id-1].stock -= cantidad;
                                    alert("Producto agregado al carrito");
                                }
                            })
                        }
                        
                    }
                    else{
                        alert("No hay suficiente stock");
                    }
                }
                
            })
            
            
        }
        else{
            alert("Ingrese una cantidad válida");
        }
    
    }
    
}

function mostrarCarrito(){
    let carritoHTML = "";
    let total = 0;
    for (let i = 0; i <= carrito.length-1; i++){
        if (carrito[i].cantidad > 0){
            carritoHTML += `${carrito[i].nombre} ${carrito[i].marca} - Id: ${carrito[i].id} - Cantidad: ${carrito[i].cantidad}  - Precio Final: ${(carrito[i].precio)*(carrito[i].cantidad)}\n`;
        total += (carrito[i].precio)*(carrito[i].cantidad);
        }
    }
    carritoHTML += `---------------------------------------------------------------- \n SubTotal: $${Math.round(total/1 + iva)} \n IVA: $${Math.round(total * iva)} \n Envío: $${costoEnvio} \n Total: $${total + 2500}`;
    
    alert(carritoHTML);
}


function quitarProducto(){
    mostrarCarrito();
    let encontrado = false;
    let id = parseInt(prompt(`Ingrese el id del producto que desea quitar del carrito`));
    carrito.forEach(elemento => {
        if (elemento.id === id){
            encontrado = true;
}
});
    if (encontrado === false){
        alert(`No hay ningún producto con el id ${id} en el carrito`);
    }

    
    
    else{
        let cantidadQuitar = parseInt(prompt(`Ingrese la cantidad del producto que desea quitar del carrito`));
        for (let i = 0; i < carrito.length; i++) {
            if(carrito[i].id === id){
                encontrado = true;
                if(cantidadQuitar <= carrito[i].cantidad){
                    carrito[i].cantidad -= cantidadQuitar;
                    productos[id-1].stock += cantidadQuitar;            ///////////////////////////////////////
                }
                else if(carrito[i].cantidad == 0){
                    alert(`No hay más productos con el id ${carrito[i].cantidad} en el carrito`);
                }
                else if(cantidadQuitar > carrito[i].cantidad){
                    alert(`Trató de quitar ${cantidadQuitar} productos, hay ${carrito[i].cantidad} productos con el id ${carrito[i].id} en el carrito`);
                }
                }
                if(carrito[i].cantidad == 0){
                    carrito.splice(i, 1);
                }
                
    
        }
    }
    
    let verificacion = prompt(`¿Desea ver el carrito actualizado? (S/N)`);
    if(verificacion == 'S' || verificacion == 's'){
        mostrarCarrito();
    }
    let verificacion2 = prompt(`¿Desea quitar otro producto? (S/N)`);
    if(verificacion2 == 'S' || verificacion2 == 's'){
        quitarProducto();
    }

};

//Menú de logueo
//Cuentas registradas
const cuentas = [];

class Cuenta {
    constructor (nombre, apellido, correo, contrasena, altura, direccion, ciudad, pais, telefono) {
        this.nombre = nombre.toLowerCase();
        this.apellido = apellido.toLowerCase();
        this.correo = correo.toLowerCase();
        this.contrasena = contrasena;
        this.altura = parseInt(altura);
        this.direccion = direccion.toLowerCase();
        this.ciudad = ciudad.toLowerCase();
        this.pais = pais.toLowerCase();
        this.telefono = parseInt(telefono);
    }
}

cuentas.push(
    new Cuenta("Matias", "Dupraz", "mdupraz@gmail.com", "1234", 1780, "Calle de la torre", "Sevilla", "España", "12345678"),
    new Cuenta("Sebastián", "Luccaroni", "sebaluc@gmail.com", "lacontraseña", 3247, "Pasaje de Los Altos", "Córdoba", "Argentina", "35497820"),
    new Cuenta("Mauricio", "Rodriguez", "mauriciorodriguez@gmail.com", "a4bfc22", 458, "Libertadores", "Uyuní", "Bolivia", "35364899"),
    new Cuenta("Facundo", "Derqui", "facundoderqui@gmail.com", "mesSirve", 1325, "9 de Julio", "Buenos Aires", "Argentina", "23587989")
)
console.log(cuentas)
function loguearse(){
    //correo = (document.getElementById('correoInput').value).toLowerCase();
    //contrasena = document.getElementById('contrasenaInput').value;
    let correo = prompt("Ingrese su correo electrónico");
    let encontrado = false;
    for(let i = 0; i < cuentas.length; i++){
        if(correo.toLowerCase() == cuentas[i].correo){
            encontrado = true;
            let contrasena = prompt("Ingrese su contraseña");
            if(contrasena == cuentas[i].contrasena){
                alert('Bienvenido!');
                break;
            }
            else{
                alert('Contraseña incorrecta');
                break;
            }
        }
    }
    if(encontrado === false){
        let verificacion = prompt('Usuario no encontrado ¿Desea registrarse? (S/N)');
        if(verificacion == 'S' || verificacion == 's'){
            registrarse();
        }
        
    }
}

function registrarse(){
    let nombre = prompt('Ingrese su nombre');
    let apellido = prompt('Ingrese su apellido');
    let correo = prompt('Ingrese su correo');    
    let contrasena = prompt('Ingrese su contraseña');
    let telefono = parseInt(prompt('Ingrese su teléfono'));
    while(isNaN(telefono)){
        alert('Ingrese un número');
        telefono = parseInt(prompt('Ingrese su teléfono'));
    }
    let pais = prompt('Ingrese su país');
    let ciudad = prompt('Ingrese su ciudad');
    let direccion = prompt('Ingrese su dirección');
    let altura = parseInt(prompt('Ingrese su altura'));
    while(isNaN(altura)){
        alert('Ingrese un número');
        altura = parseInt(prompt('Ingrese su altura'));
    }
    let nuevoUsuario = new Cuenta(nombre, apellido, correo, contrasena, altura, direccion, ciudad, pais, telefono);
    cuentas.push(nuevoUsuario);
}
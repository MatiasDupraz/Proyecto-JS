//Productos con precios y cantidad
let iva = 0.21;
let costoEnvio = 2500;
const carrito = [
    {
        id : 1,
        nombre : "Auriculares Zeus",
        precio : 5800,
        cantidad : 0,
        stock : 430
    },
    {
        id : 2,
        nombre : "Pendrive 8Gb Sandisk",
        precio : 2500,
        cantidad : 0,
        stock : 573
    },
    {
        id : 3,
        nombre : "Silla Gamer Corsair",
        precio : 65000,
        cantidad : 0,
        stock : 254
    },
    {
        id : 4,
        nombre : "Geforce RTX 3080",
        precio : 89500,
        cantidad : 0,
        stock : 329
    },
    {
        id : 5,
        nombre : "Router Tp-Link",
        precio : 4800,
        cantidad : 0,
        stock : 49
    },
    {
        id : 6,
        nombre : "Mini Pc Intel i3",
        precio : 65000,
        cantidad : 0, 
        stock : 17
    },
    
];
function agregarProducto(id){
    let cantidad = prompt("Ingrese la cantidad del producto que desea agregar al carrito");
    if (isNaN(cantidad)){
        console.log(cantidad)
        alert("Ingrese un número");
    }else{
        cantidad = parseInt(cantidad);
        if (cantidad > 0){
            carrito.forEach(elemento => {
                if(elemento.id == id){
                    if (cantidad <= elemento.stock){
                        elemento.cantidad += cantidad;
                        elemento.stock -= cantidad;
                        alert("Producto agregado al carrito");
                    }else{
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
            carritoHTML += `${carrito[i].nombre} - Id: ${carrito[i].id} - Cantidad: ${carrito[i].cantidad}  - Precio Final: ${(carrito[i].precio)*(carrito[i].cantidad)}\n`;
        total += (carrito[i].precio)*(carrito[i].cantidad);
        }
    }
    carritoHTML += `---------------------------------------------------------------- \n SubTotal: $${Math.round(total/1 + iva)} \n IVA: $${Math.round(total * iva)} \n Envío: $${costoEnvio} \n Total: $${total + 3500}`;
    
    alert(carritoHTML);
}

//Menú de logueo
//Cuentas registradas
let cuentas = [{
    correo: 'matias.juarez@gmail.com',
    contrasena: '1234'
},
{
    correo: 'martha.estevanez@gmail.com',
    contrasena: 'abecede'
},
{
    correo: 'monicagiraudo23@gmail.com',
    contrasena: 'moras23'
},
{
    correo: 'admin',
    contrasena: 'admin'
}
];

function cargaUsuario(){
    let correo = prompt('Ingrese su correo a continuación');
    forEach(elemento => {
        if (elemento.correo == correo){
            loguearse(elemento.correo)
        }
        return;
    })
    confirm('Usuario no encontrado, ¿desea registrarlo? (S/N)');
    if (confirm('¿Desea registrarlo? (S/N)')){
        registrarse(elemento.correo)
    }
}

1
function loguearse(correo){
    //correo = prompt('Ingrese su correo a continuación');
    for(let i = 0; i < cuentas.length; i++){
        if(correo == cuentas[i].correo){

            contrasena = prompt('Ingrese su contraseña a continuación');
            if(contrasena == cuentas[i].contrasena){
                alert('Bienvenido');
                document.getElementById('tituloLogin').innerHTML = 'Bienvenido!';
                break;
            }
            else{
                alert('Contraseña incorrecta');
                break;
            }
        }
        if(i == cuentas.length - 1){
            alert('Usuario no encontrado');
        }
    }
}

function registrarse(){
    let nombre = prompt('Ingrese su nombre');
        let contrasena = prompt('Ingrese su contraseña');
        let correo = prompt('Ingrese su correo');
        let nuevoUsuario = {
            correo: correo,
            contrasena: contrasena,
            nombre: nombre
        }
        cuentas.push(nuevoUsuario);
}

function quitarProducto(){
    mostrarCarrito();
    let id = parseInt(prompt(`Ingrese el id del producto que desea quitar del carrito`));
    let cantidadQuitar = parseInt(prompt(`Ingrese la cantidad del producto que desea quitar del carrito`));
    for (let i = 0; i < carrito.length; i++) {
        if(carrito[i].id == id){
            if(cantidadQuitar <= carrito[i].cantidad){
                carrito[i].cantidad -= cantidadQuitar;
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
        break;
    }
    let verificacion = prompt(`¿Desea ver el carrito actualizado? (S/N)`);
    if(verificacion == 'S' || verificacion == 's'){
        mostrarCarrito();
    }
    let verificacion2 = prompt(`¿Desea quitar otro producto? (S/N)`);
    if(verificacion2 == 'S' || verificacion2 == 's'){
        mostrarCarrito();
    }

}

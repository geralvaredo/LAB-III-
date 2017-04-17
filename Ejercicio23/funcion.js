
 function mensaje()
{
    var pi = "impar" ;
    var numero = parseInt( prompt("Teclea un numero") ) ;
    if (numero%2==0)
     {
       pi = "par";     
    }
    
    
    alert("el numero: " + numero + " es " + pi ) ;
}
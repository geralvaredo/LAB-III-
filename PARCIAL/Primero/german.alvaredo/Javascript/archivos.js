var xmlHTTP = new XMLHttpRequest();
var server = "http://localhost:3000/";
var listaPersonas ;
var idPersona ;
var personaBM ;
var opcion ;
window.onload = function ()
{    
    opcion = "personas" ;
    servidor("GET","personas",estado,null);    
    cargarEventos();
}

function servidor(tipo,accion,callback,parametros){

    preload();
    xmlHTTP.onreadystatechange = callback;
    xmlHTTP.open(tipo,server+accion,true);
    //xmlHTTP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlHTTP.setRequestHeader("Content-Type","application/json");
    xmlHTTP.send(parametros);
    
}

function estado()
{
     
    if(xmlHTTP.readyState == 4)
    {
        if(xmlHTTP.status == 200)
        {
            preload();
            //console.log("Response: " + xmlHTTP.responseText);
            var datos = JSON.parse(xmlHTTP.responseText);            
            menu(datos);
           
        }
        else
            alert("Error Servidor - Codigo: " + xmlHTTP.status);
    }
}

function cargarEventos(){
    document.getElementById("cerrar").addEventListener("click",formularioOculto);
    document.getElementById("cerrar").addEventListener("click",sinColor);             
    document.getElementById("modificar").addEventListener("click",modificar);
    document.getElementById("eliminar").addEventListener("click",eliminar);    
}

function menu(datos){
    switch (opcion) {
        case 'personas':
            setListado(datos);        
            break;
        case 'editar':
             listarModificacion();
                break;
        case 'eliminar':
              eliminarPersona();
                break;
        default:
            break;
    }
}

function preload(){
  const container = document.getElementsByClassName("lista")[0];  
  if(container.classList.contains("loading")) 
    container.classList.remove("loading");
  else 
    container.classList.add("loading");
  
}

function setListado(lista){
    listaPersonas = lista ;
    listar();
}

function listar(){
    var cuerpo = document.getElementById("cuerpo");
    cuerpo.innerHTML = "";
    var p ;
    for(let i in listaPersonas){
       p = listarPersona(listaPersonas[i]["id"],listaPersonas[i]["nombre"],listaPersonas[i]["apellido"],listaPersonas[i]["fecha"],listaPersonas[i]["sexo"] )
      cuerpo.innerHTML +=  p ;
    }   
}

function listarPersona(id,nombre,apellido,fecha,sexo){    
    p = '<tr id="'+ id + '" ondblclick= "editar(this);" > <td>' 
    + nombre + '</td><td>' 
    + apellido + '</td> <td>' 
    + fecha +'</td> <td>'
    + sexo + '</tr>' ;
    return p ;
}

function editar(p){
    var per ;
    idPersona = p.id;
    for(let i in listaPersonas)
    {
       if(listaPersonas[i]["id"] == p.id){
           per = listaPersonas[i];
       }         
    } 
    formularioMostrar();    
    document.getElementById("nombre").value = per.nombre;
    document.getElementById("apellido").value = per.apellido;
    document.getElementById("fecha").value = per.fecha;   
    if(per.sexo == "Male"){
     document.getElementById("mas").checked = true;
    }
    else{
        document.getElementById("fem").checked = true; 
    }
}

function modificar(){    
    opcion = "editar";
    if(validacionCampos()){
        var nombre = document.getElementById("nombre").value ;
        var apellido = document.getElementById("apellido").value ;
        var fecha = document.getElementById("fecha").value ;   
        var sexo = genero("sexo") ;
        personaBM = {"id":idPersona,"nombre":nombre,"apellido":apellido,"fecha":fecha,"sexo":sexo};   
        servidor("POST",opcion,estado,JSON.stringify(personaBM));
        formularioOculto();
    } 
     
}

function listarModificacion(){
    for(var i=0; i < listaPersonas.length; i++){
        if(listaPersonas[i].id == idPersona){
            listaPersonas[i].nombre =    document.getElementById("nombre").value;
            listaPersonas[i].apellido =  document.getElementById("apellido").value;
            listaPersonas[i].fecha =     document.getElementById("fecha").value;
            listaPersonas[i].sexo =      genero("sexo");
            listar();            
            break;
        }
    }
}


function eliminar(){
    if(confirm("¿Desea eliminar la persona?"))
    {
        opcion = "eliminar";       
        personaBM = {"id":idPersona}; 
        formularioOculto();
        servidor("POST",opcion,estado,JSON.stringify(personaBM));        
    }
}
function eliminarPersona(){
    for(i=0; i < listaPersonas.length; i++)
    {

        if(listaPersonas[i].id == idPersona)
        {
            listaPersonas.splice(i,1);
            break;
        }
    }
    listar();
}

function genero(s){
    sexo=document.getElementsByName(s); 
    for(i=0;i<sexo.length;i++) 
        if (sexo[i].checked) { 
            valor = sexo[i].value; 
            return valor;
            break;
        }  
     return null;   
}

function validacionCampos(){
    var retorno = true;
    var nombre = document.getElementById("nombre").value ;
    var apellido = document.getElementById("apellido").value ;
    var fecha = document.getElementById("fecha").value ;   
    var sexo = genero("sexo") ;
    
    if(nombre.length < 3)
    {        
        mensaje("nombre");
        colorearCampos("nombre");        
        retorno = false;
    }    
    
    if(apellido.length < 3)
    {         
        mensaje("apellido");
        colorearCampos("apellido");
        retorno = false;
    }    
    
    if(sexo == null)
    {
        mensaje("sexo");
        colorearCampos("sexo");
        retorno = false;
    }   

    if(!validacionFecha(fecha))
    {
        mensaje("fecha");
        colorearCampos("fecha");
        retorno = false;
    }
   

    return retorno;
}

function mensaje(campo){
    var mensaje ;
    switch (campo) {
        case 'nombre':
        mensaje ="Debe ingresar un nombre con mas de 3 caracteres" ;  
            break;
        case 'apellido':
        mensaje = "Debe ingresar un apellido con mas de 3 caracteres" ;     
            break;
        case 'fecha':
        mensaje = "Debe ingresar una fecha menor al dia de hoy" ;  
        break;
        case 'sexo' :
        mensaje = "Debe seleccionar un sexo" ;
             break;    
        default:
            break;
    }
      
    alert(mensaje);

}

function validacionFecha(fecha){
    var retorno = true;

    var anio = fecha.split("-")[0];
    var mes =  fecha.split("-")[1];
    var dia =  fecha.split("-")[2];
    var fechaIngresada = new Date(anio, mes, dia);
    var fechaActual =  new Date();
    if(fechaActual.getTime() < fechaIngresada.getTime()){
        retorno = false;  
    }     
    
    return retorno;
}

function colorearCampos(campo){
    var cam = document.getElementById(campo);
    cam.style.borderColor = "red" ;
    cam.style.borderWidth = "5px";
    
}

function sinColor(){
    document.getElementById("nombre").style.border = '' ;
    var apellido = document.getElementById("apellido").style.border = '' ;
    var fecha = document.getElementById("fecha").style.border = '' ;   
    var sexo = genero("sexo") ;
    sexo.style.border = '';
    
}

function formularioMostrar(){

    contenedor.hidden = false;
}

function formularioOculto(){
    
    contenedor.hidden = true;
}

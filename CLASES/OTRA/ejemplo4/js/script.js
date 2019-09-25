window.addEventListener('load',()=>{
   // document.getElementById('btnTraer').addEventListener('click',traerTexto);
    document.forms[0].addEventListener('submit',enviarDatos);

} );

function enviarDatos(e){
    //alert("hola");
    e.preventDefault();
    let data = traerDatos(e.target);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        //codigo que maneja la peticion 
        let info = document.getElementById('info');
        if(xhr.readyState == 4){
              if(xhr.status == 200){
                  setTimeout(  ()=> {
                    info.innerText = xhr.responseText;
                    
                         
                    
                   clearTimeout(tiempo);
                  },3000  );
                    
                    //info.innerHTML = xhr.responseText;
              }
              else{
                    console.log(`Error: . ${xhr.status} . ${xhr.statusText} `);
              }  
        }else{
            info.innerHTML = '<img src=" ./img/spinner.gif" alt="spinner" />' ;
        }
        

    }

    xhr.open('POST','./servidor.php',true);
    xhr.setRequestHeader('Content-type','Application/x-www-form-urlencoded');
    xhr.send(data);
    var tiempo = setTimeout(  ()=> {
        xhr.abort();
        info.innerHTML = 'Servidor ocupado , intente mas tarde' ;
    },4000 );
}

function traerDatos(form){
    let nombre = form.nombre.value;
    let apellido = form.apellido.value;

    return `nombre=${nombre}&apellido=${apellido}` ;
}
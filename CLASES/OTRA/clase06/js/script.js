window.addEventListener('load',()=>{
    document.getElementById('btnTraer').addEventListener('click',traerTexto);
} )

function traerTexto(){
    //alert("hola");


    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        //codigo que maneja la peticion 
        let info = document.getElementById('info');
        if(xhr.readyState == 4){
              if(xhr.status == 200){
                  setTimeout(  ()=> {
                    info.innerText = xhr.responseText;
                  } ,3000 );
                    
                    //info.innerHTML = xhr.responseText;
              }
              else{
                    console.log(`Error: . ${xhr.status} . ${xhr.statusText} `);
              }  
        }else{

            info.innerHTML = '<img src=" ./img/spinner.gif" alt="spinner" />' ;


        }
        

    }

    xhr.open('GET','./documento.txt',true);
    xhr.send();
}


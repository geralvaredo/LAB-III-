 var rq = new XMLHttpRequest();
 rq.open("GET", "http://localhost:8080/mipagina", true);
 rq.send(null) ;
 rq.onreadystatechange =   function ()
 {
    if (rq.readyState  == /* 4*/ XMLHttpRequest.DONE && rq.status == 200)
    {
         console.log(rq.responseText) ;
         midivhtml.innerHTML = rq.responseText;
    
 }else
    
        midivhtml.innerHTML = 'cargando' ;
    
    
 };
 rq.send() ;
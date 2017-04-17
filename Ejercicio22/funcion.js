
function array()
{
    var meses = ["ENERO" , "FEBRERO" ,"MARZO", "ABRIL", "MAYO", "JUNIO",
                 "JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE" ] ;

    var fecha = new Date();             
  for (var index = 0; index < meses.length; index++) 
  {
       document.write(meses[index] + "<br>  ");
         
      
       
   
      
  }

  for (var index = 0; index < meses.length; index++) 
  {
      
       if (fecha.getMonth() == index ) 
        {
         document.write("Hoy es el mes: " + (index +1)  ) 
         break;
         }
 

               
}


}
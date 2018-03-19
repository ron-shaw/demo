'use strict'

function tab(obj1,obj2){
    var oBj1=document.getElementById(obj1);
    var oBtnz=oBj1.children;
    var oBj2=document.getElementById(obj2);
    var oBoxz=oBj2.children;
    for(var i=0;i<oBtnz.length;i++){
        (function(index){
            oBtnz[i].onclick=function(){
                for(var i=0;i<oBtnz.length;i++){
                    oBtnz[i].className='';
                    oBoxz[i].style.display='none';
                }
                oBtnz[index].className='active';
                oBoxz[index].style.display='block';
            }
        })(i)
    }
}




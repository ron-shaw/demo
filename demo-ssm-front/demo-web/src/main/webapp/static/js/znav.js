'use strict'
/**
 * Created by zengqingyan on 2016/6/2.
 */
function model(id1,id2,id3){
    var oZul=document.getElementById(id1);
    var oZli=oZul.children;
    var oZyul=document.getElementById(id2);
    var oMul=document.getElementById(id3);
    var oMli=oMul.children[0];
    var iNow=0;
    for(var i=0;i<oZli.length;i++){
        var oZyli=document.createElement('li');
        oZyli.innerHTML='<a href="javascript:;"><img src="images/model/01-'+i+'.png" alt="" />';
        oZyul.appendChild(oZyli);
        oZyli.style.display='none';
        var oZydli=oZyul.children;
        (function(index){
            oZli[i].onclick=function(){
                if(oZli[index].className=='active'){
                    oZli[index].className='';
                    oZydli[index].style.display='none';
                    iNow--;
                }else{
                    oZli[index].className='active';
                    oZydli[index].style.display='block';
                    iNow++;

                }
                if(iNow<=0){
                    oMli.className=''
                }else{
                    oMli.className='active';
                }
            };
        })(i);
    }
}
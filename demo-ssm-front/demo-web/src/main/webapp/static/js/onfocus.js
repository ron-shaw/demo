'use strict'
function findArr(arr,item){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==item){
			return true
		}
	}
	return false
}
function getByClass(obj,sClass){
	var aObj = obj.getElementsByTagName('*');
	var arr = [];
	for( var i=0;i<aObj.length;i++){
		var aClass = aObj[i].className.split(' ');
		if(findArr(aClass,sClass)){
			arr.push(aObj[i])
		}
	}
	return arr;
}
var aInput = getByClass(document,'inp198');
var arr=[];

	for( var i=0;i<aInput.length;i++){
		arr.push(aInput[i].value);
		(function(index){
			var oDiv = aInput[index].nextElementSibling||aInput[index].nextSibling;
			aInput[i].onfocus = function(){
				if(this.value==arr[index]){
					this.value='';
					this.style.color = '#333';
				}
			};

			aInput[i].onblur = function(){
				if(this.value==''){
					this.value=arr[index];
					this.style.color = '#bcbcbc';
					var oDiv = this.nextElementSibling||this.nextSibling;
					oDiv.style.display = 'none';
				}
			};

			aInput[i].oninput = function(){
				oDiv.style.display = 'block';
				oDiv.onclick =function(){
					aInput[index].value='';
					aInput[index].style.color = '#bcbcbc';
					aInput[index].value=arr[index];
					if(aInput[index].value==arr[index]){
						aInput[index].value=arr[index];
						aInput[index].style.color = '#bcbcbc';
						oDiv.style.display = 'none';
					}
				}
			}
		})(i)
	}




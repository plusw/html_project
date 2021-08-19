var how_many_otable_list=14;
function test(){
	//alert(copy(JSON.stringify(localStorage)));
}
function mySort(input_array){//数组排序函数，比较排序，自己写的
	var array=input_array;
	var biggest_index;
	for ( var i=0;i<array.length;i++){
		 biggest_index=0;
		for (var j=0;j<array.length-i;j++){//找出最大值
		   if(array[j]>array[biggest_index]){
				biggest_index=j;
			}
		}
		a=array[array.length-i-1];
		array[array.length-i-1]=array[biggest_index];
		array[biggest_index]=a;	
	} 
	return array;
}
window.onload = function()//打开页面就运行这段js代码
{
	getInformationfromloacl();
}
//封装操作localStroge方法
//https://blog.csdn.net/bocongbo/article/details/81772157       
//https://www.codehui.net/info/46.html   js操作localstorage
function handleLocalStorage(method, key, value) {
	switch (method) {
		case 'get' : {
		  let temp = window.localStorage.getItem(key);
		  if (temp) {
			return temp
		  } else {
			return false
		  }
	}
		case 'set' : {
		  window.localStorage.setItem(key, value);
		  break
		}
		case 'remove': {
		  window.localStorage.removeItem(key);
		  break
		}
		default : {
		  return false
			}
		}
}
//加行
var num=0;
document.getElementById('add').addEventListener('click', function() {
    var row = document.getElementById('tableBody').insertRow();
    for (var c = 0; c < 14; c += 1) {
        row.insertCell(c).innerHTML = "<div contenteditable='true'></div>";
    }
});
/*
function addRow(){
	//localStorage.clear();
	var oTable = document.getElementById("oTable");
	var tBodies = oTable.tBodies;
	var tbody = tBodies[0];
	var tr = tbody.insertRow(tbody.rows.length);
	for(var i=0;i<how_many_otable_list;i++){
		var td=tr.insertCell(i);
		td.innerHTML = "<div contenteditable='true'></div>";
	}	
}
*/
function saveToLocal(){//储存当前数据到loaclStroge
	var tb = document.getElementById('oTable');
	var rows = tb.rows;	
	var information = new Array();//产品信息 #玻璃#透明##1###
	var serialNumber = new Array();//序号
	//alert(rows.length);
	for(var i = 1; i<rows.length;i++){
		//获取序号
		var str0=rows[i].cells[0].innerHTML;
		//alert(str0);
		if(str0.match(/>(\S*)</)[1]!=null){
			str0 = str0.match(/>(\S*)</)[1]; 
		}
		serialNumber[i-1]=str0;
		//获取信息 #玻璃##透明###1####
		information[serialNumber[i-1]]="#";//产品信息与序号相对应
		for(var j = 1; j<rows[i].cells.length; j++ ){    // 遍历该行的 td
			var str=rows[i].cells[j].innerHTML;//获取最初形式 <div ...>夜明珠<div>
			str = str.match(/"true">(\S*)<\/div>/)[1];//正则匹配找到夜明珠
			information[serialNumber[i-1]]=information[serialNumber[i-1]]+str;//加上
			for(var k=0;k<j+1;k++){//
				information[serialNumber[i-1]]=information[serialNumber[i-1]]+"#";//加上#,最终成   #玻璃#透明##1###  ，方便正则匹配找出信息
			}
	   }
	}
	if (!window.localStorage) {
	  console.log('浏览器版本太低，不支持localStorage');
	} 
	else {
		 let storage = window.localStorage;
		 serialNumber.sort();//对序号Array进行排序
		 for(var i=0;i<serialNumber.length;i++){
			var a=serialNumber[i];
			a=Number(a);
			if (!isNaN(a) && a!="")
			{
				//alert("是数字");
				handleLocalStorage('set',serialNumber[i], information[serialNumber[i]]);//储存到local
			//log.console(information[i]);
			}
			else{
				//alert("有序号不是数字");
			}
		}
		window.location.replace(window.location.href);//刷新页面，模拟f5
	}
}
//打开页面就运行这段js代码
//从localStorage的数据传至表格
function getInformationfromloacl(){ 
	//alert(localStorage.length);
	//location.reload();
	var serialNumber=new Array();
	for(var i=0;i<localStorage.length;i++){
		serialNumber[i]=localStorage.key(i);
	}
	serialNumber=mySort(serialNumber);
	//alert(serialNumber);
	for(var i=0;i<serialNumber.length;i++){
		var information=localStorage.getItem(serialNumber[i]);
		
		var oTable = document.getElementById("oTable");
		var tBodies = oTable.tBodies;
		
		var tbody = tBodies[0];
		var tr = tbody.insertRow(tbody.rows.length);
		
		var td_1 = tr.insertCell(0);
		td_1.innerHTML = "<div contenteditable='true'>"+serialNumber[i]+"</div>";//前面的序号
		
		var td_2 = tr.insertCell(1);//产品名称
		var productName = information.match(/#(\S*?)##/)[1];
		td_2.innerHTML = "<div contenteditable='true'>"+productName+"</div>";
		
		var td_3 = tr.insertCell(2);//型号
		var model = information.match(/##(\S*?)###/)[1];
		td_3.innerHTML = "<div contenteditable='true'>"+model+"</div>";
		
		var td_4 = tr.insertCell(3);//数量
		var quantity = information.match(/###(\S*?)####/)[1];
		td_4.innerHTML = "<div contenteditable='true'>"+quantity+"</div>";
		
	}
}
//清空localStorage
function clearAllLocaStorage(){
	localStorage.clear();
}
//搜索功能,默认隐藏search_result,点击搜索到显现search_result
function search(){
	let key=document.querySelector("#search_key");
	key=key.value;
	key="/"+key+"/i";
	for(var i=0;i<localStorage.length;i++){
		str=handleLocalStorage("get",localStorage.key(i));
		if(str.search(eval(key))!=-1){
			//alert(str);
			//显现search_result
			var searchTable = document.getElementById("search_result");    
			searchTable.style.display = "";
			var search_save_to_local_button = document.getElementById("search_save_button");   //button 
			search_save_to_local_button.style.display = "";
			var key1=localStorage.key(i);//localStorage的key
			var myTableSecondRow= document.getElementById('search_result').rows[1].cells;
			myTableSecondRow[0].innerHTML="<div contenteditable='true'>"+key1+"</div>"//序号
			var productName = handleLocalStorage("get",key1).match(/#(\S*?)##/)[1];//productName
			myTableSecondRow[1].innerHTML="<div contenteditable='true'>"+productName+"</div>";
			var model = handleLocalStorage("get",key1).match(/##(\S*?)###/)[1];//model型号
			myTableSecondRow[2].innerHTML="<div contenteditable='true'>"+model+"</div>";
			var quantity = handleLocalStorage("get",key1).match(/###(\S*?)####/)[1];//数量
			myTableSecondRow[3].innerHTML="<div contenteditable='true'>"+quantity+"</div>";
			return str;
		}
	}
	return "nothing";
}
//先搜索,改变信息,储存到loaclStroge
function searchChangeSave(){
var tb = document.getElementById('search_result');
var rows = tb.rows;	
var information = new Array();
var serialNumber=new Array();
for(var i = 1; i<rows.length;i++){
	//获取序号
	var str0=rows[i].cells[0].innerHTML;
	str0 = str0.match(/"true">(\S*)<\/div>/)[1];
	serialNumber[i]=str0;
	//获取信息 #玻璃##透明###1####
	information[i]="#";
	for(var j = 1; j<rows[i].cells.length; j++ ){    // 遍历该行的 td
		var str=rows[i].cells[j].innerHTML;
		//alert(str);
		str = str.match(/"true">(\S*)<\/div>/)[1];
		information[i]=information[i]+str;
		for(var k=0;k<j+1;k++){//
			information[i]=information[i]+"#";//#玻璃#透明##1###，方便正则匹配找出信息
		}
	}
}

if (!window.localStorage) {
  console.log('浏览器版本太低，不支持localStorage');
} 
else {
 let storage = window.localStorage;
 for(var i=1;i<rows.length;i++){
	 //alert(information[i]);
	handleLocalStorage('set',serialNumber[i],information[i]);
	//log.console(information[i]);
	}
}
 window.location.replace(window.location.href);//刷新页面，模拟f5
}


////x,y表示获取当前鼠标点击table中表格的位置（如果再按CTRL+V,就从当前表格处粘贴）
var x_in_table="not_click";
var y_in_table="not_click";
//获取鼠标点击table中某一个表格的位置,如果再按CTRL+V,就从当前表格处粘贴
//https://blog.csdn.net/heikerx/article/details/118895967
$("body").on("click", "td", function(){
   var column_num = parseInt( $(this).index() ) + 1;
   var row_num = parseInt( $(this).parent().index() )+1;    
   alert( "Row_num =" + row_num + "  ,  Rolumn_num ="+ column_num );   
});
/*
$(document).ready(function(){
		$("#oTable td").click(function(){
			alert("hello");
			var tdSeq = $(this).parent().find("td").index($(this)[0]);
			var trSeq = $(this).parent().parent().find("tr").index($(this).parent()[0]);
			alert("hello");
			//alert("第"+(x_in_table+1)+"行"+"第"+(y_in_table+1)+"列");
			
		});
	})
	*/
/*	
function doclick()   
{ 
	var td = event.srcElement; // 通过event.srcElement 获取激活事件的对象 td   
alert("行号：" + (td.parentElement.rowIndex + 1) + "，列号：" + td.cellIndex);   
}
*/
/*  
var td = event.srcElement; // 通过event.srcElement 获取激活事件的对象 td   
  
alert("行号：" + (td.parentElement.rowIndex+1) + "，内容：" + td.innerText);   
var tab = document.getElementById("test") ;  
 //表格行数  
 var rows = tab.rows.length ;  
//表格列数  
var cells = tab.rows.item(0).cells.length ;  
alert("行数"+rows+"列数"+cells); 
*/ 
 
//使用 Ctrl + V 可粘贴数据到table中
$(document).ready(function(){
	$(document.body).bind({
		paste: function(e) {
			if (window.clipboardData) {
				return ;
			}
			var clipboardData = e.originalEvent.clipboardData;
			processData(clipboardData);
		}
	});
	
	document.onkeyup = function(e) {
		if (window.clipboardData) {
			e = window.event || e;
			var keyCode = e.keyCode || e.which || e.charCode;
			var ctrlKey = e.ctrlKey || e.metaKey;
			if (ctrlKey && keyCode == 86) {
				var clipboardData = window.clipboardData;
				processData(clipboardData);
			}
		}
		return false;
	}

	var processData = function(clipboardData){
		$('table#oTable>tbody>tr.datarow').remove();
		//字符串形式转换为数组
		var data = clipboardData.getData('Text').split('\n');
		for(var m=0;m<data.length-1;m++){
			data[m]=data[m].toString();
			data[m]=data[m].split('\t');
		}
		//把获取的信息加到table中
		//alert(data[0]);
		 

		var oTable = document.getElementById("oTable");
		alert(x_in_table);
		for(var i = 0; i < data.length-1; i++) {
			
			
			//if(y_in_table=="not_click"){
				//tr = tbody.insertRow(tbody.rows.length);
			//}
			//else{
				//alert(y_in_table);
				//tr=tbody.insertRow(y_in_table);
			//}
			//alert(tbody.rows.length);
			
			for(var j=0;j<data[i].length;j++){
				oTable.rows[x_in_table+i].cells[y_in_table+j].innerHTML=data[i][j];
				//tr.insertCell(j).innerHTML = "<div contenteditable='true'>"+data[i][j]+"</div>";
			}	
		}
	};
});

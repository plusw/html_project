var how_many_otable_list=9;
function test(){
	//alert(copy(JSON.stringify(localStorage)));
}
function mySort(input_array){//�������������Ƚ������Լ�д��
	var array=input_array;
	var biggest_index;
	for ( var i=0;i<array.length;i++){
		 biggest_index=0;
		for (var j=0;j<array.length-i;j++){//�ҳ����ֵ
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
window.onload = function()//��ҳ����������js����
{
	getInformationfromloacl();
	addSearchRow();
}
//��װ����localStroge����
//https://blog.csdn.net/bocongbo/article/details/81772157       
//https://www.codehui.net/info/46.html   js����localstorage
function handleLocalStorage(method, key, value){ 
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
//����
var num=0;
function addRow(){
	var row = document.getElementById('tableBody').insertRow();
    for (var c = 0; c < how_many_otable_list; c += 1) {
        row.insertCell(c).innerHTML = "<div contenteditable='true'></div>";
    }
	row.insertCell(how_many_otable_list).innerHTML ='<input type="button" onClick="deleteRowStep0();" style="font-size:16px;" value="Delete" id="deleteButton"/>';//���һ������ǰ�ť,�Ҳ�����how_many_otable_list��
}
document.getElementById('add').addEventListener('click', function() {
    var row = document.getElementById('tableBody').insertRow();
    for (var c = 0; c < how_many_otable_list; c += 1) {
        row.insertCell(c).innerHTML = "<div contenteditable='true'></div>";
    }
	row.insertCell(how_many_otable_list).innerHTML ='<input type="button" onClick="deleteRowStep0();" style="font-size:16px;" value="Delete" id="deleteButton"/>';//���һ������ǰ�ť,�Ҳ�����how_many_otable_list��
});
function addSearchRow(){
	var row = document.getElementById('searchTableBody').insertRow();
    for (var c = 0; c < how_many_otable_list; c += 1) {
        row.insertCell(c).innerHTML = "<div contenteditable='true'></div>";
    }
}

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
function saveToLocal(){//���浱ǰ���ݵ�loaclStroge
	var tb = document.getElementById('oTable');
	var rows = tb.rows;	
	var information = new Array();//��Ʒ��Ϣ #����#͸��##1###
	var serialNumber = new Array();//���
	//alert(rows.length);
	for(var i = 1; i<rows.length;i++){
		//��ȡ���
		var str0=rows[i].cells[0].innerHTML;
		//alert(str0);
		if(str0.match(/>(\S*)</)[1]!=null){
			str0 = str0.match(/>(\S*)</)[1]; 
		}
		serialNumber[i-1]=str0;
		//��ȡ��Ϣ #����##͸��###1####
		information[serialNumber[i-1]]="";//��Ʒ��Ϣ��������Ӧ
		for(var j = 1; j<rows[i].cells.length-1; j++ ){    // �������е� td
			var str=rows[i].cells[j].innerHTML;//��ȡ�����ʽ <div ...>ҹ����<div>			
			try{
				str = str.match(/"true">(\S*)<\/div>/)[1];//����ƥ���ҵ�ҹ����
			}catch(error){
				//alert(str);
			}
			information[serialNumber[i-1]]=information[serialNumber[i-1]]+str;//����
			for(var k=0;k<1;k++){//
				information[serialNumber[i-1]]=information[serialNumber[i-1]]+"#";//����#,���ճ�   #����#͸��##1###  ����������ƥ���ҳ���Ϣ
			}
	   }
	}
	if (!window.localStorage) {
	  console.log('������汾̫�ͣ���֧��localStorage');
	} 
	else {
		 let storage = window.localStorage;
		 serialNumber.sort();//�����Array��������
		 for(var i=0;i<serialNumber.length;i++){
			var a=serialNumber[i];
			a=Number(a);
			if (!isNaN(a) && a!="")
			{
				//alert("������");
				handleLocalStorage('set',serialNumber[i], information[serialNumber[i]]);//���浽local
			//log.console(information[i]);
			}
			else{
				//alert("����Ų�������");
			}
		}
		window.location.replace(window.location.href);//ˢ��ҳ�棬ģ��f5
	}
}
//��ҳ����������js����
//��localStorage�����ݴ������
function getInformationfromloacl(){ 
	//alert(localStorage.length);
	//location.reload();
	var serialNumber=new Array();
	for(var i=0;i<localStorage.length;i++){
		serialNumber[i]=localStorage.key(i);
	}
	serialNumber=mySort(serialNumber);
	//alert(serialNumber);
	//alert(serialNumber.length);
	for(var i=0;i<serialNumber.length;i++){
		var information=localStorage.getItem(serialNumber[i]);
		//alert(information);
		information=information.split('#');
		//console.log(information);
		/*var oTable = document.getElementById("oTable");
		var tBodies = oTable.tBodies;
		
		var tbody = tBodies[0];
		var tr = tbody.insertRow(tbody.rows.length);
		*/
		addRow();
		//var td_1 = tr.insertCell(0);
		oTable.rows[oTable.rows.length-1].cells[0].innerHTML="<div contenteditable='true'>"+serialNumber[i]+"</div>";
		//td_1.innerHTML = "<div contenteditable='true'>"+serialNumber[i]+"</div>";//ǰ������
		
		for(var j=1;j<how_many_otable_list;j++){
			//var td=tr.insertCell(j);
			oTable.rows[oTable.rows.length-1].cells[j].innerHTML="<div contenteditable='true'>"+information[j-1]+"</div>";
			//td.innerHTML="<div contenteditable='true'>"+information[j-1]+"</div>";
		}
	}
}
//���localStorage
function clearAllLocaStorage(){
	localStorage.clear();
}

//��������,Ĭ������search_result,�������������search_result
function search(){
	let key=document.querySelector("#search_key");
	key=key.value;
	key="/"+key+"/i";
	for(var i=0;i<localStorage.length;i++){
		str=handleLocalStorage("get",localStorage.key(i));
		if(str.search(eval(key))!=-1){
			//alert(str);
			//����search_result
			var searchTable = document.getElementById("search_result");    
			searchTable.style.display = "";
			var search_save_to_local_button = document.getElementById("search_save_button");   //button 
			search_save_to_local_button.style.display = "";
			var key1=localStorage.key(i);//localStorage��key
			var myTableSecondRow= document.getElementById('search_result').rows[1].cells;
			myTableSecondRow[0].innerHTML="<div contenteditable='true'>"+key1+"</div>"//���
			var information = handleLocalStorage("get",key1).split("#");
			//alert(information);
			for(var i=1;i<how_many_otable_list;i++){
				myTableSecondRow[i].innerHTML="<div contenteditable='true'>"+information[i-1]+"</div>";
			}
			/*
			var model = handleLocalStorage("get",key1).match(/##(\S*?)###/)[1];//model�ͺ�
			myTableSecondRow[2].innerHTML="<div contenteditable='true'>"+model+"</div>";
			var quantity = handleLocalStorage("get",key1).match(/###(\S*?)####/)[1];//����
			myTableSecondRow[3].innerHTML="<div contenteditable='true'>"+quantity+"</div>";
			*/
			return str;
			
			
		}
	}
	return "nothing";
}
//������,�ı���Ϣ,���浽loaclStroge
function searchChangeSave(){	
var tb = document.getElementById('search_result');
var rows = tb.rows;	
var information = new Array();
var serialNumber=new Array();
for(var i = 1; i<rows.length;i++){
	//��ȡ���
	var str0=rows[i].cells[0].innerHTML;
	str0 = str0.match(/"true">(\S*)<\/div>/)[1];
	serialNumber[i]=str0;
	//��ȡ��Ϣ #����##͸��###1####
	information[i]="";
	for(var j = 1; j<rows[i].cells.length; j++ ){    // �������е� td
		var str=rows[i].cells[j].innerHTML;
		//alert(str);
		try{
			str = str.match(/"true">(\S*)<\/div>/)[1];
		}
		catch(error){
			console.log(str);
		}
		information[i]=information[i]+str;
		information[i]=information[i]+"#";//#����#͸��##1###����������ƥ���ҳ���Ϣ
		
	}
}
//alert(information);
if (!window.localStorage) {
  console.log('������汾̫�ͣ���֧��localStorage');
} 
else {
 let storage = window.localStorage;
 for(var i=1;i<rows.length;i++){
	 //alert(information[i]);
	handleLocalStorage('set',serialNumber[i],information[i]);
	//log.console(information[i]);
	}
}
 window.location.replace(window.location.href);//ˢ��ҳ�棬ģ��f5
}


////x,y��ʾ��ȡ��ǰ�����table�б���λ�ã�����ٰ�CTRL+V,�ʹӵ�ǰ���ճ����
var x_in_table="not_click";
var y_in_table="not_click";
var can_delete_row=false;
//��ȡ�����table��ĳһ������λ��,����ٰ�CTRL+V,�ʹӵ�ǰ���ճ��
//https://blog.csdn.net/heikerx/article/details/118895967
$("body").on("click", "td", function(){
   x_in_table = parseInt($(this).index());
   y_in_table = parseInt($(this).parent().index())+1;     
   if(can_delete_row==true){
	   deleteRowStep1();
	   can_delete_row=false;
   }
});
function deleteRowStep0(){
	can_delete_row=true;
}
function deleteRowStep1(){//ɾ��ĳһ����Ϣ��ɾ��localStroge����Ϣ
	//ɾ��localStroge����Ϣ
	str=oTable.rows[y_in_table].cells[0].innerHTML;
    var key=str.match(/"true">(\S*)<\//)[1];
	handleLocalStorage('remove',key);
	//ɾ��ĳһ�б����Ϣ
	for(var i=0;i<oTable.rows[y_in_table].cells.length-1;i++){
		oTable.rows[y_in_table].cells[i].innerHTML="";
	}
}
/*	
function doclick()   
{ 
	var td = event.srcElement; // ͨ��event.srcElement ��ȡ�����¼��Ķ��� td   
alert("�кţ�" + (td.parentElement.rowIndex + 1) + "���кţ�" + td.cellIndex);   
}
*/
/*  
var td = event.srcElement; // ͨ��event.srcElement ��ȡ�����¼��Ķ��� td   
  
alert("�кţ�" + (td.parentElement.rowIndex+1) + "�����ݣ�" + td.innerText);   
var tab = document.getElementById("test") ;  
 //�������  
 var rows = tab.rows.length ;  
//�������  
var cells = tab.rows.item(0).cells.length ;  
alert("����"+rows+"����"+cells); 
*/ 
 
//ʹ�� Ctrl + V ��ճ�����ݵ�table��
$(document).ready(function(){
	$(document.body).bind({
		paste: function(e) {
			var clipboardData = e.originalEvent.clipboardData;
			processData(clipboardData);
		}
	});
	/*
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
*/
	var processData = function(clipboardData){
		$('table#oTable>tbody>tr.datarow').remove();
		//�ַ�����ʽת��Ϊ����
		var data = clipboardData.getData('Text').split('\n');
		for(var m=0;m<data.length-1;m++){
			data[m]=data[m].toString();
			data[m]=data[m].split('\t');
		}
		data.pop();
		//data=[["a","b"],["c","d"]];
		//�ѻ�ȡ����Ϣ�ӵ�table��
		console.log(data);
		console.log(data.length);
		var tb = document.getElementById('tableBody');
		var rows = tb.rows;
		if(y_in_table+data.length-1>rows.length){
			var addRow_times=y_in_table+data.length-1-rows.length;
			for(var i=0;i<addRow_times;i++){
				addRow();
			}
		}

		var oTable = document.getElementById("oTable");
		
		for(var i = 0; i < data.length; i++) {
			
			
			//if(y_in_table=="not_click"){
				//tr = tbody.insertRow(tbody.rows.length);
			//}
			//else{
				//alert(y_in_table);
				//tr=tbody.insertRow(y_in_table);
			//}
			//alert(tbody.rows.length);
			//alert(y_in_table);
			//alert(x_in_table);
			for(var j=0;j<data[i].length;j++){
				oTable.rows[y_in_table+i].cells[x_in_table+j].innerHTML=data[i][j];
				//tr.insertCell(j).innerHTML = "<div contenteditable='true'>"+data[i][j]+"</div>";
			}	
		}
	};
});

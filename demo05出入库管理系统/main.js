function test(){
	alert(copy(JSON.stringify(localStorage)));
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
}
//��װ����localStroge����
//https://blog.csdn.net/bocongbo/article/details/81772157       
//https://www.codehui.net/info/46.html   js����localstorage
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
//����
var num=0;
function addRow(){
	//localStorage.clear();
	var oTable = document.getElementById("oTable");
	var tBodies = oTable.tBodies;
	var tbody = tBodies[0];
	//alert(tbody.rows.length);
	var tr = tbody.insertRow(tbody.rows.length);
	var td_1 = tr.insertCell(0);
	td_1.innerHTML = "<div contenteditable='true'></div>";
	num++;
	var td_2 = tr.insertCell(1);
	td_2.innerHTML = "<div contenteditable='true'></div>";
	var td_3 = tr.insertCell(2);
	td_3.innerHTML = "<div contenteditable='true'></div>";
	var td_4 = tr.insertCell(3);
	td_4.innerHTML = "<div contenteditable='true'></div>";
}
function saveToLocal(){//���浱ǰ���ݵ�loaclStroge
	var tb = document.getElementById('oTable');
	var rows = tb.rows;	
	var information = new Array();//��Ʒ��Ϣ #����#͸��##1###
	var serialNumber = new Array();//���
	//alert(rows.length);
	for(var i = 1; i<rows.length; i++ ){
		//��ȡ���
		var str0=rows[i].cells[0].innerHTML;
		//alert(str0);
		if(str0.match(/>(\S*)</)[1]!=null){
			str0 = str0.match(/>(\S*)</)[1]; 
		}
		serialNumber[i-1]=str0;
		//��ȡ��Ϣ #����##͸��###1####
		information[serialNumber[i-1]]="#";//��Ʒ��Ϣ��������Ӧ
		for(var j = 1; j<rows[i].cells.length; j++ ){    // �������е� td
			var str=rows[i].cells[j].innerHTML;//��ȡ�����ʽ <div ...>ҹ����<div>
			str = str.match(/"true">(\S*)<\/div>/)[1];//����ƥ���ҵ�ҹ����
			information[serialNumber[i-1]]=information[serialNumber[i-1]]+str;//����
			for(var k=0;k<j+1;k++){//
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
function getInformationfromloacl (){ //��localStorage�����ݴ������
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
		td_1.innerHTML = "<div contenteditable='true'>"+serialNumber[i]+"</div>";//ǰ������
		
		var td_2 = tr.insertCell(1);//��Ʒ����
		var productName = information.match(/#(\S*?)##/)[1];
		td_2.innerHTML = "<div contenteditable='true'>"+productName+"</div>";
		
		var td_3 = tr.insertCell(2);//�ͺ�
		var model = information.match(/##(\S*?)###/)[1];
		td_3.innerHTML = "<div contenteditable='true'>"+model+"</div>";
		
		var td_4 = tr.insertCell(3);//����
		var quantity = information.match(/###(\S*?)####/)[1];
		td_4.innerHTML = "<div contenteditable='true'>"+quantity+"</div>";
		
	}
}
function clearAllLocaStorage(){
	localStorage.clear();
}

function search(){//��������,Ĭ������search_result,�������������search_result
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
			var productName = handleLocalStorage("get",key1).match(/#(\S*?)##/)[1];//productName
			myTableSecondRow[1].innerHTML="<div contenteditable='true'>"+productName+"</div>";
			var model = handleLocalStorage("get",key1).match(/##(\S*?)###/)[1];//model�ͺ�
			myTableSecondRow[2].innerHTML="<div contenteditable='true'>"+model+"</div>";
			var quantity = handleLocalStorage("get",key1).match(/###(\S*?)####/)[1];//����
			myTableSecondRow[3].innerHTML="<div contenteditable='true'>"+quantity+"</div>";
			return str;
		}
	}
	return "nothing";

}
function searchChangeSave(){//�������ı���Ϣ,���浽loaclStroge
var tb = document.getElementById('search_result');
var rows = tb.rows;	
var information = new Array();
var serialNumber=new Array();
for(var i = 1; i<rows.length; i++ ){
	
	//��ȡ���
	var str0=rows[i].cells[0].innerHTML;
	str0 = str0.match(/"true">(\S*)<\/div>/)[1];
	serialNumber[i]=str0;
	
	//��ȡ��Ϣ #����##͸��###1####
	information[i]="#";
	for(var j = 1; j<rows[i].cells.length; j++ ){    // �������е� td
		var str=rows[i].cells[j].innerHTML;
		//alert(str);
		str = str.match(/"true">(\S*)<\/div>/)[1];
		information[i]=information[i]+str;
		for(var k=0;k<j+1;k++){//
			information[i]=information[i]+"#";//#����#͸��##1###����������ƥ���ҳ���Ϣ
		}
	}
}

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


//ʹ�� Ctrl + V ��ճ�����ݵ�table��
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

	var processData = function(clipboardData) {
		$('table#oTable>tbody>tr.datarow').remove();
		var data = clipboardData.getData('Text').split('\n');
		var dataHtml = '';
		for (var i = 0; i < data.length; i++) {
			if (!data[i]) {
				continue ;
			}
			var bugdetData = data[i].split('\t');
			dataHtml += '<tr class="datarow">';
			dataHtml += 	'<td>' + (bugdetData[0] || '&nbsp;') + '</td>';
			dataHtml += 	'<td>' + (bugdetData[1] || '&nbsp;') + '</td>';
			dataHtml += 	'<td>' + (bugdetData[2] || '&nbsp;') + '</td>';
			dataHtml += 	'<td>' + (bugdetData[3] || '&nbsp;') + '</td>';
			dataHtml += '</tr>';
		}
		$('table#oTable>tbody>tr').after(dataHtml);
	};
});
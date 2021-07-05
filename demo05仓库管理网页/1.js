import moment from 'moment';
 

function base64(s) {
return window.btoa(unescape(encodeURIComponent(s)));
}
 

function exportToExcel(columns, data, fileName) {
let str = '<tr><td>';
columns.forEach((item, index) => {
if (index === columns.length - 1) {
str += `${item.title}</td></tr>`;
} else {
str += `${item.title}</td><td>`;
}
});
data.forEach((item) => {
str += '<tr>';
columns.forEach((column) => {
// 处理时间戳格式数据
const value = (/[d|D]ate|[t|T]ime/.test(column.dataIndex) && typeof item[column.dataIndex] === 'number') ?
moment(item[column.dataIndex]).format('YYYY-MM-DD hh:mm:ss') : item[column.dataIndex];
str += `<td>${`${value || ''}\t`}</td>`;
});
str += '</tr>';
});
// Worksheet名字
const worksheet = 'Sheet1';
const uri = 'data:application/vnd.ms-excel;base64,';
// 表格模板数据
const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:x="urn:schemas-microsoft-com:office:excel"
xmlns="http://www.w3.org/TR/REC-html40">
<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
<x:Name>${worksheet}</x:Name>
<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
</head><body><table>${str}</table></body></html>`;
 

document.getElementById('exportToExcel').href = uri + base64(template);
// 补后缀
const name = fileName.split('.')[1] ? fileName : `${fileName}.xls`;
document.getElementById('exportToExcel').download = name;
document.getElementById('exportToExcel').click();
}
 

export default exportToExcel;
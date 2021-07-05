 function btnRst_Click() {
    alert("事件");
 }
 function addRow(){
    var oTable = document.getElementById("oTable");
    var tBodies = oTable.tBodies;
    var tbody = tBodies[0];
    var tr = tbody.insertRow(tbody.rows.length);
    var td_1 = tr.insertCell(0);
    td_1.innerHTML = "<div contenteditable='true'></div>";
    var td_2 = tr.insertCell(1);
    td_2.innerHTML = "<div contenteditable='true'></div>";
    }

</script>
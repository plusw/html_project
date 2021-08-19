var button = document.getElementById('btn'),
    table = document.getElementById('tableBody');
button.addEventListener('click', function() {
    var row = table.insertRow();
    for (var c = 0; c < 4; c += 1) {
        row.insertCell(c).innerHTML = "cell";
    }
});
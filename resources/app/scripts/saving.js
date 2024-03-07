const fs = require('fs');

function saveData() {
    const jsonData = JSON.stringify(employeesData, null, 2);
    fs.writeFileSync('resources/app/data.json', jsonData, 'utf-8');
}

function loadData() {
    const parse = JSON.parse(fs.readFileSync('resources/app/data.json', 'utf-8'));
    return parse;
}
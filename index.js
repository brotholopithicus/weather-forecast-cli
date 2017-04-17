const { processData, validZip } = require('./lib');
const requestify = require('node-requestify');
const zip = process.argv[2] && validZip(process.argv[2]) ? process.argv[2] : '01451';

async function getData(zip) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&mode=json&appid=46c7bc73ac6a9b519b290f7cc313fac1`;
    const data = await requestify(url).then(JSON.parse);
    return processData(data);
}

getData(zip);

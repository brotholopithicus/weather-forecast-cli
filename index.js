const parseData = require('./parse');
const requestify = require('./requestify');
const url = `http://api.openweathermap.org/data/2.5/forecast?zip=01451,us&mode=json&appid=46c7bc73ac6a9b519b290f7cc313fac1`;

async function getData() {
    const data = await requestify(url).then(JSON.parse);
    return parseData(data);
}

getData();

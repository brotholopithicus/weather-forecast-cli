const fs = require('fs');
const requestify = require('./requestify');

const url = `http://api.openweathermap.org/data/2.5/forecast?zip=01451,us&mode=json&appid=46c7bc73ac6a9b519b290f7cc313fac1`;

requestify(url).then(JSON.parse).then(data => parseData(data)).then(data => prettyData(data));

function parseData(data) {
    const arr = [];
    for (let i = 0; i < data.list.length; i++) {
        const date = data.list[i].dt_txt.split(' ')[0];
        if (!arr.includes(date)) arr.push(date);
    }
    for (let j = 0; j < arr.length; j++) {
        arr[j] = { date: arr[j], temps: [] }
        for (let k = 0; k < data.list.length; k++) {
            if (data.list[k].dt_txt.split(' ')[0] === arr[j].date) {
                const jsDate = new Date(data.list[k].dt_txt);
                const weekday = (new Date(data.list[k].dt_txt)).toDateString().split(' ')[0];
                const shortDate = { month: (jsDate.getMonth() + 1) < 10 ? '0' + (jsDate.getMonth() + 1) : jsDate.getMonth() + 1, day: jsDate.getDate() < 10 ? '0' + (jsDate.getDate()) : jsDate.getDate() };
                arr[j].weekday = weekday;
                arr[j].shortHand = `${shortDate.month}/${shortDate.day}`;
                arr[j].temps.push(data.list[k].main.temp);
            }
        }
    }
    arr.forEach(day => day.temps.sort());
    arr.forEach(day => {
        day.high = fahrenheitToKelvin(day.temps[day.temps.length - 1]);
        day.low = fahrenheitToKelvin(day.temps[0]);
    });
    return arr;
}

function checkExistingValue(obj, key, value) {
    return obj.hasOwnProperty(key) && obj[key] === value;
}

function fahrenheitToKelvin(K) {
    return Number((K * (9 / 5) - 459.67).toFixed(1));
}

function prettyData(data) {
    data.forEach(date => {
        if (data.indexOf(date) === 0) console.log('-------------')
        const str = `${date.weekday} - ${date.shortHand}:\nHigh: ${date.high} °F\nLow: ${date.low} °F\n-------------`;
        console.log(str);
    });
}

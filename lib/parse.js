const tempConvert = require('./tempConvert');

const tempUnitConvert = tempUnits();

module.exports = (data) => {
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
        arr[j].temps.sort();
        arr[j].high = tempUnitConvert(arr[j].temps[arr[j].temps.length - 1]);
        arr[j].low = tempUnitConvert(arr[j].temps[0])
    }
    return arr;
}

function tempUnits() {
    const unit = process.argv[3];
    if (unit) {
        if (unit === 'F' || unit === 'f') return tempConvert.kelvinToFahrenheit;
        if (unit === 'C' || unit === 'c') return tempConvert.kelvinToCelsius;
        if (unit === 'K' || unit === 'k') return tempConvert.kelvin;
    } else {
        return tempConvert.kelvinToFahrenheit;
    }
}

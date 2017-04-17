const parseData = require('./parse');
const printData = require('./prettyPrint');

exports.processData = (data) => {
    const parsed = parseData(data);
    return printData(parsed);
}

exports.validZip = require('./validZip');

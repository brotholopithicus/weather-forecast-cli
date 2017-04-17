function requestify(config, data) {
    if (typeof config === 'string') config = require('url').parse(config);
    return new Promise((resolve, reject) => {
        const protocol = config.protocol === 'https:' ? require('https') : require('http');
        const req = protocol.request(config, (res) => {
            if (res.statusCode < 200 || res.statusCode > 299) return reject(new Error(`Request Failed: StatusCode = ${res.statusCode}`));
            const body = [];
            res.on('data', (chunk) => body.push(chunk));
            res.on('end', () => resolve(body.join('')));
        });
        req.on('error', (err) => reject(err));
        if (data) req.write(data);
        req.end();
    });
}

module.exports = requestify;

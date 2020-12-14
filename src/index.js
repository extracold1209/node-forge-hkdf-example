const forge = require('node-forge');
const {util} = forge;

const hmac = forge.hmac.create();
const hashLength = 32; // sha256 hash result bytes length

function hmacExtract(key, data) {
    hmac.start('sha256', typeof key === 'string' ? util.hexToBytes(key) : key);
    hmac.update(data);
    return hmac.digest();
}

function hmacExpand(prk, length, info) {
    hmac.start('sha256', typeof prk === 'string' ? util.hexToBytes(prk) : prk);

    // originally repeat and putByte more. and info be added
    hmac.update(util.createBuffer().putByte(1));
    return hmac.digest();
}

function hkdf(data, saltHex, infoHex, byteLength = 16) {
    const info = util.hexToBytes(infoHex);
    const prk = hmacExtract(saltHex, data);
    const okm = util.createBuffer();
    const iterLength = Math.ceil(byteLength / hashLength);

    console.log('prk: ', prk.toHex());

    // will run 1 count
    let k = util.createBuffer();
    for (let i = 0; i < iterLength; i++) {
        k = hmacExpand(prk);
        okm.putBuffer(k);
    }

    console.log('okm: ', util.bytesToHex(okm.getBytes(byteLength)));
}

module.exports = hkdf;

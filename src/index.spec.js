const hkdf = require('./index');

test('hkdf', () => {
    const data = 'hello';

    const saltHex = '8e94ef805b93e683ff18';
    const infoHex = '8e94ef805b';
    const keyLength = 16;

    // @see https://asecuritysite.com/encryption/HKDF
    // prk expected: 1e133888e9fed8f9ceb210f88af26fa8f62f4190dd230f6317bf9f61ee07a690
    // okm expected: 13485067e21af17c0900f70d885f0259

    // prk result: 1e133888e9fed8f9ceb210f88af26fa8f62f4190dd230f6317bf9f61ee07a690
    // okm result: 6dbf2542d89fe608e5473c28fe7a05e0
    hkdf(data, saltHex, infoHex, keyLength);
})

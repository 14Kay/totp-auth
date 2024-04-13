/*
 * @Description: 
 * @Author: 14K
 * @Date: 2024-04-12 22:37:24
 * @LastEditTime: 2024-04-13 18:20:22
 * @LastEditors: 14K
 */
import util from './util';

export default class Crypto {

    private static blocksize = 16;

    public static sha1(message: number[]) {
        const m = util.bytesToWords(message);
        const l = message.length * 8;
        const w = [];
        let H0 = 1732584193;
        let H1 = -271733879;
        let H2 = -1732584194;
        let H3 = 271733878;
        let H4 = -1009589776;

        // Padding
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >>> 9) << 4) + 15] = l;

        for (let i = 0; i < m.length; i += 16) {

            let a = H0;
            let b = H1;
            let c = H2;
            let d = H3;
            let e = H4;

            for (let j = 0; j < 80; j++) {

                if (j < 16) w[j] = m[i + j];
                else {
                    const n: any = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
                    w[j] = (n << 1) | (n >>> 31);
                }

                const t = ((H0 << 5) | (H0 >>> 27)) + H4 + (w[j] >>> 0) + (
                    j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 :
                        j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 :
                            j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 :
                                (H1 ^ H2 ^ H3) - 899497514);

                H4 = H3;
                H3 = H2;
                H2 = (H1 << 30) | (H1 >>> 2);
                H1 = H0;
                H0 = t;
            }

            H0 += a;
            H1 += b;
            H2 += c;
            H3 += d;
            H4 += e;
        }

        return util.wordsToBytes([H0, H1, H2, H3, H4]);
    }

    public static hmac(counter: number, hexString: string) {
        const message = util.intToBytes(counter);
        let key = util.hexToBytes(hexString);

        // Allow arbitrary length keys
        key = key.length > this.blocksize * 4 ? this.sha1(key) : key;

        // XOR keys with pad constants
        let okey = key,
            ikey = key.slice(0);
        for (var i = 0; i < this.blocksize * 4; i++) {
            okey[i] ^= 0x5C;
            ikey[i] ^= 0x36;
        }

        return this.sha1(okey.concat(this.sha1(ikey.concat(message))));
    };
}
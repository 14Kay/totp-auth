import util from './util';
import crypto from './crypto';

// default digit
const DIGIT = 6;

export default class OTPAuth{
    
    public static hotp(key: string, counter: number, digit: number = DIGIT) {
        if(digit < 1 || digit > 10)
            digit = DIGIT;

        const decodedBytes = util.base32Decode(key);
        const hex = util.bytesToHex(decodedBytes);
        const digest = crypto.hmac(counter, hex);
        const offset = digest[digest.length - 1] & 0xf;
        const binary = (digest[offset] & 127) << 24 | (digest[offset + 1] & 255) << 16 | (digest[offset + 2] & 255) << 8 | (digest[offset + 3] & 255);
        
        return (binary % Math.pow(10, digit)).toString().padStart(digit, '0');
    }

    public static hotpVerify(code: string, secret: string, count: number): boolean {
        const timeWindow  = 2;

        for (let i = count - timeWindow ; i <= count + timeWindow ; i++) {
            const hotpCode = OTPAuth.hotp(secret, i, code.length);
            if (Number(hotpCode) === Number(code)) {
                return true
            }
        }

        return false
    }

    public static totp(secret: string, digit: number = DIGIT) {
        return OTPAuth.hotp(secret, this.getCount(), digit);
    }

    public static totpVerify(code: string, secret: string): boolean {
        return OTPAuth.hotpVerify(code, secret, this.getCount());
    }

    private static getCount(timestamp: number = Date.now(), period: number = 30) {
        return Math.floor((timestamp / 1000) / period);
    }

    private static totptimeUsed(timestamp: number = Date.now(), period: number = 30) {
        return Math.floor(timestamp / 1000) % period;
    }

    public static timeUsed() {
        return OTPAuth.totptimeUsed();
    }
    
    public static timeRemaining(period: number = 30) {
        return period - OTPAuth.totptimeUsed();
    }
}
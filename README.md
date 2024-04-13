<!--
 * @Description:
 * @Author: 14K
 * @Date: 2024-04-13 11:28:12
 * @LastEditTime: 2024-04-13 18:44:24
 * @LastEditors: 14K
-->
# totp-auth

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]

100% JS's TOTP authenticator with <strong>no dependencies.</strong> You can use it in any javascript environment

## Quick Start

```bash
npm install @14kay/totp-auth --save
```

```js
import TOTPAuth from '@14kay/totp-auth'

const secret = 'JBSWY3DPEHPK3PXP'
const code = TOTPAuth.totp(secret) // 666666
```
### Get time remaining

```js
const timeRemaining = OTPAuth.timeRemaining() // 15
```
### code Verify

```js
const isLegal = OTPAuth.totpVerify('123456') // true or false
```

## License

[MIT](./LICENSE) License © 2024-PRESENT [14K](https://github.com/14Kay)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@14kay/totp-auth?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@14kay/totp-auth
[npm-downloads-src]: https://img.shields.io/npm/dm/@14kay/totp-auth?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@14kay/totp-auth
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@14kay/totp-auth?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@14kay/totp-auth
[license-src]: https://img.shields.io/github/license/antfu/@14kay/totp-auth.svg?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@14kay/totp-auth

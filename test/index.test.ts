import { describe, test, expect, it } from 'vitest'
import OTPAuth from "../src/index";

const secret = "JBSWY3DPEHPK3PXP"
describe('totp', () => {
  it('default digit', () => {
    expect(OTPAuth.totp(secret).length).toBe(6)
  })

  it('custom digit', () => {
    expect(OTPAuth.totp(secret, 8).length).toBe(8)
  })
  
  it('totpVerify', () => {
    expect(OTPAuth.totpVerify("123456",secret)).toBe(false)
  })
  
  it('timeUsed', () => {
    expect(OTPAuth.timeUsed()).toBeLessThanOrEqual(30)
  })

  it('timeRemaining', () => {
    expect(OTPAuth.timeRemaining()).toBeLessThanOrEqual(30)
  })
})




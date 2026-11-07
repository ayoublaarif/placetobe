import { timingSafeEqual } from 'node:crypto'

function digits(value: string) {
  return value.replace(/\D/g, '')
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function matches(input: string, secret: string) {
  const given = Buffer.from(input)
  const expected = Buffer.from(secret)
  if (given.length !== expected.length) return false
  return timingSafeEqual(given, expected)
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : ''
  const voucher = typeof body?.voucher === 'string' ? body.voucher.trim() : ''
  const phoneDigits = digits(phone)

  if (name.length < 2 || !validEmail(email) || phoneDigits.length < 8 || phoneDigits.length > 15) {
    return { ok: false, reason: 'details' }
  }

  const config = useRuntimeConfig()
  if (!config.giftVoucher || !matches(voucher, config.giftVoucher)) {
    return { ok: false, reason: 'voucher' }
  }

  const saved = await appendSheetRow({
    sheet: 'Sheet1',
    name,
    email,
    phone: `'${phone}`,
    voucher,
  })
  if (!saved) return { ok: false, reason: 'save' }

  return { ok: true }
})

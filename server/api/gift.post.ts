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

  const saved = await saveRedemption({ name, email, phone, voucher })
  if (!saved) return { ok: false, reason: 'save' }

  return { ok: true }
})

async function saveRedemption(row: { name: string, email: string, phone: string, voucher: string }) {
  const { giftSheetUrl, giftSheetSecret } = useRuntimeConfig()
  if (!giftSheetUrl || !giftSheetSecret) return false

  const response = await fetch(giftSheetUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      secret: giftSheetSecret,
      name: row.name,
      email: row.email,
      phone: `'${row.phone}`,
      voucher: row.voucher,
    }),
    redirect: 'manual',
  })

  let text = ''
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('location')
    if (!location) return false
    const result = await fetch(location)
    text = await result.text()
  }
  else {
    text = await response.text()
  }

  try {
    return JSON.parse(text).ok === true
  }
  catch {
    return false
  }
}

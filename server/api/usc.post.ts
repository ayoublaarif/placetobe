function digits(value: string) {
  return value.replace(/\D/g, '')
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : ''
  const phoneDigits = digits(phone)

  if (name.length < 2 || !validEmail(email) || phoneDigits.length < 8 || phoneDigits.length > 15) {
    return { ok: false, reason: 'details' }
  }

  const saved = await appendSheetRow({
    sheet: 'usc sheet',
    name,
    email,
    phone: `'${phone}`,
  })
  if (!saved) return { ok: false, reason: 'save' }

  return { ok: true }
})

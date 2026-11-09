import { classDayLabel, classStartsAt, findFreeClass } from '../../shared/free-schedule'

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
  const classDate = typeof body?.classDate === 'string' ? body.classDate : ''
  const classHour = typeof body?.classHour === 'string' ? body.classHour : ''
  const className = typeof body?.className === 'string' ? body.className : ''
  const phoneDigits = digits(phone)

  if (name.length < 2 || !validEmail(email) || phoneDigits.length < 8 || phoneDigits.length > 15) {
    return { ok: false, reason: 'details' }
  }

  const chosen = findFreeClass(classDate, classHour, className)
  const taughtByLilly = chosen?.teacher.trim().toLowerCase() === 'lilly'
  if (!chosen || !taughtByLilly || classStartsAt(chosen) <= Date.now()) {
    return { ok: false, reason: 'class' }
  }

  const saved = await appendSheetRow({
    sheet: 'free street',
    name,
    email,
    phone: `'${phone}`,
    classDay: classDayLabel(chosen.date),
    classHour: chosen.hour,
    className: chosen.name,
  })
  if (!saved) return { ok: false, reason: 'save' }

  return { ok: true }
})

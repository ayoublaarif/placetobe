export async function appendSheetRow(fields: Record<string, string>) {
  const { giftSheetUrl, giftSheetSecret } = useRuntimeConfig()
  if (!giftSheetUrl || !giftSheetSecret) return false

  const response = await fetch(giftSheetUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ secret: giftSheetSecret, ...fields }),
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

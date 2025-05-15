export function isTokenExpired(token: string): boolean {
  try {
    const [, payloadBase64] = token.split('.')
    const payloadJson = atob(payloadBase64)
    const payload = JSON.parse(payloadJson)

    const currentTime = Math.floor(Date.now() / 1000)
    return payload.exp < currentTime
  } catch (error) {
    console.error('Invalid token', error)
    return true
  }
}

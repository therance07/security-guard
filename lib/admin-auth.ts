export const ADMIN_EMAIL = 'admin@groupeyannick.com'
export const ADMIN_PASSWORD = 'Admin2024!'

export function checkAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD
}

export function setAdminSession() {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('admin_auth', 'true')
  }
}

export function clearAdminSession() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('admin_auth')
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('admin_auth') === 'true'
  }
  return false
}

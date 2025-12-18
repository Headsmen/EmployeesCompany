export const isValidTelegramUrl = (url: string): boolean => {
  const telegramPatterns = [
    /^https:\/\/t\.me\/[a-zA-Z0-9_]{5,32}$/,
    /^@[a-zA-Z0-9_]{5,32}$/,
    /^[a-zA-Z0-9_]{5,32}$/
  ]

  return telegramPatterns.some(pattern => pattern.test(url))
}

export const formatTelegramUrl = (url: string): string => {
  if (!url.trim()) return ''

  const trimmed = url.trim()

  if (trimmed.startsWith('https://t.me/')) {
    return trimmed
  }

  if (trimmed.startsWith('@')) {
    return `https://t.me/${trimmed.slice(1)}`
  }

  return `https://t.me/${trimmed}`
}

export const formatFullName = (lastName: string, firstName: string, middleName?: string): string => {
  const parts = []
  if (lastName.trim()) parts.push(lastName.trim())
  if (firstName.trim()) parts.push(firstName.trim())
  if (middleName?.trim()) parts.push(middleName.trim())

  return parts.join(' ')
}

export const parseFullName = (fullName: string): { lastName: string; firstName: string; middleName: string } => {
  const parts = fullName.split(' ')
  return {
    lastName: parts[0] || '',
    firstName: parts[1] || '',
    middleName: parts[2] || '',
  }
}

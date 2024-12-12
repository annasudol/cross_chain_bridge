export function truncateString(str: string, maxLength = 18) {
  if (str.length <= 18) return str
  return `${str.slice(0, maxLength)}...${str.slice(-9)}`
}

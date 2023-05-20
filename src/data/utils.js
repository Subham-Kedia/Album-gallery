export const getDataFromLocalStorage = (key, defaultValue) => {
  const value = localStorage.getItem(key)
  if (value) return JSON.parse(value)
  return defaultValue
}

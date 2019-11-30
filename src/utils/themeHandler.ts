const isDarkTheme = () => {
  return localStorage.getItem('isDarkTheme') === 'true'
}

const saveTheme = (isDark: boolean) => {
  localStorage.setItem('isDarkTheme', String(isDark))
}

export const themeHandler = {
  isDarkTheme,
  saveTheme
}

;(() => {
  const e = localStorage.getItem('vueuse-color-scheme') || '',
    a = window.matchMedia('(prefers-color-scheme: dark)').matches
  ;(!e || e === 'auto' ? a : e === 'dark') && document.documentElement.classList.add('dark')
})()

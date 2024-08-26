export const clipboard = (text: string) => {
  return new Promise((resolve) => {
    if (navigator.clipboard?.writeText) {
      return resolve(navigator.clipboard.writeText(text))
    }

    const textarea = document.createElement('textarea')
    textarea.style.position = 'absolute'
    textarea.style.clip = 'rect(0 0 0 0)'
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy', true)
    textarea.remove()
    return resolve(true)
  })
}

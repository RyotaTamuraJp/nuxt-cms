const omitText = (text, n=200) => {
  if (text.length <= n) {
    return text
  }
  let omit = text.slice(0, n)
  return omit + "..."
}

export default ({}, inject) => {
  inject('omitText', omitText);
}

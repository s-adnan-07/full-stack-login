export const minimum8Characters = (x: string) => x.length >= 8
export const contains1Number = (x: string) => /\d/.test(x)
export const contains1Letter = (x: string) => /[a-z]/.test(x)
export const contains1UpperCaseLetter = (x: string) => /[A-Z]/.test(x)
export const contains1SpChar = (x: string) => /[^\r\n\w]/.test(x)

const passwordValid = (x: string) => {
  return (
    minimum8Characters(x) &&
    contains1Number(x) &&
    contains1Letter(x) &&
    contains1UpperCaseLetter(x) &&
    contains1SpChar(x)
  )
}

export default passwordValid

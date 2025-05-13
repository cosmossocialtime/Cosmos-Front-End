export default function formatPhone(phoneNumber: string) {
  const { extractDigits, getRemainingDigitsCount } =
    digitsExtractor(phoneNumber)

  return `+${extractDigits(2)} (${extractDigits(2)}) ${
    getRemainingDigitsCount() === 8
      ? [extractDigits(4), extractDigits(4)].join('-')
      : getRemainingDigitsCount() === 9
      ? `${extractDigits(1)}${extractDigits(4)}-${extractDigits(4)}`
      : ''
  }`
}

function digitsExtractor(numberString: string) {
  const digitsInReverse = numberString.split('').reverse()
  const extractDigits = (count = 0) => {
    const digits = []
    while (count-- > 0) digits.push(digitsInReverse.pop())
    return digits.join('')
  }
  return {
    extractDigits,
    getRemainingDigitsCount: () => digitsInReverse.length,
  }
}

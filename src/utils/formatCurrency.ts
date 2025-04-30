export default function formatCurrency(value: string) {
  const numericValue = value.replace(/\D/g, '')
  if (numericValue === '') return ''

  const formattedValue = (parseFloat(numericValue) / 100).toLocaleString(
    'pt-BR',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )

  return `R$ ${formattedValue}`
}

type CurrencyDisplayProps = {
  code?: string
  value?: number | string
  showCode?: boolean
  className?: string
}

const getCurrencyPrefix = (code?: string): string => {
  switch (code?.toUpperCase()) {
    case 'USD':
    case 'US':
    case 'UUS':
      return 'US$'
    case 'BRL':
    case 'BLR':
      return 'R$'
    case 'EUR':
      return '€'
    case 'GBP':
      return '£'
    case 'JPY':
      return '¥'
    default:
      return '$'
  }
}

const formatCurrencyValue = (value: number | string | undefined) => {
  if (value === undefined || value === null || value === '') return ''

  const numericValue =
    typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value

  if (isNaN(numericValue)) return String(value)

  return new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue)
}

const CurrencyDisplay = ({
  code,
  value,
  showCode = false,
  className,
}: CurrencyDisplayProps) => {
  const upperCode = code?.toUpperCase() ?? ''
  const prefix = getCurrencyPrefix(upperCode)
  const formattedValue = formatCurrencyValue(value)

  return (
    <span className={className}>
      {prefix} {formattedValue} {showCode && upperCode !== prefix ? upperCode : ''}
    </span>
  )
}

export default CurrencyDisplay

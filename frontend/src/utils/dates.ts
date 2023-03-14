
export const formatDate = (dateStr: string, locale: string): string => {
  return new Date(dateStr).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
}

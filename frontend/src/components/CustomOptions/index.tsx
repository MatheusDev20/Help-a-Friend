import { ReactNode } from 'react'

interface Props {
  value: string
  children: ReactNode
}

export const CustomOptions = ({ value, children }: Props) => {
  return <option value={value} style={{ color: 'black' }}>{children}</option>
}

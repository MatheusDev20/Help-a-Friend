import { ReactNode } from 'react'

interface Props {
  value: string
  children: ReactNode
}

export const CustomOptions = ({ value, children }: Props): JSX.Element => {
  return <option value={value} style={{ color: 'black' }}>{children}</option>
}

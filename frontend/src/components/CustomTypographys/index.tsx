import { Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface Props {
  size: string
  children: ReactNode
}

export const CustomTypography = ({ size, children }: Props): JSX.Element => {
  return (
      <Text fontSize={size}>{children}</Text>
  )
}

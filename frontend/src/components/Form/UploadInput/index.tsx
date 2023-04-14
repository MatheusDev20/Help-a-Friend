import { Flex, Input as ChakraInput, InputElementProps, Text } from '@chakra-ui/react'
import React, { forwardRef, ForwardRefRenderFunction, ReactNode, useRef, useState } from 'react'

interface UploadInputProps extends InputElementProps {
  multiple: boolean
  children?: ReactNode
  handleUpload: any
  errMsg: string
  hasErr: boolean
}

const UploadInputBase: ForwardRefRenderFunction<HTMLInputElement, UploadInputProps> =
  ({ multiple, children, handleUpload, errMsg, hasErr, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [err, setErr] = useState<string>('')

    const handleClick = (): void => inputRef.current?.click()

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
      if (!e.currentTarget.files?.length) {
        setErr(errMsg)
      }

      if (e.currentTarget.files != null) handleUpload(Array.from(e.currentTarget.files))
    }

    return (
      <>
        <Flex w='100%'
          align='center'
          justify='center'
          onClick={handleClick}
          gap={3}
          flexDirection='column'>
          <ChakraInput
            type='file'
            multiple={multiple}
            ref={inputRef}
            hidden
            onChange={handleChange}
            {...rest}
          />
          {children}
          {hasErr && (
            <Text
              fontSize='sm'
              fontWeight='bold'
              color='red.400'>
              {errMsg}
            </Text>
          )}

        </Flex>
      </>
    )
  }

export const UploadInput = forwardRef(UploadInputBase)

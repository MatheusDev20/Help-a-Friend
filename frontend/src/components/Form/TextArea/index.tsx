import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { Textarea as ChakraTextArea, FormControl, FormLabel, Flex, TextareaProps as ChakraTextAreaProps, FormErrorMessage, Icon, FormHelperText, Text } from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

interface TextAreaProps extends ChakraTextAreaProps {
  label?: string
  err?: FieldError
  icon?: any
  helperMsg?: string
  errMsg?: string
  size: any
}
const TextAreaBase: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> =
  ({ label, placeholder, err, icon, helperMsg, errMsg, size, ...rest },
    ref) => {
    return <>
      <FormControl isInvalid={!(err == null)}>
        <Flex>
          {!!label && <FormLabel color='white' fontWeight='bold' >{label}</FormLabel>}
          {!!icon && icon}
        </Flex>

        <ChakraTextArea
          color='#fff'
          focusBorderColor='green.300'
          bgColor='gray.900'
          variant='filled'
          placeholder={placeholder}
          _placeholder={{ color: 'white' }}
          _hover={
            { bgColor: 'gray.900' }
          }
          size={size}
          ref={ref}
          {...rest}
        />
        {/* {err && <FormErrorMessage
          fontWeight='bold'
          fontStyle='italic'
          fontSize='0.7rem'>{err.message}</FormErrorMessage>} */}
        {(err == null)
          ? (<FormHelperText fontStyle={'italic'}>{helperMsg}</FormHelperText>)
          : (
            <FormErrorMessage
              fontWeight='bold'
              fontStyle='italic'
              fontSize='0.7rem'
            >
              {errMsg}
            </FormErrorMessage>
            )}
      </FormControl>
    </>
  }
export const TextArea = forwardRef(TextAreaBase)

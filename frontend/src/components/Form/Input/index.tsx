import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { Input as ChakraInput, FormControl, FormLabel, Flex, InputProps as ChakraInputProps, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  label?: string
  err?: FieldError
  icon?: any
  helperMsg?: string
  errMsg?: string
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
  ({ label, type, placeholder, err, icon, helperMsg, errMsg, ...rest },
    ref) => {
    return <>
      <FormControl isInvalid={!(err == null)}>
        <Flex>
          {!!label && <FormLabel color='white' fontWeight='bold' >{label}</FormLabel>}
          {!!icon && icon}
        </Flex>

        <ChakraInput
          type={type}
          color='#fff'
          focusBorderColor='green.300'
          bgColor='gray.900'
          variant='filled'
          placeholder={placeholder}
          _placeholder={{ color: 'white' }}
          _hover={
            { bgColor: 'gray.900' }
          }
          size='lg'
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
export const Input = forwardRef(InputBase)

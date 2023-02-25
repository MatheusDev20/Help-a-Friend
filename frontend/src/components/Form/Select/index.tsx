import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { Input as ChakraInput, SelectFieldProps, FormControl, FormLabel, Flex, InputProps as ChakraInputProps, FormErrorMessage, Icon, FormHelperText, Text, Select as ChakraSelect } from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

interface SelectProps extends SelectFieldProps {
  label?: string
  err?: FieldError
  icon?: any
  helperMsg?: string
  errMsg?: string
  size: any
}
const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> =
  ({ label, placeholder, err, icon, helperMsg, errMsg, size, ...rest },
    ref) => {
    return <>
      <FormControl isInvalid={!(err == null)}>
        <Flex>
          {!!label && <FormLabel color='white' fontWeight='bold' >{label}</FormLabel>}
          {!!icon && icon}
        </Flex>

        <ChakraSelect
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
export const Select = forwardRef(SelectBase)

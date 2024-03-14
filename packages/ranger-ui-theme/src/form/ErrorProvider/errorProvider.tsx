import { createContext, useContext, useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import type { FieldError } from 'react-hook-form'

export type FormErrorProviderProps = {
  onError: (error: FieldError) => string | undefined
}

const FormErrorProviderContext = createContext<FormErrorProviderProps>({
  onError: (error: FieldError) => error?.message
})

const FormErrorProvider = ({ children, onError }: PropsWithChildren<FormErrorProviderProps>) => {
  const contextValue = useMemo(
    () => ({
      onError
    }),
    []
  )

  return (
    <FormErrorProviderContext.Provider value={contextValue}>
      {children}
    </FormErrorProviderContext.Provider>
  )
}

export default FormErrorProvider

export const useFormError = () => {
  const errorCtx = useContext<FormErrorProviderProps>(FormErrorProviderContext)
  return errorCtx?.onError
}

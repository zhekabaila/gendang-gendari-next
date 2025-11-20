'use client'

import { ChangeEvent, forwardRef, useEffect, useMemo } from 'react'
import { Input } from '../ui/input'
import { IoMdSearch } from 'react-icons/io'
import _ from 'lodash'

export interface InputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChangeValue?: (value: string) => void
  value?: string
  hideIcon?: boolean
}

const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
  ({ className, onChangeValue, value, hideIcon = false, ...props }, ref) => {
    const debouncedResults = useMemo(() => {
      const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChangeValue) onChangeValue(event.target.value)
      }

      return _.debounce(handleChange, 500)
    }, [onChangeValue])

    useEffect(() => {
      return () => {
        debouncedResults.cancel()
      }
    }, [debouncedResults])

    return (
      <div className="w-full relative">
        <Input ref={ref} className={className} onChange={debouncedResults} value={value} {...props} />
        {!hideIcon && (
          <div
            className="
          absolute top-[50%] 
          -translate-y-[50%] 
          right-[1.5px] 
          p-1.5 
          text-muted-foreground 
          rounded-full">
            <IoMdSearch fontSize={20} />
          </div>
        )}
      </div>
    )
  }
)

InputSearch.displayName = 'InputSearch'

export default InputSearch

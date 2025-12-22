import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error = false, ...props }, ref) => {
    const baseStyles = 'w-full px-3 py-2 text-sm border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0'
    const normalStyles = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    const errorStyles = 'border-red-300 focus:border-red-500 focus:ring-red-500'

    return (
      <input
        ref={ref}
        className={`${baseStyles} ${error ? errorStyles : normalStyles} ${className}`}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

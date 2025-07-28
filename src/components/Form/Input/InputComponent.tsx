"use client"

import InputMask from "react-input-mask"
import { Controller, type FieldValues, type Path, type PathValue } from "react-hook-form"
import { CurrencyInput } from "react-currency-mask"

// Types
import type { InputProps } from "./input.types"

function InputComponent<T extends FieldValues = FieldValues>({
  label,
  error,
  control,
  name,
  mask,
  handleBlur,
  handleFocus,
  handleOnChange,
  placeholder,
  disabled,
  type,
  defaultValue,
  required,
  inputMode,
  tabindex,
  loading,
  icon,
  min,
  inputType = "default",
  className,
  autoFocus = false,
  currencyCode = 'USD',
}: InputProps<T>) {
  const inputStyles = `
    bg-white
    border
    border-neutral-300
    focus:border-[#0b3954]
    text-neutral-900
    text-sm
    h-10
    w-full
    rounded-md
    py-2
    px-3
    font-medium
    outline-none
    transition-all
    duration-300
    focus:ring-0
    placeholder:text-neutral-400
    disabled:opacity-50
    disabled:cursor-not-allowed
    read-only:bg-neutral-100
    ${!!icon && 'pl-8'}
    ${
      error ? "border-red-500" : ""
    } ${icon ? "pr-11" : ""} ${className || ""}
  `

  const getCurrencyPrefix = (code?: string): string => {
    switch (code?.toUpperCase()) {
      case 'USD':
      case 'US':
      case 'UUS':
        return 'USD'
      case 'BRL':
      case 'BLR':
        return 'BRL'
      case 'EUR':
        return 'EUR'
      case 'GBP':
        return 'GBP'
      case 'JPY':
        return 'JPY'
      default:
        return 'USD'
    }
  }

  return (
    <div className="w-full relative">
      {label && (
        <label className="block text-sm/6 font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue as PathValue<T, Path<T>>}
        rules={required ? { required: "Este campo é obrigatório" } : undefined}
        render={({ field }) => (
          <>
            {inputType === "mask" && (
              <InputMask
                {...field}
                maskChar={null}
                alwaysShowMask={false}
                autoFocus={autoFocus}
                type={type}
                min={min}
                step="any"
                inputMode={inputMode || "text"}
                disabled={disabled || loading}
                placeholder={placeholder}
                value={field.value || ""}
                className={inputStyles}
                onBlur={() => handleBlur?.(field.value)}
                onFocus={() => handleFocus?.(field.value)}
                onChange={(e) => {
                  field.onChange(e)
                  handleOnChange?.(e.target.value)
                }}
                tabIndex={tabindex || 1}
                mask={mask || "(99) 99999-9999"}
              />
            )}
            {(inputType === "default" || inputType === "datetime") && (
              <input
                {...field}
                autoFocus={autoFocus}
                type={inputType === "datetime" ? "date" : type}
                min={min}
                inputMode={inputMode || "text"}
                step="any"
                disabled={disabled || loading}
                placeholder={placeholder}
                value={field.value || ""}
                className={inputStyles}
                onBlur={() => handleBlur?.(field.value)}
                onFocus={() => handleFocus?.(field.value)}
                onChange={(e) => {
                  field.onChange(e)
                  handleOnChange?.(inputMode === "numeric" ? Number(e.target.value) : e.target.value)
                }}
                tabIndex={tabindex || 1}
              />
            )}
            {inputType === "money" && (
              <CurrencyInput
                value={field.value}
                currency={getCurrencyPrefix(currencyCode) || 'USD'}
                onChangeValue={(_, value) => {
                  field.onChange(value)
                }}
                InputElement={
                  <input
                    readOnly={disabled || loading}
                    tabIndex={tabindex || 1}
                    className={inputStyles}
                  />
                }
              />
            )}
          </>
        )}
      />
      {icon && <div className="absolute top-0 py-2 px-2 opacity-45">{icon}</div>}
      {error?.message && <span className="text-xs text-red-500 mt-1 block">{error.message}</span>}
    </div>
  )
}

export default InputComponent

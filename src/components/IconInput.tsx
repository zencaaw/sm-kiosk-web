import type { ChangeEventHandler, RefObject } from "react";
import type { JSX } from "react/jsx-dev-runtime";

export default function IconInput({ Icon, hidden, ref, type, placeholder, onChange, defaultValue, defaultChecked, step, minLength, disabled, className }: {
  Icon?: JSX.Element,
  hidden?: boolean,
  ref?: RefObject<HTMLInputElement | null>,
  type?: string,
  placeholder?: string,
  onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined
  defaultValue?: string | number
  defaultChecked?: boolean
  step?: number
  minLength?: number
  disabled?: boolean
  className?: string
}) {
  return (
    <div className={`relative ${hidden ? "hidden":""}`}>
      <span className="absolute z-10 left-2 top-1/2 -translate-y-1/2" >{Icon}</span>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        defaultChecked={defaultChecked}
        step={step}
        minLength={minLength}
        disabled={disabled}
        className={className}
      />
    </div>
  )
}

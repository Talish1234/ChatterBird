import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const InputField = ({
  disabled = false,
  label,
  error = "",
  type = "text",
  value = "",
  onChangeInputField,
  className,
  placeholder,
  required = false,
  ref,
  onKeyDown
}: {
  disabled?: boolean;
  label?: string;
  error?: string;
  type: string;
  value: string;
  onChangeInputField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
  ref?:any;
  onKeyDown?:any;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="w-full">
      <div
        className={`flex flex-col w-full ${className}`}
      >
        <label className="block text-teal-700 font-bold text-md dark:text-teal-600">
          {label}
        </label>
       <div className="flex justify-center items-center gap-2 relative">
  <input
    ref={ref}
    onKeyDown={onKeyDown}
    required={required}
    placeholder={placeholder}
    disabled={disabled}
    type={type === "password" ? (showPassword ? "text" : "password") : type}
    value={value}
    onChange={onChangeInputField}
    className="focus:outline-none text-md w-full bg-transparent pr-8"
  />

  {type === "password" && !disabled && (
    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="cursor-pointer pointer-events-auto"
      >
        {showPassword ? <FaRegEye size={20} /> : <FaEyeSlash size={20} />}
      </button>
    </div>
  )}
</div>

      </div>
      <span className="text-red-500 text-sm">{error}</span>
    </div>
  );
};

export default InputField;

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Shield,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Camera,
  Upload,
  Fingerprint,
} from "lucide-react";

interface InputFieldProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  success?: string;
  disabled?: boolean;
  [key: string]: any;
}
const InputField: React.FC<InputFieldProps> = ({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  success,
  disabled = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative mb-4">
      <div
        className={`relative flex items-center border-2 rounded-xl transition-all duration-300 ${
          error
            ? "border-red-400 bg-red-50"
            : success
            ? "border-green-400 bg-green-50"
            : focused
            ? "border-slate-500 bg-white shadow-lg"
            : "border-slate-300 bg-slate-50 hover:border-slate-400"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Icon
          size={20}
          className={`ml-4 ${
            error
              ? "text-red-500"
              : success
              ? "text-green-500"
              : "text-slate-400"
          }`}
        />

        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 px-4 py-4 bg-transparent outline-none text-slate-800 placeholder-slate-500"
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mr-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {success && <Check size={20} className="mr-4 text-green-500" />}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <X size={16} className="mr-1" />
          {error}
        </p>
      )}

      {success && (
        <p className="mt-2 text-sm text-green-600 flex items-center">
          <Check size={16} className="mr-1" />
          {success}
        </p>
      )}
    </div>
  );
};

export { InputField };

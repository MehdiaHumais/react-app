import React, { useState, useRef, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({
  label,
  value,
  onChange,
  placeholder,
  className = '',
  error,
  showGenerateBtn = false,
  onGenerate,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Update the input type when showPassword changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.type = showPassword ? 'text' : 'password';
      // Force the browser to re-render the input
      const currentValue = inputRef.current.value;
      inputRef.current.type = 'password'; // Temporarily set to password
      inputRef.current.type = showPassword ? 'text' : 'password'; // Then set to desired type
      inputRef.current.value = currentValue; // Restore the value
    }
  }, [showPassword]);

  const handleGeneratePassword = () => {
    if (onGenerate) {
      onGenerate();
    }
  };

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <div className="relative">
        <input
          ref={inputRef}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 pr-10 bg-gray-800 border ${error ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
          style={{
            ...props.style,
            MozAppearance: 'textfield',
            WebkitAppearance: 'none',
            WebkitTextSecurity: showPassword ? 'none' : 'disc',
          }}
          {...props}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 flex items-center p-3"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
        </button>
      </div>
      {showGenerateBtn && onGenerate && (
        <div className="mt-2">
          <button
            type="button"
            onClick={handleGeneratePassword}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Generate Password
          </button>
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordInput;
import React from 'react';

const AuthInput = ({ label, type = 'text', placeholder, value, onChange, error }) => {
  return (
    <div className="space-y-1">
      <label className="block text-division-light/80 text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2 
          bg-black/50 
          border ${error ? 'border-red-500' : 'border-division-orange/20'} 
          text-division-light 
          rounded-sm
          placeholder-division-light/30
          focus:outline-none focus:border-division-orange
          transition-colors
        `}
      />
      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
    </div>
  );
};

export default AuthInput; 
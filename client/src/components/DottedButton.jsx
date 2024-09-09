import React from 'react';

const DottedButton = ({ children, onClick, disabled }) => {
  return (
    <button
      className={`rounded-2xl border-2 border-dashed border-dark bg-light px-6 py-3 font-semibold text-black transition-all duration-300
      hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black]
      active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default DottedButton;

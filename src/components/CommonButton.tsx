import React from 'react';

interface CommonButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  animate?: boolean;
}

export default function CommonButton({
  children,
  type = 'button',
  onClick,
  className = '',
  disabled = false,
  animate = false,
}: CommonButtonProps) {
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick();
    setIsAnimating(true);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      onAnimationEnd={() => setIsAnimating(false)}
      disabled={disabled}
      className={`
        w-full h-12 rounded-xl text-[15px] font-semibold transition-colors duration-200
        ${disabled
          ? 'bg-[#e7dfd7] text-[#fff]'
          : 'bg-[#19C419] text-white hover:bg-[#13a313] active:scale-95 shadow-md'}
        ${isAnimating && animate ? 'animate-wiggle' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

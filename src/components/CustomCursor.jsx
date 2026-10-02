import React, { useEffect, useState } from 'react';

export default function CustomCursor({ cursorState }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  const isHovered = cursorState.text !== '';

  return (
    <div
      className="hidden md:flex fixed pointer-events-none z-50 items-center justify-center transition-transform duration-75 ease-out rounded-full mix-blend-difference"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
        width: isHovered ? '70px' : '16px',
        height: isHovered ? '70px' : '16px',
        backgroundColor: '#FFFFFF',
      }}
    >
      {isHovered && (
        <span className="text-[10px] font-bold tracking-widest uppercase text-black select-none">
          {cursorState.text}
        </span>
      )}
    </div>
  );
}
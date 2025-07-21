import type { CSSProperties, ReactNode } from 'react';
import closeIcon from '../../assets/images/close.png';
import maximizeIcon from '../../assets/images/maximise.png';
import minimizeIcon from '../../assets/images/minimize.png';
import heartIcon from '../../assets/images/heart.png'

type CardProps = {
  score?: number
  lives?: number
  height?: string;
  innerHeight?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function Card({
  score,
  lives = 0,
  height = 'max-h-150',
  innerHeight = 'max-h-130',
  className = '',
  style,
  children,
}: CardProps) {
  return (
    <div
      className={`relative bg-[rgba(255,255,255,0.25)] rounded-md shadow-xl max-w-200 ${height} backdrop-blur-xs border border-gray-600 ${className}`}
      style={{ background: 'var(--window-background-glass-stripes)', ...style }}
    >
      <div className="arial flex justify-between items-center h-10 border-b border-white/30 rounded-t-xl select-none">
        <div className="ml-4">{typeof score !== 'undefined' && `Score: ${score}`}</div>
        <span className="lives-display">
          {Array.from({ length: lives }).map((_, i) => (
            <img
              key={i}
              src={heartIcon}
              alt="life"
              className="inline w-7 h-5 mx-0.5"
            />
          ))}
        </span>
        <div className="flex mr-2 mt-[-21px]">
          <button
            style={{ backgroundImage: `linear-gradient(#ffffff80, #ffffff4d 45%, #0000001a 50%, #0000001a 75%, #ffffff80)`, }}
            className="card-button-gradient flex items-center justify-center w-[32px] h-[20px] rounded-bl-[5px] border border-gray-600 shadow-[0_0_7px_3px_#e68e75,var(--control-inset-shadow)] transition-opacity duration-300"
          >
            <img src={minimizeIcon} alt="minimize" className='w-[11px] h-[5px]' />
          </button>
          <button
            style={{ backgroundImage: `linear-gradient(#ffffff80, #ffffff4d 45%, #0000001a 50%, #0000001a 75%, #ffffff80)`, }}
            className="card-button-gradient flex items-center justify-center w-[32px] h-[20px] border border-gray-600 shadow-[0_0_7px_3px_#e68e75,var(--control-inset-shadow)] transition-opacity duration-300"
          >
            <img src={maximizeIcon} alt="maximize" className='w-[11px] h-[10px]' />
          </button>
          <button
            style={{
              backgroundImage: `radial-gradient(circle at -60% 50%, #0007 5% 10%, #0000 50%), radial-gradient(circle at 160% 50%, #0007 5% 10%, #0000 50%), linear-gradient(#e0a197e5, #cf796a 25% 50%, #d54f36 50%)`,
            }}
            className="card-button-gradient-close flex items-center justify-center w-[45px] h-[20px] rounded-br-[5px] border border-gray-600 shadow-[0_0_7px_3px_#e68e75,var(--control-inset-shadow)] transition-opacity duration-300"
          >
            <img src={closeIcon} alt="close" className="w-[11px] h-[10px]" />
          </button>
        </div>
      </div>

      {/* Inner white shell for page content */}
      <div
        className={`bg-[rgba(255,255,255,1)] px-4 py-4 max-w-3xl ${innerHeight} m-2 border border-black overflow-y-auto overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
}

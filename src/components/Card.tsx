import type { CSSProperties, ReactNode } from "react";

type CardProps = {
    score?: number;
    height?: string;
    innerHeight?: string;
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
};

export function Card ({
    score,
    height = 'max-h-130',
    innerHeight = 'max-h-110',
    className = '',
    style,
    children,
}: CardProps) {
    return (
        <div
      className={`relative bg-[rgba(255,255,255,0.25)] rounded-xl shadow-xl max-w-200 ${height} backdrop-blur-xs border border-gray-600 ${className}`}
      style={{ background: 'var(--window-background-glass-stripes)', ...style }}
    >
      <div className="arial left-0 px-4 py-3 h-10 border-b border-white/30 rounded-t-xl select-none">
        {score !== undefined && <>Score: {score}</>}
        <button className="bg-[url(../assets/minimize.png)]">
        </button>
        <button></button>
        <button></button>
      </div>

      {/* Inner white shell for page content */}
      <div className={`bg-[rgba(255,255,255,1)] px-4 py-4 max-w-3xl ${innerHeight} m-2 border border-black overflow-y-auto`}>
        {children}
      </div>
    </div>
    );
}
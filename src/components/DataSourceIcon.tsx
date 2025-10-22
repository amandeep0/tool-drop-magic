interface DataSourceIconProps {
  type: 'equity' | 'options' | 'futures' | 'crypto' | 'search' | 'fundamental' | 'congress' | 'minute-equity' | 'minute-options';
  className?: string;
}

const DataSourceIcon = ({ type, className = "w-5 h-5" }: DataSourceIconProps) => {
  const icons = {
    equity: (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 20L9 14L13 18L21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
        <path d="M21 10H17M21 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
        <circle cx="9" cy="14" r="1.5" fill="currentColor"/>
        <circle cx="13" cy="18" r="1.5" fill="currentColor"/>
        <circle cx="21" cy="10" r="1.5" fill="currentColor"/>
        <circle cx="3" cy="20" r="1.5" fill="currentColor"/>
      </svg>
    ),
    options: (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="7" cy="7" r="1.5" fill="currentColor"/>
        <circle cx="17" cy="7" r="1.5" fill="currentColor"/>
      </svg>
    ),
    futures: (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12L7 8L11 12L15 8L19 12L21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
        <path d="M3 17L7 13L11 17L15 13L19 17L21 15" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
        <rect x="2" y="5" width="2" height="16" fill="currentColor"/>
      </svg>
    ),
    crypto: (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 6V18M9 9H13.5C14.328 9 15 9.672 15 10.5C15 11.328 14.328 12 13.5 12H9H14C14.828 12 15.5 12.672 15.5 13.5C15.5 14.328 14.828 15 14 15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
      </svg>
    ),
    search: (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
        <circle cx="11" cy="11" r="3" fill="currentColor"/>
      </svg>
    ),
    fundamental: (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M3 9H21M3 15H21" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 3V21M15 3V21" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),
    congress: (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
        <path d="M6 20V8M10 20V8M14 20V8M18 20V8" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
        <path d="M3 8L12 3L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
        <rect x="11" y="1" width="2" height="3" fill="currentColor"/>
      </svg>
    ),
    'minute-equity': (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 12L12 7M12 12L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
        <circle cx="12" cy="7" r="1" fill="currentColor"/>
      </svg>
    ),
    'minute-options': (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
        <path d="M8 4L9 5M16 4L15 5M4 12H2M22 12H20M7 19L6 20M17 19L18 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
      </svg>
    ),
  };

  return icons[type] || icons.equity;
};

export default DataSourceIcon;

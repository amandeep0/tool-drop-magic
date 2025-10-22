const ProBadge = () => {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 border-2 border-accent transition-colors hover:bg-accent/10">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
          fill="currentColor" 
          className="text-accent" 
          stroke="currentColor" 
          strokeWidth="1"
        />
      </svg>
      <span className="text-xs font-bold tracking-wider text-accent">PRO PLAN</span>
    </div>
  );
};

export default ProBadge;

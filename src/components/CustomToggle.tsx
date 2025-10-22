interface CustomToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const CustomToggle = ({ checked, onCheckedChange }: CustomToggleProps) => {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className="relative w-12 h-6 rounded-full transition-colors border border-primary"
      style={{
        backgroundColor: checked ? 'hsl(28 100% 60%)' : 'transparent',
      }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 bg-primary rounded-full transition-transform"
        style={{
          transform: checked ? 'translateX(24px)' : 'translateX(2px)',
        }}
      />
    </button>
  );
};

import { useState } from 'react';

interface SophisticatedToggleProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const SophisticatedToggle = ({ defaultChecked = false, onChange }: SophisticatedToggleProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      onClick={handleToggle}
      className="relative inline-flex h-6 w-11 items-center transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 border-2 border-primary"
      style={{ borderRadius: '2px' }}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`inline-block h-4 w-4 transform transition-transform ${
          checked ? 'translate-x-6 bg-accent' : 'translate-x-0.5 bg-primary'
        }`}
        style={{ borderRadius: '1px' }}
      />
    </button>
  );
};

export default SophisticatedToggle;

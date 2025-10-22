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
      className={`relative inline-flex h-7 w-12 items-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-full ${
        checked ? 'bg-accent' : 'bg-primary'
      }`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`inline-block h-5 w-5 transform transition-transform rounded-full ${
          checked ? 'translate-x-6 bg-primary' : 'translate-x-1 bg-background'
        }`}
      />
    </button>
  );
};

export default SophisticatedToggle;

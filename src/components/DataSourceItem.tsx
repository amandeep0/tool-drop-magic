import { DataSourceConfig } from "@/config/dataSources";
import { CustomToggle } from "./CustomToggle";
import ProBadge from "./ProBadge";

interface DataSourceItemProps {
  source: DataSourceConfig;
  isSelected: boolean;
  onToggle: () => void;
  isFocused?: boolean;
}

export const DataSourceItem = ({ source, isSelected, onToggle, isFocused }: DataSourceItemProps) => {
  return (
    <div 
      className={`flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0 ${
        isFocused ? 'bg-accent/10 ring-2 ring-inset ring-accent' : ''
      }`}
      data-source-id={source.id}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center">
          {source.icon}
        </div>
        <span className="font-mono text-sm font-medium">{source.name}</span>
      </div>
      
      <div className="flex items-center gap-3">
        {source.isPro && <ProBadge />}
        {!source.isPro && (
          <CustomToggle checked={isSelected} onCheckedChange={onToggle} />
        )}
      </div>
    </div>
  );
};

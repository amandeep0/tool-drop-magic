import { useState } from 'react';
import { Search, X, ChevronUp } from 'lucide-react';
import DataSourceIcon from './DataSourceIcon';
import SophisticatedToggle from './SophisticatedToggle';
import ProBadge from './ProBadge';

interface DataSource {
  id: string;
  name: string;
  iconType: 'equity' | 'options' | 'futures' | 'crypto' | 'search' | 'fundamental' | 'congress' | 'minute-equity' | 'minute-options';
  enabled: boolean;
  isPro?: boolean;
}

const DataSourcesDropdown = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dataSources, setDataSources] = useState<DataSource[]>([
    { id: '1', name: 'Equity Data (EOD)', iconType: 'equity', enabled: true },
    { id: '2', name: 'Options Data (EOD)', iconType: 'options', enabled: true },
    { id: '3', name: 'Futures Data (EOD)', iconType: 'futures', enabled: true },
    { id: '4', name: 'Crypto Data (EOD)', iconType: 'crypto', enabled: true },
    { id: '5', name: 'Web Search', iconType: 'search', enabled: true },
    { id: '6', name: 'Fundamental Data (Scalar Research)', iconType: 'fundamental', enabled: true },
    { id: '7', name: 'Congress Trades', iconType: 'congress', enabled: true },
    { id: '8', name: 'Equity Data (1-Minute Level)', iconType: 'minute-equity', enabled: false, isPro: true },
    { id: '9', name: 'Options Data (1-Minute Level)', iconType: 'minute-options', enabled: false, isPro: true },
  ]);

  const enabledCount = dataSources.filter(ds => ds.enabled).length;

  const filteredSources = dataSources.filter(source =>
    source.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (id: string, newValue: boolean) => {
    setDataSources(prev =>
      prev.map(source =>
        source.id === id ? { ...source, enabled: newValue } : source
      )
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      {/* Header Section */}
      <div className="border-2 border-primary bg-card mb-4">
        <div
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-muted/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-3">
            <X className="w-5 h-5" />
            <h2 className="text-lg font-bold tracking-wide">Add data sources</h2>
            <span className="inline-flex items-center justify-center w-7 h-7 bg-primary text-primary-foreground text-sm font-bold rounded-sm">
              {enabledCount}
            </span>
          </div>
          <ChevronUp className={`w-5 h-5 transition-transform ${isOpen ? '' : 'rotate-180'}`} />
        </div>
      </div>

      {/* Content Section */}
      {isOpen && (
        <div className="border-2 border-primary bg-card">
          <div className="p-6">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-md focus:border-primary focus:outline-none transition-colors font-mono text-muted-foreground"
              />
            </div>

            {/* Data Sources List */}
            <div className="max-h-[500px] overflow-y-auto pr-2">
              <div className="space-y-0">
                {filteredSources.map((source, index) => (
                  <div
                    key={source.id}
                    className={`flex items-center justify-between py-5 px-2 hover:bg-muted/5 transition-colors ${
                      index !== filteredSources.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <DataSourceIcon type={source.iconType} className="w-5 h-5 text-primary" />
                      <span className="font-mono tracking-wide text-foreground">{source.name}</span>
                    </div>

                    {source.isPro ? (
                      <ProBadge />
                    ) : (
                      <SophisticatedToggle
                        defaultChecked={source.enabled}
                        onChange={(checked) => handleToggle(source.id, checked)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSourcesDropdown;

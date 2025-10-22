import { useState } from "react";
import { X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataSourceItem } from "./DataSourceItem";
import { dataSourcesConfig } from "@/config/dataSources";

const DataSourcesDropdown = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSources, setSelectedSources] = useState<string[]>([
    "equity-eod",
    "options-eod",
    "futures-eod",
    "crypto-eod",
    "web-search",
    "fundamental-scalar",
    "congress-trades",
  ]);

  const filteredSources = dataSourcesConfig.filter((source) =>
    source.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSource = (id: string) => {
    setSelectedSources((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedCount = selectedSources.length;

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between h-12 px-4 border-2 border-primary bg-background hover:bg-muted transition-colors"
        >
          <div className="flex items-center gap-3">
            <X className="h-4 w-4" />
            <span className="font-mono font-semibold">Add data sources</span>
            <div className="flex gap-1">
              {selectedCount > 0 && (
                <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded">
                  {selectedCount}
                </span>
              )}
            </div>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        {isOpen && (
          <div className="absolute top-full mt-2 w-full bg-card border-2 border-primary rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.15)] z-50 overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-background border-border font-mono"
                />
              </div>
            </div>

            <div className="max-h-[500px] overflow-y-auto">
              {filteredSources.map((source) => (
                <DataSourceItem
                  key={source.id}
                  source={source}
                  isSelected={selectedSources.includes(source.id)}
                  onToggle={() => toggleSource(source.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataSourcesDropdown;

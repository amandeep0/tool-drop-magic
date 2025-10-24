import { useState, useRef, useEffect } from "react";
import { X, Search, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataSourceItem } from "./DataSourceItem";
import { dataSourcesSections, DataSourceSection } from "@/config/dataSources";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const DataSourcesDropdown = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState<DataSourceSection | null>(null);
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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sideSearchInputRef = useRef<HTMLInputElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const filteredSections = dataSourcesSections.filter((section) =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sideFilteredSources = selectedSection
    ? selectedSection.sources.filter((source) =>
        source.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const toggleSource = (id: string) => {
    setSelectedSources((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedCount = selectedSources.length;

  // Reset focused index when search query changes
  useEffect(() => {
    setFocusedIndex(-1);
  }, [searchQuery]);

  // Scroll focused item into view in side panel
  useEffect(() => {
    if (focusedIndex >= 0 && listContainerRef.current && selectedSection) {
      const focusedElement = listContainerRef.current.querySelector(
        `[data-source-id="${sideFilteredSources[focusedIndex]?.id}"]`
      );
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [focusedIndex, sideFilteredSources, selectedSection]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!sideFilteredSources.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => 
          prev < sideFilteredSources.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
      case 'Tab':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < sideFilteredSources.length) {
          const focusedSource = sideFilteredSources[focusedIndex];
          if (!focusedSource.isPro) {
            toggleSource(focusedSource.id);
          }
        }
        break;
      case 'Escape':
        e.preventDefault();
        setFocusedIndex(-1);
        sideSearchInputRef.current?.blur();
        break;
    }
  };

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
                  ref={searchInputRef}
                  placeholder="Search sections"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-background border-border font-mono"
                />
              </div>
            </div>

            <div className="max-h-[500px] overflow-y-auto">
              {filteredSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold">{section.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {section.sources.filter(s => selectedSources.includes(s.id)).length}/{section.sources.length}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}

        <Sheet open={!!selectedSection} onOpenChange={(open) => !open && setSelectedSection(null)}>
          <SheetContent side="right" className="w-full sm:w-[540px] sm:max-w-[540px]">
            <SheetHeader>
              <SheetTitle className="font-mono">{selectedSection?.title}</SheetTitle>
            </SheetHeader>
            
            <div className="mt-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={sideSearchInputRef}
                  placeholder="Search data sources"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-10 h-10 bg-background border-border font-mono"
                />
              </div>

              <div ref={listContainerRef} className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {sideFilteredSources.map((source, index) => (
                  <DataSourceItem
                    key={source.id}
                    source={source}
                    isSelected={selectedSources.includes(source.id)}
                    onToggle={() => toggleSource(source.id)}
                    isFocused={index === focusedIndex}
                  />
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default DataSourcesDropdown;

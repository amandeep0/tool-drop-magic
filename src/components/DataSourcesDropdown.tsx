import { useState, useRef, useEffect } from "react";
import { X, Search, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataSourceItem } from "./DataSourceItem";
import { dataSourcesSections, DataSourceSection } from "@/config/dataSources";

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
  const [focusedSectionIndex, setFocusedSectionIndex] = useState(-1);
  const [sideDropdownTop, setSideDropdownTop] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const sectionsContainerRef = useRef<HTMLDivElement>(null);

  const filteredSections = dataSourcesSections.filter((section) =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sideDisplayedSources = selectedSection ? selectedSection.sources : [];

  const toggleSource = (id: string) => {
    setSelectedSources((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedCount = selectedSources.length;

  // Reset focused index when search query changes
  useEffect(() => {
    setFocusedIndex(-1);
    setFocusedSectionIndex(-1);
  }, [searchQuery]);

  // Scroll focused item into view in side panel
  useEffect(() => {
    if (focusedIndex >= 0 && listContainerRef.current && selectedSection) {
      const focusedElement = listContainerRef.current.querySelector(
        `[data-source-id="${sideDisplayedSources[focusedIndex]?.id}"]`
      );
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [focusedIndex, sideDisplayedSources, selectedSection]);

  // Scroll focused section into view
  useEffect(() => {
    if (focusedSectionIndex >= 0 && sectionsContainerRef.current) {
      const focusedElement = sectionsContainerRef.current.querySelector(
        `[data-section-id="${filteredSections[focusedSectionIndex]?.id}"]`
      );
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [focusedSectionIndex, filteredSections]);

  const handleMainKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredSections.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedSectionIndex((prev) => 
          prev < filteredSections.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedSectionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedSectionIndex >= 0 && focusedSectionIndex < filteredSections.length) {
          setSelectedSection(filteredSections[focusedSectionIndex]);
          setFocusedSectionIndex(-1);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setFocusedSectionIndex(-1);
        searchInputRef.current?.blur();
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
                  onKeyDown={handleMainKeyDown}
                  className="pl-10 h-10 bg-background border-border font-mono"
                />
              </div>
            </div>

            <div ref={sectionsContainerRef} className="max-h-[500px] overflow-y-auto">
              {filteredSections.map((section, index) => (
                <button
                  key={section.id}
                  data-section-id={section.id}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const containerRect = sectionsContainerRef.current?.getBoundingClientRect();
                    if (containerRect) {
                      setSideDropdownTop(rect.top - containerRect.top);
                    }
                    setSelectedSection(section);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0 text-left ${
                    index === focusedSectionIndex ? 'bg-primary/10 ring-2 ring-inset ring-primary' : ''
                  }`}
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

        {selectedSection && (
          <div 
            className="absolute left-full ml-2 w-[500px] bg-card border-2 border-primary rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.15)] z-50 overflow-hidden"
            style={{ top: `${sideDropdownTop}px` }}
          >
            <div className="p-4 border-b border-border">
              <h3 className="font-mono font-semibold">{selectedSection.title}</h3>
            </div>

            <div ref={listContainerRef} className="max-h-[500px] overflow-y-auto">
              {sideDisplayedSources.map((source, index) => (
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
        )}
      </div>
    </div>
  );
};

export default DataSourcesDropdown;

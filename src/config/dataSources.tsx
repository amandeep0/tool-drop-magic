import DataSourceIcon from "@/components/DataSourceIcon";

export interface DataSourceConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  isPro?: boolean;
}

export interface DataSourceSection {
  id: string;
  title: string;
  sources: DataSourceConfig[];
}

export const dataSourcesSections: DataSourceSection[] = [
  {
    id: "equity",
    title: "Equity",
    sources: [
      {
        id: "equity-eod",
        name: "End of Day Data",
        icon: <DataSourceIcon type="equity" className="w-5 h-5" />,
      },
      {
        id: "equity-1min",
        name: "1-Minute Level Data",
        icon: <DataSourceIcon type="minute-equity" className="w-5 h-5" />,
        isPro: true,
      },
    ],
  },
  {
    id: "options",
    title: "Options",
    sources: [
      {
        id: "options-eod",
        name: "End of Day Data",
        icon: <DataSourceIcon type="options" className="w-5 h-5" />,
      },
      {
        id: "options-1min",
        name: "1-Minute Level Data",
        icon: <DataSourceIcon type="minute-options" className="w-5 h-5" />,
        isPro: true,
      },
    ],
  },
  {
    id: "futures",
    title: "Futures",
    sources: [
      {
        id: "futures-eod",
        name: "End of Day Data",
        icon: <DataSourceIcon type="futures" className="w-5 h-5" />,
      },
    ],
  },
  {
    id: "crypto",
    title: "Crypto",
    sources: [
      {
        id: "crypto-eod",
        name: "End of Day Data",
        icon: <DataSourceIcon type="crypto" className="w-5 h-5" />,
      },
    ],
  },
  {
    id: "fundamental",
    title: "Fundamental Data",
    sources: [
      {
        id: "fundamental-scalar",
        name: "Scalar Research",
        icon: <DataSourceIcon type="fundamental" className="w-5 h-5" />,
      },
      {
        id: "congress-trades",
        name: "Congress Trades",
        icon: <DataSourceIcon type="congress" className="w-5 h-5" />,
      },
    ],
  },
  {
    id: "other",
    title: "Other",
    sources: [
      {
        id: "web-search",
        name: "Web Search",
        icon: <DataSourceIcon type="search" className="w-5 h-5" />,
      },
    ],
  },
];

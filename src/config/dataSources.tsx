import DataSourceIcon from "@/components/DataSourceIcon";

export interface DataSourceConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  isPro?: boolean;
}

export const dataSourcesConfig: DataSourceConfig[] = [
  {
    id: "equity-eod",
    name: "Equity Data (EOD)",
    icon: <DataSourceIcon type="equity" className="w-5 h-5" />,
  },
  {
    id: "options-eod",
    name: "Options Data (EOD)",
    icon: <DataSourceIcon type="options" className="w-5 h-5" />,
  },
  {
    id: "futures-eod",
    name: "Futures Data (EOD)",
    icon: <DataSourceIcon type="futures" className="w-5 h-5" />,
  },
  {
    id: "crypto-eod",
    name: "Crypto Data (EOD)",
    icon: <DataSourceIcon type="crypto" className="w-5 h-5" />,
  },
  {
    id: "web-search",
    name: "Web Search",
    icon: <DataSourceIcon type="search" className="w-5 h-5" />,
  },
  {
    id: "fundamental-scalar",
    name: "Fundamental Data (Scalar Research)",
    icon: <DataSourceIcon type="fundamental" className="w-5 h-5" />,
  },
  {
    id: "congress-trades",
    name: "Congress Trades",
    icon: <DataSourceIcon type="congress" className="w-5 h-5" />,
  },
  {
    id: "equity-1min",
    name: "Equity Data (1-Minute Level)",
    icon: <DataSourceIcon type="minute-equity" className="w-5 h-5" />,
    isPro: true,
  },
  {
    id: "options-1min",
    name: "Options Data (1-Minute Level)",
    icon: <DataSourceIcon type="minute-options" className="w-5 h-5" />,
    isPro: true,
  },
];

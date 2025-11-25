export enum ViewState {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
}

export interface StockData {
  name: string;
  value: number;
  pnl: number;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  icon: string;
}

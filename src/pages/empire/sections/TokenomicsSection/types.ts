export interface TokenAllocation {
  name: string;
  percentage: number;
  amount: string;
  color: string;
}

export interface TokenomicsData {
//   totalSupply: string;
  tokenSymbol: string;
  contractAddress: string;
  allocations: TokenAllocation[];
}
import { TokenomicsData } from '../types';

export const tokenomicsData: TokenomicsData = {
//   totalSupply: '10,000,000,000',
  tokenSymbol: 'EMPEROR',
  contractAddress: '',
  allocations: [
    {
      name: 'Open Market',
      percentage: 60,
      amount: '4,500,000,000',
      color: '#3675e1'
    },
    {
      name: 'Presale',
      percentage: 20,
      amount: '2,850,000,000',
      color: '#a6269e'
    },
    {
      name: 'Partnerships',
      percentage: 5,
      amount: '1,500,000,000',
      color: '#d82566'
    },
    {
      name: 'Community & Rewards',
      percentage: 3,
      amount: '500,000,000',
      color: '#63c143'
    },
    {
      name: 'Marketing',
      percentage: 7,
      amount: '650,000,000',
      color: '#f29325'
    },
    {
      name: 'Team',
      percentage: 5,
      amount: '650,000,000',
      color: '#e34e2a'
    }
  ]
};
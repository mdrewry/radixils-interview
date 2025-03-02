import { faker } from '@faker-js/faker';

// Types for reinsurance data
export interface Policy {
  id: string;
  policyNumber: string;
  insurer: string;
  premium: number;
  startDate: Date;
  endDate: Date;
  risk: 'Low' | 'Medium' | 'High';
  category: string;
  claimsPaid: number;
  status: 'Active' | 'Expired' | 'Canceled';
}

export interface InsuranceCompany {
  id: string;
  name: string;
  country: string;
  totalPolicies: number;
  totalPremium: number;
  activeSince: Date;
  riskScore: number;
}

export interface ClaimData {
  id: string;
  policyId: string;
  date: Date;
  amount: number;
  status: 'Pending' | 'Approved' | 'Denied' | 'Under Review';
  description: string;
  claimant: string;
}

export interface AnalyticsData {
  totalPremium: number;
  totalClaims: number;
  lossRatio: number;
  activePolicies: number;
  expiredPolicies: number;
  highRiskPolicies: number;
  monthlyPremiums: { month: string; premium: number }[];
  monthlyClaims: { month: string; claims: number }[];
}

// Generate mock data
export function generatePolicies(count: number): Policy[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    policyNumber: faker.string.alphanumeric(8).toUpperCase(),
    insurer: faker.company.name(),
    premium: parseFloat(faker.finance.amount({ min: 10000, max: 1000000 })),
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    risk: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
    category: faker.helpers.arrayElement(['Property', 'Casualty', 'Marine', 'Aviation', 'Cyber']),
    claimsPaid: parseFloat(faker.finance.amount({ min: 0, max: 500000 })),
    status: faker.helpers.arrayElement(['Active', 'Expired', 'Canceled']),
  }));
}

export function generateInsuranceCompanies(count: number): InsuranceCompany[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    country: faker.location.country(),
    totalPolicies: faker.number.int({ min: 10, max: 1000 }),
    totalPremium: parseFloat(faker.finance.amount({ min: 1000000, max: 100000000 })),
    activeSince: faker.date.past({ years: 20 }),
    riskScore: faker.number.float({ min: 1, max: 10, fractionDigits: 1 }),
  }));
}

export function generateClaims(policies: Policy[], count: number): ClaimData[] {
  return Array.from({ length: count }, () => {
    const policy = faker.helpers.arrayElement(policies);
    return {
      id: faker.string.uuid(),
      policyId: policy.id,
      date: faker.date.between({ from: policy.startDate, to: new Date() }),
      amount: parseFloat(faker.finance.amount({ min: 1000, max: 500000 })),
      status: faker.helpers.arrayElement(['Pending', 'Approved', 'Denied', 'Under Review']),
      description: faker.lorem.sentence(),
      claimant: faker.person.fullName(),
    };
  });
}

export function generateAnalytics(policies: Policy[], claims: ClaimData[]): AnalyticsData {
  const totalPremium = policies.reduce((sum, policy) => sum + policy.premium, 0);
  const totalClaims = claims.reduce((sum, claim) => sum + claim.amount, 0);
  const activePolicies = policies.filter(p => p.status === 'Active').length;
  const expiredPolicies = policies.filter(p => p.status === 'Expired').length;
  const highRiskPolicies = policies.filter(p => p.risk === 'High').length;

  // Generate monthly data for the last 12 months
  const monthlyPremiums = Array.from({ length: 12 }, (_, i) => {
    const monthDate = new Date();
    monthDate.setMonth(monthDate.getMonth() - i);
    const monthName = monthDate.toLocaleString('default', { month: 'short' });
    return {
      month: monthName,
      premium: parseFloat(faker.finance.amount({ min: 500000, max: 2000000 })),
    };
  }).reverse();

  const monthlyClaims = Array.from({ length: 12 }, (_, i) => {
    const monthDate = new Date();
    monthDate.setMonth(monthDate.getMonth() - i);
    const monthName = monthDate.toLocaleString('default', { month: 'short' });
    return {
      month: monthName,
      claims: parseFloat(faker.finance.amount({ min: 100000, max: 1000000 })),
    };
  }).reverse();

  return {
    totalPremium,
    totalClaims,
    lossRatio: totalClaims / totalPremium,
    activePolicies,
    expiredPolicies,
    highRiskPolicies,
    monthlyPremiums,
    monthlyClaims,
  };
}

// Create static data that can be imported - now as private variables
const mockPolicies = generatePolicies(50);
const mockInsurers = generateInsuranceCompanies(15);
const mockClaims = generateClaims(mockPolicies, 100);
const mockAnalytics = generateAnalytics(mockPolicies, mockClaims);

// Data access functions for use in server components and actions
export async function getPolicies(): Promise<Policy[]> {
  // Simulate a small delay that would occur in a real database query
  await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));
  return mockPolicies;
}

export async function getPolicy(id: string): Promise<Policy | undefined> {
  // Simulate a small delay that would occur in a real database query
  await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
  return mockPolicies.find(policy => policy.id === id);
}

export async function getInsurers(): Promise<InsuranceCompany[]> {
  // Simulate a small delay that would occur in a real database query
  await new Promise(resolve => setTimeout(resolve, Math.random() * 150 + 100));
  return mockInsurers;
}

export async function createInsurer(data: Omit<InsuranceCompany, 'id'>): Promise<InsuranceCompany> {
  // Simulate a small delay that would occur in a real database write
  await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  
  const newInsurer: InsuranceCompany = {
    id: faker.string.uuid(),
    ...data
  };
  
  // In a real app, we would add this to the database
  // For this demo, we'll just return the new insurer
  return newInsurer;
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
  // Simulate a small delay for a more complex query
  await new Promise(resolve => setTimeout(resolve, Math.random() * 250 + 150));
  return mockAnalytics;
}

export async function getClaims(): Promise<ClaimData[]> {
  // Simulate a small delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));
  return mockClaims;
} 
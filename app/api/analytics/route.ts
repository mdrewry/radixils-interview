import { NextResponse } from 'next/server';
import { getAnalyticsData, getPolicies } from '@/lib/data';

export async function GET(request: Request) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Get filter parameters
  const { searchParams } = new URL(request.url);
  const risk = searchParams.get('risk');
  const category = searchParams.get('category');
  
  // If no filters, return the default analytics
  if (!risk && !category) {
    const analyticsData = await getAnalyticsData();
    return NextResponse.json(analyticsData);
  }
  
  // Get policies and analytics data - now awaiting the async calls
  const policies = await getPolicies();
  const analyticsData = await getAnalyticsData();
  
  // Filter policies based on parameters
  let filteredPolicies = [...policies];
  
  if (risk) {
    filteredPolicies = filteredPolicies.filter(p => p.risk === risk);
  }
  
  if (category) {
    filteredPolicies = filteredPolicies.filter(p => p.category === category);
  }
  
  // Calculate filtered analytics
  const totalPremium = filteredPolicies.reduce((sum, policy) => sum + policy.premium, 0);
  const totalClaims = filteredPolicies.reduce((sum, policy) => sum + policy.claimsPaid, 0);
  const activePolicies = filteredPolicies.filter(p => p.status === 'Active').length;
  const expiredPolicies = filteredPolicies.filter(p => p.status === 'Expired').length;
  const highRiskPolicies = filteredPolicies.filter(p => p.risk === 'High').length;
  
  // Return filtered analytics
  return NextResponse.json({
    totalPremium,
    totalClaims,
    lossRatio: totalClaims / totalPremium,
    activePolicies,
    expiredPolicies,
    highRiskPolicies,
    // Use original monthly data (in a real app, this would be filtered too)
    monthlyPremiums: analyticsData.monthlyPremiums,
    monthlyClaims: analyticsData.monthlyClaims,
  });
} 
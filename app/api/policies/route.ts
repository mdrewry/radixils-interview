import { NextResponse } from 'next/server';
import { getPolicies } from '@/lib/data';

export async function GET(request: Request) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get URL parameters
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order') || 'asc';
  
  // Get policies from data layer - now awaiting the async call
  const policies = await getPolicies();
  
  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  // Apply sorting if provided
  let sortedPolicies = [...policies];
  if (sort) {
    sortedPolicies.sort((a: any, b: any) => {
      if (a[sort] < b[sort]) return order === 'asc' ? -1 : 1;
      if (a[sort] > b[sort]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  // Get paginated result
  const paginatedPolicies = sortedPolicies.slice(startIndex, endIndex);
  
  // Prepare response with pagination metadata
  const response = {
    data: paginatedPolicies,
    pagination: {
      total: policies.length,
      page,
      limit,
      pages: Math.ceil(policies.length / limit)
    }
  };
  
  return NextResponse.json(response);
} 
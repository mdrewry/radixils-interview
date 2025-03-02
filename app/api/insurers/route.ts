import { NextResponse } from 'next/server';
import { getInsurers, createInsurer, InsuranceCompany } from '@/lib/data';
import { faker } from '@faker-js/faker';

// For simplicity, we'll keep a dynamic copy of insurers in memory
// In a real app, this would be persisted in a database
let dynamicInsurers: InsuranceCompany[] = [];
let isInitialized = false;

// Initialize on first load - now async
const initializeDynamicInsurers = async () => {
  if (!isInitialized) {
    dynamicInsurers = [...await getInsurers()];
    isInitialized = true;
  }
};

export async function GET(request: Request) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Make sure we have data - await the async initialization
  await initializeDynamicInsurers();
  
  // Get URL parameters
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  
  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedInsurers = dynamicInsurers.slice(startIndex, endIndex);
  
  // Prepare response with pagination metadata
  const response = {
    data: paginatedInsurers,
    pagination: {
      total: dynamicInsurers.length,
      page,
      limit,
      pages: Math.ceil(dynamicInsurers.length / limit)
    }
  };
  
  return NextResponse.json(response);
}

export async function POST(request: Request) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.country) {
      return NextResponse.json(
        { error: 'Name and country are required fields' },
        { status: 400 }
      );
    }
    
    // Create new insurer using data layer function - now awaiting the async call
    const newInsurer = await createInsurer({
      name: body.name,
      country: body.country,
      totalPolicies: body.totalPolicies || 0,
      totalPremium: body.totalPremium || 0,
      activeSince: body.activeSince ? new Date(body.activeSince) : new Date(),
      riskScore: body.riskScore || 0,
    });
    
    // Add to our dynamic insurers array
    dynamicInsurers.push(newInsurer);
    
    return NextResponse.json(newInsurer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
} 
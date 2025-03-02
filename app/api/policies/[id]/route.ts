import { NextResponse } from 'next/server';
import { getPolicy } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const id = params.id;
  
  // Now awaiting the async getPolicy function
  const policy = await getPolicy(id);
  
  if (!policy) {
    return NextResponse.json(
      { error: 'Policy not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(policy);
} 
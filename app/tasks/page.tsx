import React from 'react';
import Link from 'next/link';

export default function TasksPage() {
    const tasks = [
        {
            id: 'task1',
            title: 'Task 1: Data Fetching with Suspense',
            description: 'Implement server-side data fetching with Next.js Suspense for loading states.',
            requirements: [
                'Create a server component that directly uses getPolicies() to fetch policy data',
                'Implement React Suspense for loading states',
                'Create a table to display the policy data with proper formatting',
                'Add pagination with 10 items per page',
                'Handle error states appropriately with error boundaries',
                'Bonus: Add sorting functionality to the table'
            ],
            difficulty: 'Beginner',
            timeEstimate: '15-20 minutes'
        },
        {
            id: 'task2',
            title: 'Task 2: Form with Server Actions',
            description: 'Implement a form using Next.js Server Actions for data submission.',
            requirements: [
                'Create a form with fields for company name, country, risk score',
                'Implement form validation (required fields, proper formats)',
                'Create a Server Action in actions.ts that directly handles the insurer creation',
                'Show appropriate error messages for invalid input',
                'Display a success message on successful submission',
                'Optimize with progressive enhancement for instant feedback',
                'Bonus: Add a confirmation step before final submission'
            ],
            difficulty: 'Intermediate',
            timeEstimate: '15-20 minutes'
        },
        {
            id: 'task3',
            title: 'Task 3: Data Visualization Dashboard',
            description: 'Create a simple analytics dashboard with a basic chart displaying premium data.',
            requirements: [
                'Use the API endpoint "/api/analytics" to fetch monthly premium data',
                'Create a line chart showing monthly premiums (using any simple charting library)',
                'Display summary metrics (total premium, loss ratio) in stat cards',
                'Add a simple filter to show data for different risk levels',
                'Bonus: Add a second chart showing monthly claims data'
            ],
            difficulty: 'Intermediate-Advanced',
            timeEstimate: '20-25 minutes'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Interview Tasks</h1>
                <Link href="/analytics" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                    View Analytics Dashboard
                </Link>
            </div>

            <p className="text-lg mb-8">
                Welcome to the RadixILS Frontend Interview! Below are tasks designed to assess your
                React and NextJS skills. Choose the task that best matches your experience level
                or complete multiple tasks if time allows.
            </p>

            <div className="space-y-8">
                {tasks.map((task) => (
                    <div key={task.id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">{task.title}</h2>
                            <div className="flex space-x-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {task.difficulty}
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                    {task.timeEstimate}
                                </span>
                            </div>
                        </div>

                        <p className="mb-4 text-gray-700 dark:text-gray-300">{task.description}</p>

                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Requirements:</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                {task.requirements.map((req, index) => (
                                    <li key={index} className="text-gray-600 dark:text-gray-400">{req}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <p className="mb-4">To begin with your chosen task:</p>
                    <ol className="list-decimal pl-5 space-y-3">
                        <li>
                            <p className="mb-2">Create the appropriate folder structure for your solution:</p>
                            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto">
                                {`# For Task 1: Data Fetching with Suspense
app/task1/page.tsx
components/task1/PolicyTable.tsx

# For Task 2: Form with Server Actions
app/task2/page.tsx
app/task2/actions.ts  # Server Actions for direct data handling
components/task2/InsurerForm.tsx
lib/task2/validation.ts

# For Task 3: Data Visualization Dashboard
app/task3/page.tsx
components/task3/PremiumChart.tsx
components/task3/StatCards.tsx`}
                            </pre>
                        </li>
                        <li>
                            <p className="mb-2">Understanding the data architecture:</p>
                            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto">
                                {`# Core data layer:
lib/data.ts - Contains all data access functions:
  - getPolicies()
  - getPolicy(id)
  - getInsurers()
  - createInsurer(data)
  - getAnalyticsData()

# Where to use each approach:
- Server Components: Import directly from lib/data.ts
- Server Actions: Import directly from lib/data.ts
- Client Components: Use the API routes below

# API routes (thin wrappers around data functions):
GET /api/policies
GET /api/policies/[id]
GET /api/insurers
POST /api/insurers
GET /api/analytics`}
                            </pre>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Note: In Next.js 15, it's more efficient to directly use data functions on the server rather than making API calls. The API routes exist primarily for client components.
                            </p>
                        </li>
                        <li>
                            <p>This architecture follows Next.js 15 best practices by minimizing redundant API calls and leveraging server-side capabilities. Your assessment will partly be based on correctly implementing this pattern.</p>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
} 
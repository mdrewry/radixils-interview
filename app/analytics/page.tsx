import React from 'react';
import StatsCard from '@/components/data-cards/StatsCard';
import PolicyTableWrapper from '@/components/policy/PolicyTableWrapper';
import InsurerTableWrapper from '@/components/insurer/InsurerTableWrapper';
import { getPolicies, getInsurers, getAnalyticsData } from '@/lib/data';

export default async function AnalyticsPage() {
    // Fetch data in parallel using Promise.all for better performance
    const [policies, insurers, analyticsData] = await Promise.all([
        getPolicies(),
        getInsurers(),
        getAnalyticsData()
    ]);

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    const percentFormatter = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">Reinsurance Analytics Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Premium"
                    value={currencyFormatter.format(analyticsData.totalPremium)}
                    change={{ value: 12.5, isPositive: true }}
                />
                <StatsCard
                    title="Total Claims"
                    value={currencyFormatter.format(analyticsData.totalClaims)}
                    change={{ value: 8.3, isPositive: false }}
                />
                <StatsCard
                    title="Loss Ratio"
                    value={percentFormatter.format(analyticsData.lossRatio)}
                    change={{ value: 5.2, isPositive: false }}
                />
                <StatsCard
                    title="Active Policies"
                    value={analyticsData.activePolicies}
                    change={{ value: 3.7, isPositive: true }}
                />
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Policy Data</h2>
                <PolicyTableWrapper
                    policies={policies.slice(0, 10)}
                />
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Insurance Companies</h2>
                <InsurerTableWrapper
                    insurers={insurers.slice(0, 10)}
                />
            </div>
        </div>
    );
} 
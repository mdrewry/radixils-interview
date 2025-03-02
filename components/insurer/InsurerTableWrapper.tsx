'use client'
import React from 'react';
import DataTable from '@/components/data-cards/DataTable';
import { InsuranceCompany } from '@/lib/data';

interface InsurerTableWrapperProps {
    insurers: InsuranceCompany[];
}

export default function InsurerTableWrapper({ insurers }: InsurerTableWrapperProps) {
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    const insurerColumns = [
        { key: 'name', title: 'Company Name' },
        { key: 'country', title: 'Country' },
        { key: 'totalPolicies', title: 'Total Policies' },
        {
            key: 'totalPremium',
            title: 'Total Premium',
            render: (item: InsuranceCompany) => currencyFormatter.format(item.totalPremium)
        },
        {
            key: 'riskScore',
            title: 'Risk Score',
            render: (item: InsuranceCompany) => (
                <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="h-2.5 rounded-full"
                            style={{
                                width: `${item.riskScore * 10}%`,
                                backgroundColor: item.riskScore > 7 ? '#ef4444' : item.riskScore > 4 ? '#f59e0b' : '#10b981'
                            }}
                        ></div>
                    </div>
                    <span className="ml-2">{item.riskScore.toFixed(1)}</span>
                </div>
            )
        }
    ];

    return (
        <DataTable<InsuranceCompany>
            data={insurers}
            columns={insurerColumns}
            keyExtractor={(item) => item.id}
            searchable
            sortable
        />
    );
} 
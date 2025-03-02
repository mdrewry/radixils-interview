'use client'
import React from 'react';
import DataTable from '@/components/data-cards/DataTable';
import { Policy } from '@/lib/data';

interface PolicyTableWrapperProps {
    policies: Policy[];
}

export default function PolicyTableWrapper({ policies }: PolicyTableWrapperProps) {
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    const policyColumns = [
        { key: 'policyNumber', title: 'Policy Number' },
        { key: 'insurer', title: 'Insurer' },
        {
            key: 'premium',
            title: 'Premium',
            render: (item: Policy) => currencyFormatter.format(item.premium)
        },
        {
            key: 'risk',
            title: 'Risk Level',
            render: (item: Policy) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.risk === 'High' ? 'bg-red-100 text-red-800' :
                        item.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                    }`}>
                    {item.risk}
                </span>
            )
        },
        { key: 'category', title: 'Category' },
        {
            key: 'status',
            title: 'Status',
            render: (item: Policy) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-800' :
                        item.status === 'Canceled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                    }`}>
                    {item.status}
                </span>
            )
        }
    ];

    return (
        <DataTable<Policy>
            data={policies}
            columns={policyColumns}
            keyExtractor={(item) => item.id}
            searchable
            sortable
        />
    );
} 
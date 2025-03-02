'use client'
import React from 'react';

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: {
        value: number;
        isPositive: boolean;
    };
    icon?: React.ReactNode;
    description?: string;
}

export default function StatsCard({
    title,
    value,
    change,
    icon,
    description
}: StatsCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    <h3 className="text-2xl font-bold mt-1">{value}</h3>
                </div>
                {icon && <div className="text-gray-400 dark:text-gray-500">{icon}</div>}
            </div>

            {change && (
                <div className="mt-2 flex items-center">
                    <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${change.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                    >
                        {change.isPositive ? '+' : ''}{change.value}%
                    </span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">from previous period</span>
                </div>
            )}

            {description && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            )}
        </div>
    );
} 
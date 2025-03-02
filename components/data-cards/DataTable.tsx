'use client'
import React, { useState } from 'react';

interface Column<T> {
    key: string;
    title: string;
    render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyExtractor: (item: T) => string;
    onRowClick?: (item: T) => void;
    searchable?: boolean;
    sortable?: boolean;
}

export default function DataTable<T extends Record<string, any>>({
    data,
    columns,
    keyExtractor,
    onRowClick,
    searchable = false,
    sortable = false,
}: DataTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | 'desc';
    } | null>(null);

    // Filter data based on search term
    const filteredData = React.useMemo(() => {
        if (!searchTerm) return data;

        return data.filter((item) => {
            return Object.values(item).some((value) => {
                if (value === null || value === undefined) return false;
                return String(value).toLowerCase().includes(searchTerm.toLowerCase());
            });
        });
    }, [data, searchTerm]);

    // Sort data based on sort config
    const sortedData = React.useMemo(() => {
        if (!sortConfig) return filteredData;

        return [...filteredData].sort((a, b) => {
            // @ts-ignore - We know the key exists in the object
            const aValue = a[sortConfig.key];
            // @ts-ignore - We know the key exists in the object
            const bValue = b[sortConfig.key];

            if (aValue === bValue) return 0;

            if (sortConfig.direction === 'asc') {
                return aValue < bValue ? -1 : 1;
            } else {
                return aValue > bValue ? -1 : 1;
            }
        });
    }, [filteredData, sortConfig]);

    const handleSort = (key: string) => {
        if (!sortable) return;

        let direction: 'asc' | 'desc' = 'asc';

        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            {searchable && (
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    scope="col"
                                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600' : ''
                                        }`}
                                    onClick={() => handleSort(column.key)}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>{column.title}</span>
                                        {sortable && sortConfig && sortConfig.key === column.key && (
                                            <span>
                                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {sortedData.map((item) => (
                            <tr
                                key={keyExtractor(item)}
                                className={onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''}
                                onClick={() => onRowClick && onRowClick(item)}
                            >
                                {columns.map((column) => (
                                    <td key={`${keyExtractor(item)}-${column.key}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {column.render
                                            ? column.render(item)
                                            // @ts-ignore - We know the key exists in the object
                                            : String(item[column.key] ?? '-')}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {sortedData.length === 0 && (
                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                    No data found
                </div>
            )}
        </div>
    );
} 
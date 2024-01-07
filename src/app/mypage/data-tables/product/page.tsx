'use client';
import ProductTable from 'views/admin/dataTables/components/ProductTable';
import React from 'react';
import { useSearchParams } from 'next/navigation';
export default function DataTables() {
  
  const SearchParams = useSearchParams()
  return (
    <ProductTable userid={SearchParams.get('uid')} />
  );
}

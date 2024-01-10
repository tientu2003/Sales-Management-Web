'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import SalesTable from 'components/table/SalesTable'
export default function DataTables() {
  
  const SearchParams = useSearchParams()
  return (
    <SalesTable userid={SearchParams.get('uid')}/>
  );
}

'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Box } from '@chakra-ui/react';
import SalesTable from 'views/admin/dataTables/components/SalesTable'
export default function DataTables() {
  
  const SearchParams = useSearchParams()
  return (
    <Box></Box>
  );
}

'use client';
import { Box, SimpleGrid } from '@chakra-ui/react';
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable';
import tableDataColumns from 'views/admin/dataTables/variables/tableDataColumns';
import React from 'react';


export default function DataTables() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <ColumnsTable tableData={tableDataColumns} />
      </SimpleGrid>
    </Box>
  );
}

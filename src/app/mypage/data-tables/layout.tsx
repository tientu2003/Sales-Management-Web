'use client';
import { Box, Button, Card, SimpleGrid } from '@chakra-ui/react';
import React,{useState} from 'react';
import { Select } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
export default function DataTables(props:any) {
    const {children,...rest }=props
    const router = useRouter();
    const query = useSearchParams();
    function handleSelectTable(event:any){
        router.push('http://localhost:3000/mypage/data-tables/'+event.target.value+'?'+query)
    }
    
    return (
    <Box pt={{ base: '200px', md: '80px', xl: '80px' }}>
       <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <Card>
          <Select placeholder='Choose Table' onChange={handleSelectTable}>
              <option value='product'>Product</option>
              <option value='sales'>Sales Table</option>
          </Select>
        </Card>
       
      </SimpleGrid>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        {children}
      </SimpleGrid>
    </Box>
  );
}

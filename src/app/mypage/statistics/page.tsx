'use client';
import { Box, Heading, SimpleGrid} from '@chakra-ui/react';
import React from 'react';
import LineChart from 'components/charts/LineChart';
import Card from 'components/card/Card';
export default function Statistics() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid columns={1}  spacing={10} >
          <Card>
            <Heading>
              Sales TimeLine
            </Heading>
          <LineChart/>
            </Card>
          
          </SimpleGrid>   
    </Box>
  );
  }
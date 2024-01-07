'use client';
import { Box, Heading, SimpleGrid,Text } from '@chakra-ui/react';
import React from 'react';
import BarChart from "components/charts/BarChart"
import Card from "components/card/Card"
import { barChartDataDailyTraffic } from 'variables/charts';
import { barChartOptionsDailyTraffic } from 'variables/charts';
export default function Home() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <Card minHeight={'300px'}>
          <Heading>News</Heading>
          <Text></Text>
        </Card>
        <Card minHeight={'300px'}>
            <Heading>Weekly Sales</Heading>
            <BarChart chartData= {barChartDataDailyTraffic} chartOptions={barChartOptionsDailyTraffic}/>
        </Card>
        
      </SimpleGrid>
      <Card></Card>
    </Box>
  );

}
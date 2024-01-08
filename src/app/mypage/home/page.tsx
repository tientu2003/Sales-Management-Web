'use client';
import { Box, Heading, SimpleGrid,Select, useColorModeValue} from '@chakra-ui/react';
import React, { useState } from 'react';
import BarChart from "components/charts/BarChart"
import Card from "components/card/Card"
import { barChartDataDailyTraffic } from 'variables/charts';
import { barChartOptionsDailyTraffic } from 'variables/charts';
import MiniStatistics from 'components/card/MiniStatistics';
import { useEffect } from 'react';
import ProductInput from 'components/fields/ProductInput';
import SalesInput from 'components/fields/SalesInput';
export default function Home() {
  useEffect(() =>{
    fetch("")

  })
  const selectcolor = useColorModeValue('#EDF2F7','blue.900')
  const dailycolor = useColorModeValue('#FED7D7','red.400')
  const monthcolor = useColorModeValue('#FEEBC8','yellow.400')
  const yearcolor = useColorModeValue('#C6F6D5','green.200')
  const mostproductcolor = useColorModeValue('#BEE3F8','blue.400')
  const [tablename,setTableName] = useState('Product')
  const [selectedtableinput,setSelectedTableInput] = useState(1); 
  function handleSelectTable(event:any){
    if(event.target.value === 'product'){
      setSelectedTableInput(1)
      setTableName('Product')
    }else if(event.target.value === 'sales'){
      setSelectedTableInput(2)
      setTableName('Order')
    } 
  }


  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <Card minHeight={'300px'}>
          <Heading>News</Heading>
          <Box minHeight={'15px'}></Box>
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
              <MiniStatistics growth={'12%'} name="Daily Revenue " value={"12"} backgroundcolor={dailycolor} mode={'1'} ></MiniStatistics>
              <MiniStatistics growth={'12%'} name="Monthly Revenue" value={"12"} backgroundcolor={monthcolor} mode={'2'}></MiniStatistics>
              <MiniStatistics growth={'12%'} name="Annually Revenue" value={"12"} backgroundcolor={yearcolor} mode ={'3'}></MiniStatistics>
              <MiniStatistics name="Most sold product" value={"12"} backgroundcolor={mostproductcolor} mode ={'other'}></MiniStatistics>
            </SimpleGrid>
        </Card>
        <Card minHeight={'300px'}>
            <Heading>Weekly Sales</Heading>
            <BarChart chartData= {barChartDataDailyTraffic} chartOptions={barChartOptionsDailyTraffic}/>
        </Card>
        
      </SimpleGrid>
      <Box pt={{ base: '10px', md: '20px', xl: '10px' }}>
        <Card  pt= {'15px'} p={'40px'} alignItems={'center'}>
          <SimpleGrid w={'1000px'} columns={{ sm: 1, md: 2 }}>
          <Heading>Add New {tablename} </Heading>
          <Select placeholder='Choose Table' onChange={handleSelectTable} background={selectcolor}>
              <option value='product'>Product</option>
              <option value='sales'>Sales Table</option>
          </Select>
          </SimpleGrid>
          {selectedtableinput === 1?  <ProductInput/>:null}
          {selectedtableinput === 2? <SalesInput/>:null}
        </Card>           
      </Box>
    </Box>
  );

}
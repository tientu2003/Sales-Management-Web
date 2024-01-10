'use client';
import { Box, Heading, SimpleGrid,Select, useColorModeValue} from '@chakra-ui/react';
import React, { useMemo, useRef, useState,useEffect, useCallback} from 'react';

import Card from "components/card/Card"
import MiniStatistics from 'components/card/MiniStatistics';
import ProductInput from 'components/fields/ProductInput';
import SalesInput from 'components/fields/SalesInput';
import { useSearchParams } from 'next/navigation';

import HomeChart from 'components/charts/HomeChart';

export default function Home() {
  const SearchParams = useSearchParams()
  const [rdata,setRData] = useState({
    day:{daily:0,dailygrowth:0},
    month:{monthly:0,monthlygrowth:0},
    most:{most:0,product:''},
    year:{year:0,yeargrowth:0}
  })
  useEffect(() =>{
    fetch('http://localhost:3000/api/getHomeData',{
      method: "POST",
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({'uid':SearchParams.get('uid')})}
      ).then((res) => {
        if (res.ok){
          return res.json()
        }else{
          throw new Error('Calculate Error!!')
        }
        
      }).then(
        rec => {
          setRData(rec)
        }
      )
  },[SearchParams])


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
              <MiniStatistics growth={rdata.day.dailygrowth + '%'} name="Daily Revenue " value={Math.round(rdata.day.daily)} backgroundcolor={dailycolor} mode={'1'} ></MiniStatistics>
              <MiniStatistics growth={rdata.month.monthlygrowth + '%'} name="Monthly Revenue" value={Math.round(rdata.month.monthly)} backgroundcolor={monthcolor} mode={'2'}></MiniStatistics>
              <MiniStatistics growth={rdata.year.yeargrowth+'%'} name="Annually Revenue" value={Math.round(rdata.year.year)} backgroundcolor={yearcolor} mode ={'3'}></MiniStatistics>
              <MiniStatistics mode={'4'} name="Most sold product" growth={rdata.most.product} value={Math.round(rdata.most.most)} backgroundcolor={mostproductcolor}></MiniStatistics>
            </SimpleGrid>
        </Card>
        <Card minHeight={'300px'}>
            <Heading>Last 7 days</Heading>
          <HomeChart/>
        </Card>
        {}
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
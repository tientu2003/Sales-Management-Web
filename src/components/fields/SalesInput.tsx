import React from "react";
import{
    Card,
    Heading,
    SimpleGrid,
    InputGroup,InputLeftAddon,Input,
    Button, useColorModeValue,
    Wrap,InputRightAddon
}from '@chakra-ui/react'

export default function ProductInput(){
    const bgbutton = useColorModeValue('#B9A2FF', '#4318FF');
    const textbuttoncolor = useColorModeValue('#000000', 'white');
    
    return(       
        <SimpleGrid w={'1000px'}
        columns={{ sm: 1, md: 1 }}
        pt={'20px'}
        spacing={{ base: '30px', xl: '25px' }}
        alignContent={'center'}
        >
          <InputGroup>
          <InputLeftAddon color={textbuttoncolor}>Name</InputLeftAddon>
          <Input placeholder='product name...'></Input>
          </InputGroup>
          <InputGroup >
          <InputLeftAddon color={textbuttoncolor}>Brand/Supplier</InputLeftAddon>
          <Input placeholder='Coca cola...'></Input>
          </InputGroup>
          
          <Wrap justify={'right'}>
          <Button w={'200px'} alignContent={'center'} backgroundColor={bgbutton} textColor={textbuttoncolor}>Summit</Button>
          </Wrap>
      </SimpleGrid>

   
    )
}
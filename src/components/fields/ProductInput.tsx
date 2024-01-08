import React, { useState } from "react";
import{
    SimpleGrid,
    InputGroup,InputLeftAddon,Input,
    Button, useColorModeValue,
    Wrap,
    InputRightAddon
}from '@chakra-ui/react'
// import InputNumber
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { useSearchParams } from "next/navigation";

export default function ProductInput(){
    const bgbutton = useColorModeValue('#B9A2FF', '#4318FF');
    const textbuttoncolor = useColorModeValue('#000000', 'white');
    const SearchParms = useSearchParams();
    const [formdata,setFormData] = useState({
      name:'',
      brand:'',
      price:0.0,
      quantity:0
    })
    function handleInputChange(event:any){
      const {name,value} = event.target;
      setFormData((predata) =>(
        {
          ...predata,
          [name]:value,
        }
      ))
    }
    function handleSummit(){
      fetch('http://localhost:3000/api/addProduct',{
        method: "POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({'uid':SearchParms.get('uid'),'data':formdata})
      }).then(res => res.json()).then(
        redata =>(
          console.log(redata)
        )
      )
    }
    
    return(       
          <SimpleGrid w={'1000px'}
            columns={{ sm: 1, md: 1 }}
            pt={'20px'}
            spacing={{ base: '30px', xl: '25px' }}
            alignContent={'center'}
            >
              <InputGroup>
              <InputLeftAddon color={textbuttoncolor}>Name</InputLeftAddon>
              <Input placeholder='product name...' color={textbuttoncolor}  name="name" value={formdata.name} onChange={handleInputChange} ></Input>
              </InputGroup>
              <InputGroup >
              <InputLeftAddon color={textbuttoncolor}>Brand/Supplier</InputLeftAddon>
              <Input placeholder='Coca cola...' color={textbuttoncolor}  name="brand" value={formdata.brand} onChange={handleInputChange}></Input>
              </InputGroup>
              <InputGroup >
              <InputLeftAddon color={textbuttoncolor}>Price</InputLeftAddon>
              <NumberInput w={'1000px'}>
                <NumberInputField placeholder="9.23, 102.22, 99.9" color={textbuttoncolor}  name="price" value={formdata.price} onChange={handleInputChange}/>
              </NumberInput>
              <InputRightAddon>$</InputRightAddon>
              </InputGroup>
              <InputGroup >
              <InputLeftAddon color={textbuttoncolor}>Quantity</InputLeftAddon>
              <NumberInput w={'1000px'} min={0} defaultValue={0} keepWithinRange={true}  clampValueOnBlur={false} >
                <NumberInputField name="quantity" color={textbuttoncolor} value={formdata.quantity} onChange={handleInputChange} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              </InputGroup>
              <Wrap justify={'right'}>
              <Button w={'200px'} alignContent={'center'} backgroundColor={bgbutton} textColor={textbuttoncolor} onClick={handleSummit}>Summit</Button>
              </Wrap>
          </SimpleGrid>
   
    )
}
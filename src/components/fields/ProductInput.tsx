import React, { useState } from "react";
import{
    SimpleGrid,
    InputGroup,InputLeftAddon,Input,
    Button, useColorModeValue,
    Wrap,
    InputRightAddon,
    useDisclosure,
    CircularProgress,
    Center,Text
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
    const [process,setProcess] = useState(1)
    function handleSubmit(){
      setProcess(2)
      if(formdata.name === '' || formdata.brand === '' || formdata.price === 0.0 || formdata.quantity === 0){
        setProcess(4)
        return 'fail'
      }
      fetch('http://localhost:3000/api/addProduct',{
        method: "POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({'uid':SearchParms.get('uid'),'data':formdata})
      }).then(res => res.json()).then(
        redata =>{
          if(redata.status === "success"){
            setProcess(3)
          }else{setProcess(4)}

        }
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
              {process === 2? <CircularProgress isIndeterminate color='green.300' />:null}
              {process === 3? <Text color={'green.500'}>Success!</Text>:null}
              {process === 4? <Text color={'red.600'}>Fail!!</Text>:null}
              <Button w={'200px'} alignContent={'center'} backgroundColor={bgbutton} textColor={textbuttoncolor} onClick={handleSubmit}>Submit</Button>
              </Wrap>
          </SimpleGrid>
   
    )
}
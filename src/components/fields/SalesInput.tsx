import React, { useState } from "react";
import{
    SimpleGrid,
    InputGroup,InputLeftAddon,Input,
    Button, useColorModeValue,
    Wrap,
    InputRightAddon,Text,CircularProgress
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
      pid:0,
      name:'',
      date:'',
      time:'',
      quantity:0,
      total_price:0.0
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
      if(formdata.name === '' || formdata.pid === 0 || formdata.date === '' || formdata.quantity === 0
      || formdata.time === '' || formdata.total_price === 0.0){
        setProcess(4)
        return 'fail'
      }
      fetch('http://localhost:3000/api/addOrder',{
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
                <InputLeftAddon color={textbuttoncolor}>ProductID</InputLeftAddon>
                    <NumberInput w={'1000px'}>
                        <NumberInputField placeholder="1,2,3,4,5" color={textbuttoncolor} name="pid" value={formdata.pid} onChange={handleInputChange}/>
                    </NumberInput>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon color={textbuttoncolor}>Name</InputLeftAddon>
                    <Input placeholder='product name...' color={textbuttoncolor}  name="name" value={formdata.name} onChange={handleInputChange} ></Input>
              </InputGroup>
              <InputGroup >
                <InputLeftAddon color={textbuttoncolor}>Date</InputLeftAddon>
                    <Input placeholder='date...'color={textbuttoncolor}  name="date" value={formdata.date} type="date" onChange={handleInputChange}></Input>
              </InputGroup>
              <InputGroup >
                <InputLeftAddon color={textbuttoncolor}>Time</InputLeftAddon>
                    <Input placeholder='date...' color={textbuttoncolor}  name="time" value={formdata.time} type="time" min="00:00:00" max="23:59:59"  
                     pattern="[0-2][0-9]:[0-5][0-9]:[0-5][0-9]" step={"1"}
                    onChange={handleInputChange}></Input>
              </InputGroup>
              <InputGroup >
                <InputLeftAddon color={textbuttoncolor}>Quantity</InputLeftAddon>
                    <NumberInput w={'1000px'} min={0} defaultValue={0} keepWithinRange={true}  clampValueOnBlur={false} >
                        <NumberInputField name="quantity" color={textbuttoncolor}  value={formdata.quantity} onChange={handleInputChange} />
                        <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
              </InputGroup>
              <InputGroup >
                <InputLeftAddon color={textbuttoncolor}>Total Price</InputLeftAddon>
                    <NumberInput w={'1000px'}>
                        <NumberInputField placeholder="9.23, 102.22, 99.9" color={textbuttoncolor}  name="total_price" value={formdata.total_price} onChange={handleInputChange}/>
                    </NumberInput>
                <InputRightAddon>$</InputRightAddon>
              </InputGroup>
              <Wrap justify={'right'}>
              {process === 2? <CircularProgress isIndeterminate color='green.300' />:null}
              {process === 3? <Text color={'green.500'}>Success!</Text>:null}
              {process === 4? <Text color={'red.600'}>Fail!!</Text>:null}
              <Button w={'200px'} alignContent={'center'} backgroundColor={bgbutton} textColor={textbuttoncolor} onClick={handleSubmit}>Summit</Button>
              </Wrap>
          </SimpleGrid>
   
    )
}
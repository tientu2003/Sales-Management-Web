// chakra imports
import { Icon, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { MdUpgrade } from "react-icons/md"; 

export function ItemContent(props:{info:string}) {
  const textColor = useColorModeValue("navy.700", "white");
  return (
    <>
      <Flex
        justify='center'
        align='center'
        borderRadius='16px'
        minH={{ base: "60px", md: "70px" }}
        h={{ base: "60px", md: "70px" }}
        minW={{ base: "60px", md: "70px" }}
        w={{ base: "60px", md: "70px" }}
        me='14px'
        bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'>
        
      </Flex>
      <Flex flexDirection='column'>
       
      </Flex>
    </>
  );
}

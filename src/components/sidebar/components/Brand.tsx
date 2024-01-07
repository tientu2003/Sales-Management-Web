// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { Heading} from '@chakra-ui/react';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'red');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Heading h='30px' w='150px' my='5px'  color={'chakra-body-text._dark'} fontSize={'24px'} fontWeight='bold'>My Project</Heading>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;

// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { Text} from '@chakra-ui/react';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'red');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Text h='30px' w='120px' my='10px'  color={'chakra-body-text._dark'} fontSize={'larger'} fontWeight='bold'>My Project</Text>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;

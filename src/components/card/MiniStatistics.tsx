// Chakra imports
import { Flex, Stat, StatLabel, StatNumber, useColorModeValue, Text } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { useEffect, useState } from 'react';

export default function Default(props: {
	startContent?: JSX.Element;
	endContent?: JSX.Element;
	name: string;
	growth?: string | number;
	value: string | number;
	backgroundcolor:string
	mode: string;
}) {
	const { startContent, endContent, name, growth, value,backgroundcolor,mode } = props;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'secondaryGray.900';
	const [text,setText] = useState("")
	useEffect(() =>{
		if(mode === '1'){
			setText('day')
		}else if(mode === '2'){
			setText('month')
		}else if(mode === '3'){
			setText('year')
		}
	},[mode])
	return (
		<Card py='15px' backgroundColor={backgroundcolor}>
			<Flex
				my='auto'
				h='100%'
				align={{ base: 'center', xl: 'center' }}
				justify={{ base: 'center', xl: 'center' }}>
				{startContent}

				<Stat my='auto' ms={startContent ? '18px' : '0px'}>
					<StatLabel
						lineHeight='100%'
						color={textColorSecondary}
						fontSize={{
							base: 'sm'
						}}>
						{name}
					</StatLabel>
					<StatNumber
						color={textColor}
						fontSize={{
							base: '2xl'
						}}>
						{growth?('$'):null}{value}
					</StatNumber>
					{growth ? (
						<Flex align='center'>
							<Text color='green.500' fontSize='xs' fontWeight='700' me='5px'>
								{growth}
							</Text>
							<Text color='secondaryGray.900' fontSize='xs' fontWeight='400'>
								since last {text}
							</Text>
						</Flex>
					) : null}
				</Stat>
				<Flex ms='auto' w='max-content'>
					{endContent}
				</Flex>
			</Flex>
		</Card>
	);
}

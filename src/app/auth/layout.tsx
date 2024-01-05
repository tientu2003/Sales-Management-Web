'use client';
import { PropsWithChildren, useState } from 'react';

// Chakra imports
import { Box, Center, Stack, useColorModeValue } from '@chakra-ui/react';


// Custom Chakra theme

interface AuthProps extends PropsWithChildren {}

export default function AuthLayout({ children }: AuthProps) {
  // states and functions
  const authBg = useColorModeValue('white', 'navy.900');
  return (
        <Center bg={authBg}>
            <Box
            bg={authBg}
            float="right"
             minHeight="100vh"
             height="100%"
            position="relative"
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
            >
                <Box>
                {children}
                </Box>
            </Box>

         </Center>
  );
}

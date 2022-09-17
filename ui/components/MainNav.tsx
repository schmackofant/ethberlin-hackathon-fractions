import {
    Box,
    Flex,
    HStack,
    Image,
    Switch,
    useColorMode,
    Container,
    Link as Anchor,
  } from '@chakra-ui/react'
  import { ConnectKitButton } from 'connectkit'
  import Link from 'next/link'
  import { FC } from 'react'

  type Anchor = {
    name: string
    path: string
  }

  const links: Anchor[] = [
    { name: 'My IP-NFTS', path: '/ipnfts' }
  ]

  const MainNav: FC = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
      <Flex alignItems="center" justifyContent="center">
      <Container maxW={'3xl'} m={6} minWidth="3xl">
      <Box>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <div>
            <Link href="/">
              <Image src="/images/Logo.svg" alt="Logo" h={10} />
            </Link>
          </div>
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              fontSize={16}
              fontWeight={'semibold'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {links.map((link) => (
                <Link href={link.path} key={link.path}>
                  {link.name}
                </Link>
              ))}
            </HStack>
          </HStack>
          <ConnectKitButton />
        </Flex>
      </Box>
      </Container>
      <Box display="flex" alignItems="center"position="absolute" right="5rem">
      <p>Dark Mode</p>
      <Switch id='dark-mode'  onChange={toggleColorMode}/>
      </Box>
      </Flex>
    )
  }

  export default MainNav

import {
    Box,
    Flex,
    HStack,
    Image,
    Link,
    useColorModeValue
  } from '@chakra-ui/react'
  import { ConnectKitButton } from 'connectkit'
  import { FC } from 'react'
  
  type Link = {
    name: string
    path: string
  }
  
  const links: Link[] = [
    { name: 'Home', path: '/' },
    { name: 'Mint', path: '/mint' },
    { name: 'My IP-NFTs', path: '/decrypt' }
  ]
  
  const NavLink = ({ link }: { link: Link }) => (
    <Link
      px={3}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700')
      }}
      href={link.path}
    >
      {link.name}
    </Link>
  )
  
  const MainNav: FC = () => {
    return (
      <Box>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <div>
            <Image src="/images/logo.svg" alt="Logo" h={10} />
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
                <NavLink link={link} key={link.path} />
              ))}
            </HStack>
          </HStack>
          <ConnectKitButton />
        </Flex>
      </Box>
    )
  }
  
  export default MainNav
  
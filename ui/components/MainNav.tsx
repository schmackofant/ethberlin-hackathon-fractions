import {
    Box,
    Flex,
    HStack,
    Image,
    Link as Anchor,
    useColorModeValue
  } from '@chakra-ui/react'
  import { ConnectKitButton } from 'connectkit'
  import { FC } from 'react'
  import Link from 'next/link'

  type Anchor = {
    name: string
    path: string
  }

  const links: Anchor[] = [
    { name: 'My IP-NFTS', path: '/ipnfts' }
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
    )
  }

  export default MainNav

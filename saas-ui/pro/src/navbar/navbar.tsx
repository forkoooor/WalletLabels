import * as React from 'react'
import {
  chakra,
  omitThemingProps,
  HTMLChakraProps,
  ThemingProps,
  useMultiStyleConfig,
} from '@chakra-ui/react'

interface NavbarProps extends HTMLChakraProps<'div'>, ThemingProps<'Navbar'> {}

export const Navbar: React.FC<NavbarProps> = (props) => {
  const styles = useMultiStyleConfig('Navbar', props)

  const { children, ...containerProps } = omitThemingProps(props)

  const containerStyles = {
    ...styles.container,
  }

  const navbarStyles = {
    display: 'flex',
    minH: '60px',
    maxW: 'full',
    py: 2,
    px: 4,
    borderBottomWidth: 1,
    ...styles.navbar,
  }

  return (
    <chakra.div __css={containerStyles} {...containerProps}>
      <chakra.div __css={navbarStyles}>{children}</chakra.div>
    </chakra.div>
  )
}

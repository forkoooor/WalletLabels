import { SystemStyleFunction, transparentize } from '@chakra-ui/theme-tools'

const variantGhost: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props

  if (c === 'gray') {
    return {
      borderColor: 'default-border-color',
      _checked: {
        bg: 'blackAlpha.200',
        _dark: {
          bg: 'whiteAlpha.300',
        },
      },
    }
  }

  return {
    _checked: {
      bg: `${c}.100`,
      _dark: {
        bg: transparentize(`${c}.200`, 0.12)(theme),
      },
    },
  }
}

const variantOutline: SystemStyleFunction = (props) => {
  return variantGhost(props)
}

export default {
  variants: {
    ghost: variantGhost,
    outline: variantOutline,
  },
}

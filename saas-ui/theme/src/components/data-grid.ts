import { anatomy, mode } from '@chakra-ui/theme-tools'

import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleObject,
} from '@chakra-ui/theme-tools'

const parts = anatomy('data-grid').parts(
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'caption',
)

const numericStyles: SystemStyleObject = {
  '&[data-is-numeric=true]': {
    textAlign: 'end',
  },
}

const baseStyle: PartsStyleObject<typeof parts> = {
  table: {
    fontVariantNumeric: 'lining-nums tabular-nums',
    borderCollapse: 'collapse',
    width: 'full',
  },
  th: {
    fontFamily: 'heading',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 'wider',
    textAlign: 'start',
  },
  td: {
    textAlign: 'start',
  },
  caption: {
    mt: 4,
    fontFamily: 'heading',
    textAlign: 'center',
    fontWeight: 'medium',
  },
}

const variantSimple: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props

  return {
    th: {
      color: mode('gray.600', 'gray.400')(props),
      borderBottom: '1px',
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    td: {
      borderBottom: '1px',
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    caption: {
      color: mode('gray.600', 'gray.100')(props),
    },
    tbody: {
      'tr[data-hover]:hover': {
        td: {
          background: mode(`${c}.50`, `${c}.700`)(props),
        },
      },
      'tr[data-selected]': {
        td: {
          background: mode('primary.50', 'primary.700')(props),
        },
        '&[data-hover]:hover td': {
          background: mode('primary.100', 'primary.800')(props),
        },
      },
    },
    tfoot: {
      tr: {
        '&:last-of-type': {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  }
}

const variantStripe: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props

  return {
    th: {
      color: mode('gray.600', 'gray.400')(props),
      borderBottom: '1px',
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    td: {
      borderBottom: '1px',
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    caption: {
      color: mode('gray.600', 'gray.100')(props),
    },
    tbody: {
      tr: {
        '&:nth-of-type(odd)': {
          'th, td': {
            borderBottomWidth: '1px',
            borderColor: mode(`${c}.100`, `${c}.700`)(props),
          },
          td: {
            background: mode(`${c}.100`, `${c}.700`)(props),
          },
        },
        '&[data-hover]:hover td': {
          background: mode(`${c}.50`, `${c}.700`)(props),
        },
      },
    },
    tfoot: {
      tr: {
        '&:last-of-type': {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  }
}

const variants = {
  simple: variantSimple,
  striped: variantStripe,
  unstyled: {},
}

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    th: {
      px: '4',
      py: '2',
      lineHeight: '4',
      fontSize: 'xs',
    },
    td: {
      px: '4',
      py: '2',
      fontSize: 'sm',
      lineHeight: '4',
    },
    caption: {
      px: '4',
      py: '2',
      fontSize: 'xs',
    },
  },
  md: {
    th: {
      px: '6',
      py: '3',
      lineHeight: '4',
      fontSize: 'xs',
    },
    td: {
      px: '6',
      py: '3',
      lineHeight: '4',
    },
    caption: {
      px: '6',
      py: '2',
      fontSize: 'sm',
    },
  },
  lg: {
    th: {
      px: '6',
      py: '4',
      lineHeight: '4',
      fontSize: 'xs',
    },
    td: {
      px: '6',
      py: '4',
      lineHeight: '5',
    },
    caption: {
      px: '6',
      py: '2',
      fontSize: 'sm',
    },
  },
  xl: {
    th: {
      px: '8',
      py: '5',
      lineHeight: '5',
      fontSize: 'sm',
    },
    td: {
      px: '8',
      py: '5',
      lineHeight: '6',
    },
    caption: {
      px: '6',
      py: '2',
      fontSize: 'md',
    },
  },
}

const defaultProps = {
  variant: 'simple',
  size: 'md',
  colorScheme: 'gray',
}

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  variants,
  defaultProps,
}

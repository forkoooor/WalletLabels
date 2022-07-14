import { extendTheme } from '@chakra-ui/react'

import { theme as baseTheme } from '@saas-ui/pro'
import { withThemeColors } from '@saas-ui/pro'

import components from './components'

import colorScheme from './color-schemes/galaxy'
// import colorScheme from './color-schemes/earth'

export const theme = extendTheme(
  {
    components,
  },
  /**
   * Uncomment this to use any of the build in color schemes.
   */
  // withThemeColors(colorScheme),
  baseTheme,
)

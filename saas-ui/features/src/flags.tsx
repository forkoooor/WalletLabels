import * as React from 'react'

import { runIfFn, __DEV__ } from '@chakra-ui/utils'

import { useHasFlags, useFeatures } from './provider'

export interface HasProps {
  /**
   * One or more flags to match.
   */
  flag: string | string[]
  /**
   * Match the supplied flags to this value.
   * Matches all truthy values by default.
   */
  value?: any
  /**
   * Inverse matching, eg will be valid when no flags match.
   */
  not?: boolean
  /**
   * Match all or some flags.
   * @default true
   */
  exact?: boolean
  /**
   * Renders the result is invalid.
   */
  fallback?: React.ReactNode
  /**
   * Children will be rendered when the result is valid.
   */
  children:
    | React.ReactNode
    | (({ flags }: { flags: any }) => React.ReactElement)
}

/**
 * Conditionally render children based on one or more feature flag values.
 */
export const Has: React.FC<HasProps> = (props) => {
  const { children, flag, value, not, exact, fallback } = props

  const ids = typeof flag === 'string' ? [flag] : flag

  const matchedFlags = useHasFlags(ids, value)

  const matches = Object.keys(matchedFlags).length

  const enabled = exact === false ? !!matches : ids.length === matches

  if (enabled || (not && !enabled)) {
    return <>{runIfFn(children, { flags: matchedFlags })}</>
  } else if (fallback) {
    return <>{fallback}</>
  }

  return null
}

if (__DEV__) {
  Has.displayName = 'Has'
}

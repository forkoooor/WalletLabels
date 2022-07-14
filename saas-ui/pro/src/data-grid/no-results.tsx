import * as React from 'react'
import {
  Button,
  EmptyStateContainer,
  EmptyStateContainerProps,
  EmptyStateActions,
  EmptyStateDescription,
} from '@saas-ui/react'
import { useDataGridContext } from './data-grid'

export interface NoResultsProps
  extends Omit<EmptyStateContainerProps, 'title'> {
  title?: string
  resource?: string
  clearLabel?: string
  onReset?(): void
}

export const NoResults: React.FC<NoResultsProps> = (props) => {
  const { state } = useDataGridContext()

  const count = state.filters.length || 'your'

  const {
    resource = 'results',
    title = state.globalFilter
      ? `No ${resource} found for "${state.globalFilter}"`
      : `No ${resource} matching ${count} filters.`,
    clearLabel = 'Clear filters',
    onReset,
    ...rest
  } = props

  return (
    <EmptyStateContainer variant="no-results" {...rest}>
      <EmptyStateDescription>{title}</EmptyStateDescription>
      {!!state.filters.length && (
        <EmptyStateActions>
          <Button
            onClick={onReset}
            label={clearLabel}
            variant="ghost"
            size="xs"
          />
        </EmptyStateActions>
      )}
    </EmptyStateContainer>
  )
}

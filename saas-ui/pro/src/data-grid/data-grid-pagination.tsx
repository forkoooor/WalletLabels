import * as React from 'react'

import { chakra, HTMLChakraProps, useMultiStyleConfig } from '@chakra-ui/react'
import { IconButton } from '@saas-ui/react'
import { useDataGridContext } from './data-grid'

import { ChevronLeftIcon, ChevronRightIcon } from '../icons'

import { cx } from '@chakra-ui/utils'
import { ButtonGroup, FormControl, FormLabel, Input } from '@chakra-ui/react'

export interface DataGridPaginationProps
  extends Omit<HTMLChakraProps<'div'>, 'onChange'> {
  onChange?(props: { pageIndex: number; pageSize: number }): void
}

export const DataGridPagination: React.FC<DataGridPaginationProps> = (
  props,
) => {
  const { className, onChange, ...rest } = props
  const {
    instance,
    state: { pageIndex, pageSize },
  } = useDataGridContext()

  const styles = useMultiStyleConfig('DataGridPagination', props)

  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = instance

  const containerStyles = {
    px: 4,
    py: 2,
    display: 'flex',
    flexDirection: 'row',
    ...styles.container,
  }

  React.useEffect(() => {
    onChange?.({ pageIndex, pageSize })
  }, [pageIndex, pageSize])

  return (
    <chakra.div
      className={cx('saas-data-grid__pagination', className)}
      __css={containerStyles}
      {...rest}
    >
      <FormControl display="flex" flexDirection="row" alignItems="center">
        <FormLabel mb="0">Page</FormLabel>
        <Input
          type="number"
          value={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
          onFocus={(e) => e.target.select()}
          w="20"
          size="sm"
          isDisabled={pageCount === 0}
        />
        <chakra.span ms="2"> of {pageCount}</chakra.span>
      </FormControl>

      <ButtonGroup ms="2">
        <IconButton
          onClick={previousPage}
          isDisabled={!canPreviousPage}
          icon={<ChevronLeftIcon />}
          aria-label="Previous page"
        />
        <IconButton
          onClick={nextPage}
          isDisabled={!canNextPage}
          icon={<ChevronRightIcon />}
          aria-label="Next page"
        />
      </ButtonGroup>
    </chakra.div>
  )
}

import { useGetOrganizationQuery } from '@app/graphql'

import { Grid, GridItem } from '@chakra-ui/react'

import { FaGithub, FaTwitter } from 'react-icons/fa'

import {
  Page,
  ErrorPage,
  Toolbar,
  ToolbarButton,
  useTenant,
} from '@saas-ui/pro'

import { IntroTour } from '../components/intro-tour'

import { SalesByCountry } from '../components/metrics/sales-by-country'
import { Today } from '../components/metrics/today'
import { MRR } from '../components/metrics/mrr'

export function OverviewPage() {
  const tenant = useTenant()
  const { data, isLoading } = useGetOrganizationQuery({
    slug: tenant,
  })

  const organization = data?.organization

  if (!isLoading && !organization) {
    return (
      <ErrorPage
        title="No organization found"
        description={`We couldn't find a organization named ${tenant}`}
      />
    )
  }

  const toolbar = (
    <Toolbar className="overview-toolbar">
      <ToolbarButton
        as="a"
        href="https://twitter.com/intent/tweet?text=Check%20out%20%40saas_js,%20an%20advanced%20component%20library%20for%20SaaS%20products%20build%20with%20%40chakra_ui.%20https%3A//saas-ui.dev%20"
        icon={<FaTwitter />}
        label="Share on Twitter"
      />
      <ToolbarButton
        as="a"
        href="https://github.com/saas-js/saas-ui"
        icon={<FaGithub />}
        label="Star on Github"
      />
      <ToolbarButton
        as="a"
        href="https://appulse.gumroad.com/l/saas-ui-pro-pre-order"
        label="Pre-order"
        colorScheme="primary"
        className="pre-order"
      />
    </Toolbar>
  )

  return (
    <Page title={organization?.name} toolbar={toolbar} isLoading={isLoading}>
      <IntroTour />
      <Grid
        templateColumns={['repeat(1, 1fr)', null, 'repeat(3, 1fr)']}
        width="100%"
        gap="4"
        p="4"
      >
        <GridItem colSpan={2}>
          <MRR />
        </GridItem>
        <GridItem rowSpan={[0, null, 2]}>
          <Today />
        </GridItem>
        <GridItem colSpan={2}>
          <SalesByCountry />
        </GridItem>
      </Grid>
    </Page>
  )
}

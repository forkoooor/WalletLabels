import { createPage } from '@app/nextjs'
import { AccountApiPage } from '@app/features/settings'

const { Page, metadata } = createPage({
  title: 'API',
  renderComponent: AccountApiPage,
})

export { metadata }
export default Page

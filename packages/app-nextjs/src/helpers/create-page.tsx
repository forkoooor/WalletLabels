import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export interface CreatePageProps {
  title?: string
  layout?: React.ReactNode
  isPublic?: boolean
  renderComponent: React.FC<PageProps>
}

export interface PageFC extends React.FC {
  layout?: React.ReactNode
  isPublic?: boolean
}

export interface NavigateOptions {
  replace?: boolean
}

export interface PageProps {
  query: Record<string, any>
  locale?: string
}

/**
 * @todo implement features/roles/auth/layouts/data loading?
 *
 * Inspired by
 * https://blog.rstankov.com/structuring-next-js-application/
 */
export const createPage = (props: CreatePageProps): PageFC => {
  const { title, layout, isPublic, renderComponent: PageComponent } = props

  const Page: PageFC = (props) => {
    const router = useRouter()

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>

        <PageComponent query={router.query} locale={router.locale} {...props} />
      </>
    )
  }

  Page.layout = layout
  Page.isPublic = isPublic

  return Page
}

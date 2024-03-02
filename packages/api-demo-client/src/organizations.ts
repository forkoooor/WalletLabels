
import slug from 'slug'
import * as mocks from '@common/mocks'
import { addDays } from 'date-fns'
import { supabase } from '@app/config'
import { useAuth } from '@saas-ui/auth'
import { useFetchOrgs } from '../../../apps/web/src/features/common/hooks/use-fetch-orgs';
import { useQuery } from '@tanstack/react-query'



export const getOrganization = async (variables: { slug?: string | null, user?: any }) => {
  const { slug, user } = variables
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .contains('user_ids', [user?.id]); // Adjusted to search in 'user_ids' array

  if (error) {
    throw error;
  }

  const matchedOrg = data?.find(org => org.name === slug);


  return {

    organization: matchedOrg?? null,
  }
}

export const getOrganizations = async (variables: {  user?: any }) => {
  const { user } = variables
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .contains('user_ids', [user?.id]); // Adjusted to search in 'user_ids' array

  if (error) {
    throw error;
  }

  return { organizations: data ?? [] }
}

// export const inviteToOrganization = async (variables: {
//   emails: string[]
//   organizationId: string
//   role?: string
// }) => {
//   return { inviteToOrganization: true }
// }

// export const removeUserFromOrganization = async (variables: {
//   userId: string
//   organizationId: string
// }) => {
//   return { removeUserFromOrganization: true }
// }

export const createOrganization = async (variables: {
  name: string
  slug?: string | null
}) => {
  const organization = mocks.getOrganization()

  const data = {
    ...organization,
    id: organization ? String(parseInt(organization.id) + 1) : '1',
    name: variables.name,
    slug: variables.slug || slug(variables.name),
    email: 'hello@saas-ui.dev',
    logo: '/img/saasui-round.png',
    members: [
      {
        id: '1',
        user: {
          id: '1',
        },
        roles: ['owner', 'admin'],
      },
    ],
    subscription: {
      id: '1',
      plan: 'pro',
      status: 'trialing',
      startedAt: new Date('2022-01-01').toISOString(),
      trialEndsAt: addDays(new Date(), 14).toISOString(),
    },
  }

  mocks.organizationStore.getState().add(data)

  return {
    createOrganization: data,
  }
}

export const updateOrganization = async (variables: {
  id: string
  name: string
  email?: string | null
}) => {
  const data = {
    id: variables.id,
    name: variables.name,
    email: variables.email,
  }

  return {
    updateOrganization: data,
  }
}

// export const updateMemberRoles = async (variables: {
//   userId: string
//   organizationId: string
//   roles: string[]
// }) => {
//   return { updateMemberRoles: true }
// }

// export const subscribeToNewsletter = async (data: {
//   workspace: string
//   newsletter: boolean
// }) => {
//   return new Promise<void>((resolve) => {
//     setTimeout(() => {
//       resolve()
//     }, 200)
//   })
// }

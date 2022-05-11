export const plans = [
  {
    id: 'pro',
    name: 'Professional',
    description: 'Perfect for small teams.',
    period: 'monthly',
    price: '€50,-',
    priceLabel: 'per user/month',
    features: {
      users: 'Max 3',
      inbox: true,
      contacts: true,
      api: false,
      support: false,
    },
    productId: 28551,
  },
  {
    id: 'pro_yearly',
    name: 'Professional',
    description: 'Perfect for small teams.',
    period: 'yearly',
    price: '€40,-',
    priceLabel: 'per user/month',
    features: {
      users: 'Max 3',
      inbox: true,
      contacts: true,
      api: false,
      support: false,
    },
    productId: 28632,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Complete package for growing teams.',
    period: 'monthly',
    price: '€100,-',
    priceLabel: 'per user/month',
    features: {
      users: 'Unlimited',
      inbox: true,
      contacts: true,
      api: true,
      support: 'Priority',
    },
    productId: 28552,
  },
  {
    id: 'enterprise_yearly',
    name: 'Enterprice',
    description: 'Complete package for growing teams.',
    period: 'yearly',
    price: '€80,-',
    priceLabel: 'per user/month',
    features: {
      users: 'Unlimited',
      inbox: true,
      contacts: true,
      api: true,
      support: 'Priority',
    },
    productId: 28631,
  },
]

export const features = [
  {
    id: 'users',
    label: 'Users',
    description: 'The amount of active user accounts.',
  },
  {
    id: 'inbox',
    label: 'Inbox',
    description: 'Send and receive messages.',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    description: 'Manage people and companies.',
  },
  {
    id: 'api',
    label: 'Api access',
    description: 'Access our API',
  },
  {
    id: 'support',
    label: 'Support',
  },
]

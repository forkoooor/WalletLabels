import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    // Iron session requires a secret of at least 32 characters
    NEXTAUTH_SECRET: z
      .string()
      .min(32)
      .default("complex_password_at_least_32_characters_long"),
    DATABASE_URL: z.string().url().optional(),
    DATABASE_URL_ACCELERATE: z.string().url().optional(),
    APP_ADMINS: z
      .string()
      .regex(/^(0x[a-fA-F0-9]{40}( *, *0x[a-fA-F0-9]{40})* *)*$/)
      .optional(),
    DISCO_API_KEY: z.string().min(1).optional(),
    OPENAI_API_KEY: z.string().min(1).optional(),
    ETHERSCAN_API_KEY: z.string().min(1).optional(),
    ETHERSCAN_API_KEY_OPTIMISM: z.string().min(1).optional(),
    ETHERSCAN_API_KEY_ARBITRUM: z.string().min(1).optional(),
    ETHERSCAN_API_KEY_POLYGON: z.string().min(1).optional(),
    MORALIS_API_KEY: z.string().min(1).optional(),
    GITCOIN_PASSPORT_SCORER_ID: z.string().min(1).optional(),
    GITCOIN_PASSPORT_API_KEY: z.string().min(1).optional(),
    NEXTAUTH_URL: z.string().url(),
    SUPABASE_URL: z.string().url().optional(),
    SUPABASE_ANON_KEY: z.string().min(1).optional(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
    SUPABASE_HOST: z.string().min(1).optional(),
    SUPABASE_PORT: z.string().min(1).optional(),
    SUPABASE_NAME: z.string().min(1).optional(),
    SUPABASE_USER: z.string().min(1).optional(),
    SUPABASE_PASSWORD: z.string().min(1).optional(),
    AWS_ACCESS_KEY_ID: z.string().min(1).optional(),
    AWS_SECRET_ACCESS_KEY: z.string().min(1).optional(),
    AWS_REGION: z.string().min(1).optional(),
    AWS_INVOKE_URL: z.string().min(1).optional(),
    PUBLIC_URL: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_USE_PUBLIC_PROVIDER: z.enum(["true", "false"]).default("true"),
    NEXT_PUBLIC_PROD_NETWORKS_DEV: z.enum(["true", "false"]).default("false"),
    NEXT_PUBLIC_ALCHEMY_API_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_INFURA_API_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_LIVEPEER_API_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_PROJECT_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  },
  runtimeEnv: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_URL_ACCELERATE: process.env.DATABASE_URL_ACCELERATE,
    APP_ADMINS: process.env.APP_ADMINS,
    DISCO_API_KEY: process.env.DISCO_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEXT_PUBLIC_PROD_NETWORKS_DEV: process.env.NEXT_PUBLIC_PROD_NETWORKS_DEV,
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
    ETHERSCAN_API_KEY_OPTIMISM: process.env.ETHERSCAN_API_KEY_OPTIMISM,
    ETHERSCAN_API_KEY_ARBITRUM: process.env.ETHERSCAN_API_KEY_ARBITRUM,
    ETHERSCAN_API_KEY_POLYGON: process.env.ETHERSCAN_API_KEY_POLYGON,
    MORALIS_API_KEY: process.env.MORALIS_API_KEY,
    GITCOIN_PASSPORT_SCORER_ID: process.env.GITCOIN_PASSPORT_SCORER_ID,
    GITCOIN_PASSPORT_API_KEY: process.env.GITCOIN_PASSPORT_API_KEY,
    NEXT_PUBLIC_USE_PUBLIC_PROVIDER:
      process.env.NEXT_PUBLIC_USE_PUBLIC_PROVIDER,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    NEXT_PUBLIC_INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY,
    NEXT_PUBLIC_LIVEPEER_API_KEY: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_HOST: process.env.SUPABASE_HOST,
    SUPABASE_PORT: process.env.SUPABASE_PORT,
    SUPABASE_NAME: process.env.SUPABASE_NAME,
    SUPABASE_USER: process.env.SUPABASE_USER,
    SUPABASE_PASSWORD: process.env.SUPABASE_PASSWORD,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_INVOKE_URL: process.env.AWS_INVOKE_URL,
    PUBLIC_URL: process.env.PUBLIC_URL,
  },
})
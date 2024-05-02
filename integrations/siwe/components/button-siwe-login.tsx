"use client"

import { HTMLAttributes } from "react"
import { useAccount, useNetwork, useSignMessage } from "wagmi"

import { useUser } from "@/lib/hooks/use-user"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import { siweLogin } from "@/integrations/siwe/actions/siwe-login"

interface ButtonSIWELoginProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string
  disabled?: boolean
}
export const ButtonSIWELogin = ({
  className,
  label = "Sign-In With Ethereum",
  disabled,
  children,
  ...props
}: ButtonSIWELoginProps) => {
  const { mutateUser } = useUser()
  const { isLoading, signMessageAsync } = useSignMessage()
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { toast } = useToast()

  const handleCreateMessage = async () => {
    try {
      if (!address || !chain?.id) {
        return toast({
          title: "Error",
          description:
            "Please connect your wallet first, click on the 'Connect Wallet' button.",
          variant: "destructive",
        })
      }
      await siweLogin({ address, chainId: chain?.id, signMessageAsync })
      await mutateUser()
    } catch (error) {
      console.error(error)
    }
  }
  const classes = cn("relative", className)
  const labelClasses = cn({
    "opacity-0": isLoading,
  })

  return (
    <Button
      variant="emerald"
      size="lg"
      className={classes}
      disabled={disabled}
      type="button"
      onClick={() => void handleCreateMessage()}
      {...props}
    >
      {isLoading && (
        <span className="absolute left-1/2 top-1/2 inline-block size-5 -translate-x-1/2 -translate-y-1/2" />
      )}
      <span className={labelClasses}>{children || label || "Logout"}</span>
    </Button>
  )
}

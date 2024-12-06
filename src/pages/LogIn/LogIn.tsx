import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/useToast"
import { Button, Heading } from "@/components/ui"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui"
import { Input } from "@/components/ui"
import { useQuery } from "@tanstack/react-query"
import { logIn } from "@/api/queries"
import { UserEntityToAuth } from "@/types"
import { useRef } from "react"
import { useAuth } from "@/hooks/useAuth"
import { LogInFormSchema } from "@/constants/schemas"
import { Link } from "react-router-dom"
import { routes } from "@/lib/routes"

export const LogIn = () => {
  const userRef = useRef<UserEntityToAuth>()
  const form = useForm<z.infer<typeof LogInFormSchema>>({
    resolver: zodResolver(LogInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const { login } = useAuth()

  const { isLoading, refetch: logInUser } = useQuery({
    staleTime: 0,
    enabled: Boolean(userRef?.current?.email),
    queryKey: ["logInUser"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: async () => {
      if (!userRef.current) {
        return
      }

      const data = await logIn(userRef.current)

      if (!data || data.length === 0) {
        return toast({
          title: "Error: Incorrect login credentials. Please try again.",
          variant: "destructive",
        })
      }

      const user = data[0]

      toast({
        title: "You have logged in successfully!",
      })

      login(user)

      return user
    },
  })

  const onSubmit = async (user: z.infer<typeof LogInFormSchema>) => {
    userRef.current = user

    logInUser()
  }

  return (
    <Form {...form}>
      <div className="flex flex-col items-center gap-4">
        <Heading>Log in</Heading>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 md:w-2/3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Log in
          </Button>
          <div className="text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link to={routes.registration} className="underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </Form>
  )
}

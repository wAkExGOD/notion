import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui"
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
import { useState } from "react"

const FormSchema = z.object({
  email: z.string().email("Email must be valid").min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one digit"),
})

export const LogIn = () => {
  const [user, setUser] = useState<UserEntityToAuth>({
    email: "",
    password: "",
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { isLoading } = useQuery({
    enabled: !!user,
    queryKey: ["logInUser", user.email, user.password],
    queryFn: async () => {
      const data = await logIn(user)

      if (!data || data.length === 0) {
        toast({
          title: "Error: Incorrect login credentials. Please try again.",
          variant: "destructive",
        })
      }

      toast({
        title: "You have logged in successfully!",
      })

      return data
    },
  })

  const onSubmit = async (user: z.infer<typeof FormSchema>) => {
    setUser(user)
  }

  return (
    <Form {...form}>
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-2xl">Log in</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </div>
    </Form>
  )
}

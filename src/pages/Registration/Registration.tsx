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
import { useMutation } from "@tanstack/react-query"
import { register } from "@/api/mutations"

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

export const Registration = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutate: registerUser } = useMutation({
    mutationFn: register,
    onSuccess: () =>
      toast({
        title: "You have successfully registered",
      }),
    onError: (error) =>
      toast({
        title: "Registration failed. Please try again later",
        description: error.message,
        variant: "destructive",
      }),
  })

  const onSubmit = async (user: z.infer<typeof FormSchema>) => {
    registerUser(user)
  }

  return (
    <Form {...form}>
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-2xl">Registration</h1>
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
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Form>
  )
}

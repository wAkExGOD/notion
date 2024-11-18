import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/useToast";
import { Button } from "@/components/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui";
import { Input } from "@/components/ui";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/mutations";
import { useNavigate } from "react-router-dom";
import { routes } from "@/lib/routes";
import { useAuth } from "@/hooks/useAuth";
import { RegistrationFormSchema } from "@/constants/authSchemas";

export const Registration = () => {
  const form = useForm<z.infer<typeof RegistrationFormSchema>>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const { mutate: registerUser } = useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      toast({
        title: "You have successfully registered",
      });

      login(user);

      navigate(routes.home, { replace: true });
    },
    onError: (error) =>
      toast({
        title: "Registration failed. Please try again later",
        description: error.message,
        variant: "destructive",
      }),
  });

  const onSubmit = async (user: z.infer<typeof RegistrationFormSchema>) => {
    registerUser(user);
  };

  return (
    <Form {...form}>
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-2xl">Registration</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
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
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Repeat password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Form>
  );
};

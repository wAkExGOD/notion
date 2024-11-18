import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/useToast"
import { Button, Textarea } from "@/components/ui"
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
import { CreateNoteFormSchema } from "@/constants/schemas"
import { createNote as createNoteMutation } from "@/api/mutations"
import { useNavigate } from "react-router-dom"
import { routes } from "@/lib/routes"
import { useAuth } from "@/hooks/useAuth"
import { useNotes } from "@/hooks/useNotes"

export const CreateNote = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const form = useForm<z.infer<typeof CreateNoteFormSchema>>({
    resolver: zodResolver(CreateNoteFormSchema),
    defaultValues: {
      name: "",
      text: "",
    },
  })

  const { refetchNotes } = useNotes()

  const { mutate: createNote, isPending } = useMutation({
    mutationFn: createNoteMutation,
    onSuccess: () => {
      toast({
        title: "You have successfully created a note",
      })

      refetchNotes()

      navigate(routes.notes.root)
    },
    onError: (error) =>
      toast({
        title: "Note creation failed",
        description: error.message,
        variant: "destructive",
      }),
  })

  const onSubmit = async (note: z.infer<typeof CreateNoteFormSchema>) => {
    createNote({
      ...note,
      userId: user.id,
    })
  }

  return (
    <Form {...form}>
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-2xl">Create note</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Textarea placeholder="Text" rows={8} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Create
          </Button>
        </form>
      </div>
    </Form>
  )
}

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
import { useMutation, useQuery } from "@tanstack/react-query"
import { CreateNoteFormSchema } from "@/constants/schemas"
import { editNote as editNoteMutation } from "@/api/mutations"
import { useNavigate, useParams } from "react-router-dom"
import { routes } from "@/lib/routes"
import { useAuth } from "@/hooks/useAuth"
import { useNotes } from "@/hooks/useNotes"
import { getNote } from "@/api/queries"
import { useEffect } from "react"

export const EditNote = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { refetchNotes } = useNotes()

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    enabled: Boolean(id),
    queryKey: ["notes", id],
    queryFn: () => getNote(String(id)),
  })

  const form = useForm<z.infer<typeof CreateNoteFormSchema>>({
    resolver: zodResolver(CreateNoteFormSchema),
    defaultValues: {
      name: "",
      text: "",
    },
  })

  const { mutate: editNote, isPending } = useMutation({
    mutationFn: editNoteMutation,
    onSuccess: () => {
      toast({
        title: `You have successfully edited note #${id}`,
      })

      refetchNotes()

      navigate(routes.notes.root)
    },
    onError: (error) =>
      toast({
        title: "Note editing failed",
        description: error.message,
        variant: "destructive",
      }),
  })

  const onSubmit = async (editedNote: z.infer<typeof CreateNoteFormSchema>) => {
    if (!id) {
      return
    }

    editNote({ ...note, ...editedNote, id, userId: user.id })
  }

  useEffect(() => {
    if (!note) {
      return
    }

    form.setValue("name", note.name)
    form.setValue("text", note.text)
  }, [note, form])

  if (error) {
    return <p className="destructive">Error loading note</p>
  }

  return (
    <Form {...form}>
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-2xl">Edit note</h1>
        {isLoading && <div>Note is loading...</div>}
        {!isLoading && (
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
        )}
      </div>
    </Form>
  )
}

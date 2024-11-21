import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button, Heading, Textarea } from "@/components/ui"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui"
import { Input } from "@/components/ui"
import { CreateNoteFormSchema } from "@/constants/schemas"
import { useEffect } from "react"
import { PagesNavigation } from "@/components/common"

export type NoteFormValues = z.infer<typeof CreateNoteFormSchema>

export type NoteFormProps = {
  onSubmit: (note: NoteFormValues) => void
  processing?: boolean
  initialValues?: NoteFormValues
}

export const NoteForm: React.FC<NoteFormProps> = (props) => {
  const form = useForm<z.infer<typeof CreateNoteFormSchema>>({
    resolver: zodResolver(CreateNoteFormSchema),
    defaultValues: {
      name: "",
      text: "",
    },
  })

  const onSubmit = (note: z.infer<typeof CreateNoteFormSchema>) => {
    props.onSubmit(note)
  }

  useEffect(() => {
    if (!props.initialValues) {
      return
    }

    const { name, text } = props.initialValues

    form.setValue("name", name)
    form.setValue("text", text)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialValues])

  return (
    <div className="flex flex-col gap-2">
      <PagesNavigation />
      <Form {...form}>
        <div className="flex flex-col items-center gap-4">
          <Heading>{props.initialValues ? "Update" : "Create"} note</Heading>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl autoFocus>
                    <Input {...field} />
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
                    <Textarea rows={8} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={props.processing}>
              Create
            </Button>
          </form>
        </div>
      </Form>
    </div>
  )
}

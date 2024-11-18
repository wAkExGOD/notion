import { z } from "zod"

const MIN_PASSWORD_LENGTH = 8
const MIN_NOTE_NAME_LENGTH = 2

const MESSAGES = {
  EMAIL_INVALID: "Email must be valid",
  EMAIL_MIN_LENGTH: "Email must be at least 2 characters.",
  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters long",
  PASSWORD_UPPER_CASE: "Password must contain at least one uppercase letter",
  PASSWORD_LOWER_CASE: "Password must contain at least one lowercase letter",
  PASSWORDS_NOT_MATCH: "Passwords do not match",
}

const authFormFields = {
  email: z.string().email(MESSAGES.EMAIL_INVALID).min(2, {
    message: MESSAGES.EMAIL_MIN_LENGTH,
  }),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, MESSAGES.PASSWORD_MIN_LENGTH)
    .regex(/[A-Z]/, MESSAGES.PASSWORD_UPPER_CASE)
    .regex(/[a-z]/, MESSAGES.PASSWORD_LOWER_CASE),
}

export const LogInFormSchema = z.object(authFormFields)

export const RegistrationFormSchema = z
  .object({
    ...authFormFields,
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: MESSAGES.PASSWORDS_NOT_MATCH,
    path: ["repeatPassword"],
  })

export const CreateNoteFormSchema = z.object({
  name: z.string().min(MIN_NOTE_NAME_LENGTH),
  text: z.string(),
})

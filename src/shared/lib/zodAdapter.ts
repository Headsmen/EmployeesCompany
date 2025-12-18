import { z } from 'zod'

export const zodToFormikValidate = <T>(schema: z.ZodSchema<T>) => {
  return (values: T) => {
    const result = schema.safeParse(values)
    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0].toString()] = issue.message
        }
      })
      return errors
    }
    return {}
  }
}

interface FormLabelProps {
  children: string
}

export function FormLabel({ children }: FormLabelProps) {
  return (
    <label className="text-sm text-secondary-foreground font-semibold">
      {children}
    </label>
  )
}

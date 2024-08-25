interface QuickDataCardProps {
  Title: string
  Data: string
  Color: string
}
export function QuickDataCard({ Title, Data, Color }: QuickDataCardProps) {
  return (
    <article
      className={`flex flex-col bg-secondary w-fit py-3 pl-4 pr-14 rounded-md gap-1`}
    >
      <h3 className="text-xs font-normal text-secondary-foreground/80">
        {Title}
      </h3>
      <p className={`text-base font-bold ${Color}`}>{Data}</p>
    </article>
  )
}

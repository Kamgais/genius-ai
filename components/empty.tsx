import Image from "next/image"


interface EmptyProps  {
    label: string,
    image: string
}

export default function Empty({label, image}: EmptyProps) {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-96 w-96">
        <Image
        alt="Empty"
        fill
        src={image}
        />
      </div>
      <p className="text-muted-foreground text-sm text-center">
        {label}
      </p>
    </div>
  )
}

"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface LavandaLogoProps {
  className?: string
  showFullName?: boolean
}

export function LavandaLogo({ className, showFullName = true }: LavandaLogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {showFullName && (
        <div className="flex items-center gap-1">
          <Image src="/letters/L.svg" alt="L" width={18} height={26} className="h-6 w-auto" />
          <Image src="/letters/A1.svg" alt="A" width={28} height={26} className="h-6 w-auto" />
          <Image src="/letters/V.svg" alt="V" width={25} height={26} className="h-6 w-auto" />
          <Image src="/letters/A2.svg" alt="A" width={27} height={26} className="h-6 w-auto" />
          <Image src="/letters/N.svg" alt="N" width={22} height={26} className="h-6 w-auto" />
          <Image src="/letters/D.svg" alt="D" width={23} height={26} className="h-6 w-auto" />
          <Image src="/letters/A3.svg" alt="A" width={27} height={26} className="h-6 w-auto" />
        </div>
      )}
    </div>
  )
}

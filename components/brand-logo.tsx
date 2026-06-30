import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "isotype" | "horizontal" | "stacked";
  tone?: "navy" | "white";
  size?: number;
  wordmarkClassName?: string;
  className?: string;
};

export function BrandLogo({
  variant = "horizontal",
  tone = "navy",
  size = 40,
  wordmarkClassName,
  className,
}: BrandLogoProps) {
  const src = tone === "white" ? "/salutia-logo-white.png" : "/salutia-logo.png";

  const mark = (
    <Image
      src={src}
      width={size}
      height={size}
      alt="Salutia"
      priority
      className="shrink-0"
      style={{ width: size, height: size }}
    />
  );

  if (variant === "isotype") {
    return <span className={className}>{mark}</span>;
  }

  const wordmark = (
    <span
      className={cn(
        "font-heading font-bold tracking-tight",
        tone === "white" ? "text-white" : "text-brand-ink",
        wordmarkClassName,
      )}
      style={{ fontSize: size * 0.7 }}
    >
      salutia
    </span>
  );

  return (
    <span
      className={cn(
        "inline-flex items-center",
        variant === "stacked" ? "flex-col gap-1" : "gap-2",
        className,
      )}
    >
      {mark}
      {wordmark}
    </span>
  );
}

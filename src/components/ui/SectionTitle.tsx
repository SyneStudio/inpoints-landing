import { cn } from "@/lib/utils";
import { Kicker } from "./Kicker";
import { Reveal } from "./Reveal";

/** Shared section header: kicker + title + optional lead paragraph. */
export function SectionTitle({
  kicker,
  title,
  lead,
  align = "left",
  className,
}: {
  kicker?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {kicker && <Kicker>{kicker}</Kicker>}
      <h2 className={cn("text-h2 max-w-3xl", align === "center" && "mx-auto")}>
        {title}
      </h2>
      {lead && (
        <p className={cn("text-lead max-w-2xl", align === "center" && "mx-auto")}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}

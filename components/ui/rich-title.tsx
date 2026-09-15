import { Accent } from "@/components/ui/accent";
import type { RichText } from "@/lib/types";

/** Rende un titolo `{ text, accent }`: la parte `accent` riceve la pennellata. */
export function RichTitle({ value }: { value: RichText }) {
  return (
    <>
      {value.text}
      {value.accent ? (
        <>
          {" "}
          <Accent>{value.accent}</Accent>
        </>
      ) : null}
    </>
  );
}

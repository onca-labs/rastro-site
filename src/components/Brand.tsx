import { asset } from "@/lib/site";

/** The green R mark from the app's Settings → About. Decorative; pair it with
 *  visible text. */
export default function Brand({ size = 32 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset("/images/mark-green.png")}
      alt=""
      width={size}
      height={Math.round((size * 395) / 417)}
    />
  );
}

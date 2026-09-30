import { asset } from "@/lib/site";

/** The R mark: green on light backgrounds, ivory in dark mode (the same pair
 *  the app uses in Settings → About). Decorative; pair it with visible text. */
export default function Brand({ size = 32 }: { size?: number }) {
  return (
    <picture>
      <source srcSet={asset("/images/mark-ivory.png")} media="(prefers-color-scheme: dark)" />
      <img
        src={asset("/images/mark-green.png")}
        alt=""
        width={size}
        height={Math.round((size * 395) / 417)}
      />
    </picture>
  );
}

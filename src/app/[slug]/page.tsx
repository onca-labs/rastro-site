import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuidePage from "@/components/GuidePage";
import { GUIDES, findGuide, guidePath } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

// Only the slugs in the registry exist; anything else is a 404 at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = findGuide((await params).slug);
  if (!guide) notFound();
  return pageMetadata({ title: guide.title, description: guide.description, path: guidePath(guide) });
}

export default async function Page({ params }: Props) {
  const guide = findGuide((await params).slug);
  if (!guide) notFound();
  return <GuidePage guide={guide} />;
}

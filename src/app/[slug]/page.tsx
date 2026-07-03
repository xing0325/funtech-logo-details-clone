import { notFound } from "next/navigation";
import ExperienceFrame from "@/components/ExperienceFrame";
import { slides, type SlideSlug } from "@/data/slides";

export function generateStaticParams() {
  return slides.slice(1).map((slide) => ({ slug: slide.slug }));
}

export default async function SlidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slides.some((slide) => slide.slug === slug)) notFound();
  return <ExperienceFrame initialSlug={slug as SlideSlug} />;
}

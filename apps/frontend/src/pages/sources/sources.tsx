

import { useEffect, useRef } from "react";
import LinkSection from "./sourcesComponents/links-sections";
import PreviewSection from "./sourcesComponents/preview-section";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
const Sources = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;

    const handleScroll = (event: WheelEvent) => {
      if (isScrolling) return;

      isScrolling = true;
      const sections = Array.from(container.children) as HTMLElement[];
      const direction = event.deltaY > 0 ? 1 : -1;

      const currentSection = sections.find(
        (section) => section.getBoundingClientRect().top >= 0
      );

      if (currentSection) {
        const nextIndex = Math.max(
          0,
          Math.min(sections.indexOf(currentSection) + direction, sections.length - 1)
        );

        sections[nextIndex].scrollIntoView({ behavior: "smooth" });
      }

      setTimeout(() => {
        isScrolling = false;
      }, 800);
    };

    container.addEventListener("wheel", handleScroll);

    return () => container.removeEventListener("wheel", handleScroll);
  }, []);
  const scrollToNextSection = (direction: 1 | -1) => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(container.children) as HTMLElement[];
    const currentSection = sections.find(
      (section) => section.getBoundingClientRect().top >= 0
    );

    if (currentSection) {
      const nextIndex = Math.max(
        0,
        Math.min(sections.indexOf(currentSection) + direction, sections.length - 1)
      );

      sections[nextIndex].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="h-screen overflow-hidden p-5">
      <div className="h-screen flex flex-col items-center justify-between pb-3  ">
        <LinkSection />
        <div className="flex flex-col items-center">
          <span> Your Sources</span>
          <Button variant={"ghost"} size={"icon"} onClick={() => scrollToNextSection(1)}>
            <ChevronDown />

          </Button>
        </div>
      </div>
      <div className="h-screen flex items-center justify-center ">
        <PreviewSection />
      </div>
    </div>
  );
};

export default Sources;

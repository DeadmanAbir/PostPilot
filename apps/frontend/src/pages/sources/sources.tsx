import { useEffect, useRef } from "react";
import PreviewSection from "./sourcesComponents/preview-section";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import LinkSection2 from "./sourcesComponents/links-sections-2";
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
          Math.min(
            sections.indexOf(currentSection) + direction,
            sections.length - 1
          )
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
        Math.min(
          sections.indexOf(currentSection) + direction,
          sections.length - 1
        )
      );

      sections[nextIndex].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="container mx-auto  p-5">
      <div className="min-h-screen flex flex-col items-center justify-between  relative  ">
        <LinkSection2 />
        <div className="flex flex-col items-center absolute bottom-5">
          <span> Your Sources</span>
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => scrollToNextSection(1)}
          >
            <ChevronDown />
          </Button>
        </div>
      </div>
      {/* <div className="min-h-screen flex items-center justify-center overflow-visible  ">
        <PreviewSection />
      </div> */}
    </div>
  );
};

export default Sources;

import { useEffect, useRef } from "react";

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Dots = () => {
  const rows = 40;
  const columns = 40;
  const transitionDuration = 250;
  const indices = [7, 15, 19, 29, 26, 34, 46, 55, 60, 67, 70, 74, 83];

  while (indices.length < 100) {
    const value = Math.floor(Math.random() * 1601); // Random between 0 and 400
    if (!indices.includes(value)) {
      indices.push(value);
    }
  }
  const states = ["off", "medium", "high"];

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutIds: number[] = [];

    const interval = setInterval(() => {
      indices.forEach((index) => {
        const light = ref.current?.querySelector(`[data-index="${index}"]`);

        if (!light) {
          return;
        }

        const nextState = states[Math.floor(Math.random() * states.length)];
        const currentState = (light as HTMLElement).dataset.state;

        const pulse =
          Math.random() > 0.2 &&
          ((currentState === "off" && nextState === "high") ||
            (currentState === "off" && nextState === "medium") ||
            (currentState === "medium" && nextState === "high"));

        if (pulse) {
          const delay = getRandomNumber(100, 500);

          timeoutIds.push(
            window.setTimeout(() => {
              (light as HTMLElement).style.transform = "scale(2)";
            }, delay),
          );

          timeoutIds.push(
            window.setTimeout(() => {
              (light as HTMLElement).style.transform = "scale(1)";
            }, transitionDuration + delay),
          );
        }

        if (currentState === "high" && nextState === "medium" && pulse) {
          (light as HTMLElement).dataset.state = "off";
        } else {
          (light as HTMLElement).dataset.state = nextState;
        }

        // Update background color based on state
        switch (nextState) {
          case "off":
            (light as HTMLElement).style.background = "#333";
            break;
          case "medium":
            (light as HTMLElement).style.background = "#666";
            break;
          case "high":
            (light as HTMLElement).style.background = "#fff";
            break;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gap: `${columns}px`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {Array.from({ length: columns * rows }).map((_, i) => (
        <div
          key={i}
          data-state="off"
          data-index={i}
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "#333",
            transition: `all ${transitionDuration}ms ease`,
          }}
        />
      ))}
    </div>
  );
};

export default Dots;

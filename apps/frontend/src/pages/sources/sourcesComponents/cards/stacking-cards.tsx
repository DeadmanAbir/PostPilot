"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    // startFlipping();

    return () => clearInterval(interval);
  }, []);
  // const startFlipping = () => {
  //   interval = setInterval(() => {
  //     setCards((prevCards: Card[]) => {
  //       const newArray = [...prevCards]; // create a copy of the array
  //       newArray.unshift(newArray.pop()!); // move the last element to the front
  //       return newArray;
  //     });
  //   }, 10000);
  // };

  return (
    <div className="relative  w-[306px] h-[330px]">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white w-[336px] h-[300px] rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div className="font-normal text-neutral-700 dark:text-neutral-200">
              {card.content}
            </div>
            <div>
              <p className="text-neutral-500 font-medium dark:text-white">
                {card.name}
              </p>
              <p className="text-neutral-400 font-normal dark:text-neutral-200">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/3 flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full "
          onClick={() => {
            setCards((prevCards) => {
              const newArray = [...prevCards];
              // Move the last card to the front (backward navigation)
              const lastCard = newArray.pop();
              if (lastCard) {
                newArray.unshift(lastCard);
              }
              return newArray;
            });
          }}
        >
          <ChevronLeft />
        </Button>

        {/* Navigation dots */}
        <div className="flex gap-1.5">
          {cards.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === 0 ? "bg-gray-300" : "bg-gray-300"}`}
              onClick={() => {
                setCards((prevCards: Card[]) => {
                  const newArray = [...prevCards];
                  while (index !== 0) {
                    const firstCard = newArray.shift();
                    if (firstCard) {
                      newArray.push(firstCard);
                    }
                    index--;
                  }
                  return newArray;
                });
              }}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => {
            setCards((prevCards) => {
              const newArray = [...prevCards];
              const firstCard = newArray.shift();
              if (firstCard) {
                newArray.push(firstCard);
              }
              return newArray;
            });
          }}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

const TileEffect = () => {
  const tiles = Array.from({ length: 3599 }, (_, index) => (
    <div
      key={index}
      className="border-[0.5px] border-stone-100/10 
          "
    ></div>
  ));

  return (
    <div className="overflow-hidden flex items-center bg-black justify-center  aspect-video">
      <div className="absolute w-[140rem] aspect-square grid grid-rows-[repeat(20,1fr)] grid-cols-[repeat(20,1fr)]">
        {tiles}
      </div>
    </div>
  );
};

export default TileEffect;

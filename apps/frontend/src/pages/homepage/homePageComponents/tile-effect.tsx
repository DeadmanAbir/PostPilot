const TileEffect = () => {
    const tiles = Array.from({ length: 1599 }, (_, index) => (
        <div key={index} className="border-[1px] border-stone-100/20 
        hover:bg-stone-600 hover:[&:nth-child(6n)]:bg-stone-700
 hover:odd:bg-stone-400 hover:[&:nth-child(3n)]:bg-stone-500 
 duration-1000  hover:duration-0 transition-colors  "></div>
    ));

    return (
        <div className="overflow-hidden flex items-center bg-black justify-center  aspect-video">
            <div className="absolute w-[140rem] aspect-square grid grid-rows-[repeat(40,1fr)] grid-cols-[repeat(40,1fr)]">
                {tiles}
            </div>
        </div>
    );
};

export default TileEffect;
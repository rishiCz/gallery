async function loading() {
    const skeletons = Array(10).fill(true)
    return (
        <div className="flex basis-[65%] flex-wrap flex-grow-[1] flex-shrink-[1] gap-5 px-5">
            <div className="basis-[100%] flex gap-5">
                <div className="skeleton h-14 w-32"></div>
                <div className="skeleton h-14 w-40"></div>
            </div>
            {
                skeletons.map((_, i) =>
                    <div style={{ minWidth: (300 + (i % 3) * 100) }} key={i} className="skeleton h-64 flex-[auto] shrink-[1] grow--[1] "></div>)
            }
            <div className="h-full w-[10rem]"></div>
            <div className="h-full w-[10rem]"></div>
            <div className="h-full w-[10rem]"></div>
        </div>
    )
}

export default loading
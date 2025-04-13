async function loading() {
    const skeletons = Array(10).fill(true)
    return (
        <div className="flex basis-[65%] flex-wrap flex-grow-[1] flex-shrink-[1] gap-5 p-5">
            {
                skeletons.map((_, i) =>
                    <div style={{ minWidth: (300 + (i % 3) * 100) }} key={i} className="skeleton h-64 flex-[auto] shrink-[1] grow--[1] "></div>)
            }
        </div>
    )
}

export default loading
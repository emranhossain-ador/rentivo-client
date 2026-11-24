export default function UnavailabilityBadge() {
    return (
        <div className="absolute right-2 top-2 hidden md:inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/95 px-2.5 py-1 font-semibold text-white shadow-[0_0_15px_rgba(16,185,129,0.25)] backdrop-blur-md ">
            <span className="text-xs ">Out Of Stock</span>
        </div>
    )
}
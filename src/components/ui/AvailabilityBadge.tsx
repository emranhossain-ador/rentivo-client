export default function AvailabilityBadge() {
    return (
        <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/95 px-3.5 py-1.25 text-xs font-semibold text-white shadow-[0_0_15px_rgba(16,185,129,0.25)] backdrop-blur-md">

            {/* Animated Dot */}
            <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-200 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </span>

            <span>Available</span>
        </div>
    )
}
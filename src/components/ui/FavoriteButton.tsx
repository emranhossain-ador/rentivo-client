const FavoriteButton = () => {
    return (
        <button
            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-sm backdrop-blur transition hover:text-rose-500"
            aria-label="Add to favorites"
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
            >
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 20l8.8-7.6a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
        </button>
    )
}

export default FavoriteButton
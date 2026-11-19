

const Header = () => {
    return (
        <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm bg-brand/5 text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Dashboard Overview
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white ">
                Welcome back, Emran! 👋
            </h1>
        </div>
    )
};


export default Header;
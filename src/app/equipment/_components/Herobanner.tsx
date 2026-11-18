const Herobanner = () => {
    return (
        <div className="relative min-h-57.5 overflow-hidden px-5 py-14 sm:px-8 md:min-h-75 md:px-12 lg:px-14">

            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
                style={{
                    backgroundImage: "url('/image/equipment-hero.jfif')",
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/95 via-45% to-transparent" />

            {/* Decorative background */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-background/30 blur-3xl" />
            <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-background/10 to-transparent" />

            {/* Hero content */}
            <div className="relative z-10 section-container">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[42px]">
                    Find the Perfect Equipment
                    <br />
                    <span className="text-brand">
                        for Your Next Project
                    </span>
                </h1>

                <p className="mt-3 max-w-lg text-sm leading-6 text-foreground/80 sm:text-base">
                    Browse from our wide range of rental equipment and get
                    the best deals in your area.
                </p>
            </div>
        </div>
    );
};

export default Herobanner;
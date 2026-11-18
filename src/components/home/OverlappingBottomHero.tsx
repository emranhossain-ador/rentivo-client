import { cn } from "cn";
import { Headphones, ShieldCheck, Tag, Zap } from "lucide-react";

const FEATURES = [
    { icon: ShieldCheck, title: "Trusted & Secure", description: "Your safety is our priority" },
    { icon: Zap, title: "Fast & Easy Booking", description: "Rent in just a few clicks" },
    { icon: Headphones, title: "24/7 Support", description: "Always here to help" },
    { icon: Tag, title: "Affordable Pricing", description: "Get the best value" },
] as const;


const FEATURE_DIVIDERS = [
    "",
    "border-t border-border sm:border-t-0 sm:border-l",
    "border-t border-border lg:border-t-0 lg:border-l",
    "border-t border-border sm:border-l lg:border-t-0",
];

const OverlappingBottomHero = () => {
    return (
        <div className="relative z-10 section-container -m-14 rounded-3xl border border-border/70 bg-card p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)] ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {FEATURES.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={feature.title}
                            className={cn(
                                "flex items-start gap-4 border-border p-5 sm:p-6",
                                FEATURE_DIVIDERS[index]
                            )}
                        >
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-brand/30">
                                <Icon className="size-5" strokeWidth={2.5} />
                            </span>
                            <div className="min-w-0">
                                <p className="text-base font-bold text-foreground">{feature.title}</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default OverlappingBottomHero;
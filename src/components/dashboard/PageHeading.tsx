import { LucideIcon } from "lucide-react";

const PageHeading = ({ Icon, title, subTitle }: { Icon: LucideIcon, title: string, subTitle: string }) => {
    return (
        <div>
            <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" />
                </div>

                <h1 className="font-heading-grotesk text-2xl font-bold tracking-tight sm:text-3xl">
                    {title}
                </h1>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
                {subTitle}
            </p>
        </div>
    )
};


export default PageHeading;
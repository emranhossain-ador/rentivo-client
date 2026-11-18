
import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import Image from "next/image";

const users = [
    { id: 1, image: "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
    { id: 2, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
    { id: 3, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
    { id: 4, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
];

export default function RentalCTA() {
    return (
        <section className="section-container w-full py-5 ">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                {/* Ready to Rent Card */}
                <div className="group relative isolate flex min-h-35 items-center overflow-hidden rounded-2xl border border-indigo-300/20 bg-linear-to-r from-brand via-brand/70 to-brand/60 px-6 py-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-900/15 sm:px-8">

                    {/* Background Decorations */}
                    <div className="absolute -right-8 -top-20 -z-10 size-52 rounded-full bg-brand/20 blur-3xl" />
                    <div className="absolute bottom-0 right-20 -z-10 size-28 rounded-full bg-brand/20 blur-2xl" />

                    {/* Content */}
                    <div className="relative z-10 max-w-[75%]">
                        <h2 className="font-heading-grotesk text-xl font-bold tracking-tight text-white sm:text-2xl">
                            Ready to Rent?
                        </h2>

                        <p className="mt-1.5 text-xs leading-relaxed text-indigo-100 sm:text-sm">
                            Join thousands of happy users and get started today!
                        </p>

                        <Link
                            href="/register"
                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-brand shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-50 hover:shadow-lg active:scale-95"
                        >
                            Register Now
                            <ArrowRight size={15} />
                        </Link>
                    </div>

                    {/* Megaphone Illustration */}
                    <div className="absolute -right-1 bottom-0 top-0 flex items-center justify-center sm:right-5">
                        <div className="relative transition-transform duration-500 group-hover:rotate-[-10deg] group-hover:scale-110">
                            <div className="absolute inset-0 rounded-full bg-brand/30 blur-2xl" />

                            <div className="relative flex size-24 rotate-[-20deg] items-center justify-center sm:size-32">
                                <div className="absolute -top-2 left-0 text-brand">
                                    <span className="text-3xl font-bold">〰</span>
                                </div>
                                <Megaphone
                                    size={90}
                                    strokeWidth={1.5}
                                    className="fill-brand/20 text-white drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)] sm:size-27.5"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trusted Users Card */}
                <div className="group relative flex min-h-35 items-center justify-between gap-3 overflow-hidden rounded-2xl border border-[#E9E2FF] bg-linear-to-r from-[#F0ECFF] via-[#F4F0FF] to-[#EAE5FF] px-5 py-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-200/40 dark:shadow-gray-500/10 sm:px-8 dark:border-border dark:from-card dark:via-card dark:to-card">

                    {/* Decorative Background */}
                    <div className="absolute -right-10 -top-16 size-40 rounded-full bg-brand/60 blur-3xl" />

                    {/* Text */}
                    <div className="relative z-10 min-w-0">
                        <h2 className="font-heading-grotesk text-base font-bold tracking-tight text-foreground sm:text-xl">
                            Trusted by 10,000+ Users
                        </h2>

                        <p className="mt-1.5 text-xs leading-relaxed text-foreground/80 sm:text-sm">
                            A growing community of renters and owners.
                        </p>
                    </div>

                    {/* User Avatars */}
                    <div className="relative z-10 flex shrink-0 items-center pl-2">
                        <div className="flex -space-x-3 sm:-space-x-4">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className="relative size-9 overflow-hidden rounded-full border-[2.5px] border-white bg-gray-200 shadow-sm transition-transform duration-300 hover:z-20 hover:-translate-y-2 sm:size-12"
                                >
                                    <Image
                                        src={user.image}
                                        alt="Community member"
                                        width={36}
                                        height={36}
                                        className="size-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* 10K Badge */}
                        <div className="relative z-20 -ml-2 flex size-10 items-center justify-center rounded-full border-2 border-white bg-white text-[10px] font-extrabold text-[#28206D] shadow-md transition-transform duration-300 group-hover:scale-110 sm:size-12 sm:text-xs">
                            +10K
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

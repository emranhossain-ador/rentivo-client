import SignupForm from "@/components/auth/SignupForm";
import { UserRoundPlus } from "lucide-react";

const SignupPage = () => {


    return (
        <section className="section-container min-h-screen flex justify-center items-center my-5">

            <div className="bg-card max-w-lg w-full mx-auto shadow-md border border-border rounded-[30px] overflow-hidden p-4 md:p-8">
                {/* Form Header */}
                <div className="text-center mb-5">

                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl shadow-sm shadow-brand/30 bg-brand/5 border border-brand/30 text-4xl">
                        <UserRoundPlus className="size-8 animate-in zoom-in text-brand duration-300" />
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-[34px]">Create Account</h2>

                    <p className="mt-2 text-sm text-foreground/80">Join Rentivo and start renting today! </p>
                </div>

                {/* Form */}
                <SignupForm />

            </div>

        </section>
    )
};

export default SignupPage;
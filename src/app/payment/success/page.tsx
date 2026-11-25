import { Suspense } from "react";
import PaymentSuccessContent from "./PaymentSuccessContent";

const PaymentSuccessPage = () => {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
                    <p className="text-sm text-slate-500">Loading payment status...</p>
                </main>
            }
        >
            <PaymentSuccessContent />
        </Suspense>
    );
};

export default PaymentSuccessPage;

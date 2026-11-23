
"use client";

import { addFavorite, checkFavorite } from "@/lib/actions/favorite";
import { useSession } from "@/lib/auth-client";
import { Check, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddFavoritesBtn = ({
    equipmentId,
}: {
    equipmentId: string;
}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);

    const session = useSession();
    const user = session?.data?.user;

    const isCustomer =
        user?.role?.toLowerCase().trim() === "customer";

    // Check favorite status
    useEffect(() => {
        if (session.isPending) return;

        if (!user || !isCustomer) {
            setIsFavorite(false);
            setChecking(false);
            return;
        }

        let cancelled = false;

        const favoriteCheck = async () => {
            try {
                setChecking(true);

                const checked = await checkFavorite(
                    equipmentId,
                    user.id
                );

                if (!cancelled) {
                    setIsFavorite(checked);
                }
            } catch (error) {
                console.error("Favorite check error:", error);
            } finally {
                if (!cancelled) {
                    setChecking(false);
                }
            }
        };

        favoriteCheck();

        return () => {
            cancelled = true;
        };
    }, [equipmentId, user?.id, isCustomer, session.isPending]);

    // Add favorite
    const handleAddFavorites = async () => {
        if (!user || !isCustomer || isFavorite || loading) return;

        try {
            setLoading(true);

            const addFav = await addFavorite(
                equipmentId,
                user.id
            );

            if (addFav.success) {
                // Immediately update UI
                setIsFavorite(true);

                toast.success("Added to favorites!");
            } else {
                toast.error(addFav.message);
            }
        } catch (error) {
            console.error("Add favorite error:", error);
            toast.error("Failed to add favorite");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleAddFavorites}
            disabled={
                !user ||
                !isCustomer ||
                isFavorite ||
                loading ||
                checking
            }
            className="inline-flex items-center justify-center cursor-pointer gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-primary/5"
        >
            {isFavorite ? (
                <Heart
                    size={17}
                    className="text-rose-500 fill-rose-500"
                />
            ) : (
                <Heart size={17} />
            )}

            {checking
                ? "Checking..."
                : loading
                    ? "Adding..."
                    : isFavorite
                        ? "Added to Favorites"
                        : "Add to Favorites"}
        </button>
    );
};

export default AddFavoritesBtn;

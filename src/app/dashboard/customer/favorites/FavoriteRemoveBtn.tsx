"use client"

import { removeFavorite } from "@/lib/actions/favorite";
import { useSession } from "@/lib/auth-client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const FavoriteRemoveBtn = ({ favoriteId }: { favoriteId: string }) => {

    const session = useSession();
    const user = session?.data?.user;
    const router = useRouter();


    const [removing, setRemoving] = useState(false);

    const handleRemove = async () => {
        if (!user?.id || removing) return;

        try {
            setRemoving(true);

            const remove = await removeFavorite(
                favoriteId,
                user.id
            );

            if (remove.success) {
                toast.success(remove.message);
                router.refresh();
            }
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to remove favorite"
            );
        } finally {
            setRemoving(false);
        }
    };


    return (
        <button
            type="button"
            onClick={handleRemove}
            disabled={removing}
            className="inline-flex items-center gap-0.5 rounded-md border border-red-500 px-3 py-2 text-xs cursor-pointer font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
        >
            <Trash size={15} />
            {removing ? "Removing..." : "Remove"}
        </button>
    );
}

export default FavoriteRemoveBtn;
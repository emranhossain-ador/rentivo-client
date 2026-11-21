"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";
import { deleteEquipment } from "@/lib/actions/equipment";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const EquipmentDeleteDialog = ({ itemId }: { itemId: string }) => {

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {

        try {
            setDeleting(true);

            const result = await deleteEquipment(itemId);

            if (result.success) {
                toast.success("Equipment deleted successfully!");

                setDeleteDialogOpen(false);
                router.refresh();
            }
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to delete equipment!"
            );
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => {
                    setDeleteDialogOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-rose-500 px-2 py-2.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-500 hover:text-white cursor-pointer"
            >
                <Trash2 size={15} />
                Delete
            </button>



            <Dialog
                open={deleteDialogOpen}
                onOpenChange={(open) => {
                    if (!deleting) {
                        setDeleteDialogOpen(open);
                    }
                }}
            >
                <DialogContent className="sm:max-w-106.25 p-0 overflow-hidden gap-0">
                    <div className="p-6 pb-4">
                        <DialogHeader className="items-center text-center">
                            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                                <AlertTriangle className="h-7 w-7 text-destructive" />
                            </div>

                            <DialogTitle className="text-xl font-bold">
                                Delete Equipment?
                            </DialogTitle>

                            <DialogDescription className="mt-2 text-sm leading-6">
                                Are you sure you want to delete this equipment?
                                This action cannot be undone and all related
                                information may be permanently removed.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="p-4">
                        <DialogFooter className="flex-col-reverse sm:flex-row border-t bg-muted/30  gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full sm:w-auto h-10 px-4 cursor-pointer"
                                disabled={deleting}
                                onClick={() => setDeleteDialogOpen(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="button"
                                variant="destructive"
                                className="w-full sm:w-auto gap-2 h-10 px-4 cursor-pointer"
                                disabled={deleting}
                                onClick={handleDelete}
                            >
                                {deleting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="h-4 w-4" />
                                        Delete Equipment
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

        </>
    )
};

export default EquipmentDeleteDialog;
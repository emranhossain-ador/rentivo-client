"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { deleteEquipment, EquipmentStatus, updateEquipmentStatus } from "@/lib/actions/equipment";
import { EquipmentType } from "@/lib/type/equipmentType";
import { AlertTriangle, Check, Loader2, Pencil, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import EditEquipmentDialog from "./EditEquipmentDialog";

const MobileActionBtn = ({ equipment }: { equipment: EquipmentType }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const router = useRouter();

    const handleStatusUpdate = async (status: EquipmentStatus) => {
        try {
            const result = await updateEquipmentStatus(equipment._id as string, status);

            if (result.success) {
                toast.success(`Equipment ${status} successfully`);
                router.refresh();
            }
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update status"
            );
        }
    };


    const handleDelete = async () => {

        try {
            setDeleting(true);

            const result = await deleteEquipment(equipment._id as string);

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
            <div className="flex flex-wrap gap-2 border-t border-border pt-3" >
                {
                    equipment.status === "pending" &&
                    <>
                        <button
                            onClick={() => handleStatusUpdate("approved")}
                            className="flex flex-1 items-center justify-center gap-1 cursor-pointer transition-colors rounded-lg bg-emerald-500/10 py-2 text-xs font-bold text-emerald-600"
                        >
                            <Check className="h-3.5 w-3.5" />
                            Approve
                        </button>
                        <button
                            onClick={() => handleStatusUpdate("rejected")}
                            className="flex flex-1 items-center justify-center gap-1 cursor-pointer transition-colors rounded-lg bg-red-500/10 py-2 text-xs font-bold text-red-600"
                        >
                            <X className="h-3.5 w-3.5" />
                            Reject
                        </button>
                    </>
                }

                <button
                    onClick={() => setEditOpen(true)}
                    className="flex h-9 w-10 items-center justify-center rounded-lg cursor-pointer transition-colors border border-border text-blue-500 hover:bg-blue-500/10"
                    title="Update"
                >
                    <Pencil className="h-4 w-4" />
                </button>

                <button
                    onClick={() => {
                        setDeleteDialogOpen(true);
                    }}
                    className="flex h-9 w-10 items-center justify-center rounded-lg cursor-pointer transition-colors border border-border text-red-500 hover:bg-red-500/10"
                    title="Delete"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
            {/* Edit Dialog */}
            <EditEquipmentDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                equipment={equipment}
            />

            {/* Delete Dialog */}
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

}

export default MobileActionBtn;
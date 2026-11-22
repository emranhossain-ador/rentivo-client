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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { deleteEquipment, EquipmentStatus, updateEquipmentStatus } from "@/lib/actions/equipment";
import { EquipmentType } from "@/lib/type/equipmentType";
import { AlertTriangle, Check, Loader2, Pencil, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import EditEquipmentDialog from "./EditEquipmentDialog";

const ActionsBtn = ({ equipment }: { equipment: EquipmentType }) => {

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
            <div className="flex items-center justify-end gap-1.5">
                {/* Approve status */}
                {
                    equipment.status === 'pending' &&

                    <>
                        <Tooltip>
                            <TooltipTrigger render={
                                <Button
                                    variant="outline"
                                    onClick={() => handleStatusUpdate('approved')}
                                    className={'px-2.5 py-2 cursor-pointer border border-emerald-500/50! bg-emerald-500/10! text-emerald-500! transition-colors hover:bg-emerald-500! hover:text-white! '}>
                                    <Check size={16} strokeWidth={3} />
                                </Button>
                            } />

                            <TooltipContent>
                                <p>Approve</p>
                            </TooltipContent>
                        </Tooltip>

                        {/* Reject status */}
                        <Tooltip>
                            <TooltipTrigger render={
                                <Button variant="outline"
                                    onClick={() => handleStatusUpdate('rejected')}
                                    className={'px-2.5 py-2 cursor-pointer border border-red-500/50! bg-red-500/10! text-red-500! transition-colors hover:bg-red-500! hover:text-white! '}>
                                    <X size={16} strokeWidth={3} />
                                </Button>
                            } />
                            <TooltipContent>
                                <p>Reject</p>
                            </TooltipContent>
                        </Tooltip>

                        {/* Edit status */}
                        <Tooltip>
                            <TooltipTrigger render={
                                <Button variant="outline" onClick={() => setEditOpen(true)} className={'px-2.5 py-2 cursor-pointer border border-sky-500/50! bg-sky-500/10! text-sky-500! transition-colors hover:bg-sky-500! hover:text-white! '}><Pencil size={16} strokeWidth={3} /></Button>
                            } />

                            <TooltipContent>
                                <p>Edit</p>
                            </TooltipContent>
                        </Tooltip>
                    </>
                }




                {/* Delete status */}
                <Tooltip>
                    <TooltipTrigger render={
                        <Button variant="outline"
                            onClick={() => {
                                setDeleteDialogOpen(true);
                            }}
                            className={'px-2.5 py-2 cursor-pointer border border-rose-500/50! bg-rose-500/10! text-rose-500! transition-colors hover:bg-rose-500! hover:text-white! '}><Trash2 size={16} strokeWidth={3} /></Button>
                    } />
                    <TooltipContent>
                        <p>Delete</p>
                    </TooltipContent>
                </Tooltip>


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

export default ActionsBtn;
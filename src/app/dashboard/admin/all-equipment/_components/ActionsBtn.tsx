import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, Pencil, Trash2, X } from "lucide-react";

const ActionsBtn = () => {
    return (
        <div className="flex items-center justify-end gap-1.5">
            {/* Approve status */}
            <Tooltip>
                <TooltipTrigger render={
                    <Button variant="outline" className={'px-2.5 py-2 cursor-pointer border border-emerald-500/50! bg-emerald-500/10! text-emerald-500! transition-colors hover:bg-emerald-500! hover:text-white! '}><Check size={16} strokeWidth={3} /></Button>
                } />

                <TooltipContent>
                    <p>Approve</p>
                </TooltipContent>
            </Tooltip>

            {/* Reject status */}
            <Tooltip>
                <TooltipTrigger render={
                    <Button variant="outline" className={'px-2.5 py-2 cursor-pointer border border-red-500/50! bg-red-500/10! text-red-500! transition-colors hover:bg-red-500! hover:text-white! '}><X size={16} strokeWidth={3} /></Button>
                } />
                <TooltipContent>
                    <p>Reject</p>
                </TooltipContent>
            </Tooltip>

            {/* Edit status */}
            <Tooltip>
                <TooltipTrigger render={
                    <Button variant="outline" className={'px-2.5 py-2 cursor-pointer border border-sky-500/50! bg-sky-500/10! text-sky-500! transition-colors hover:bg-sky-500! hover:text-white! '}><Pencil size={16} strokeWidth={3} /></Button>
                } />

                <TooltipContent>
                    <p>Edit</p>
                </TooltipContent>
            </Tooltip>

            {/* Delete status */}
            <Tooltip>
                <TooltipTrigger render={
                    <Button variant="outline" className={'px-2.5 py-2 cursor-pointer border border-rose-500/50! bg-rose-500/10! text-rose-500! transition-colors hover:bg-rose-500! hover:text-white! '}><Trash2 size={16} strokeWidth={3} /></Button>
                } />
                <TooltipContent>
                    <p>Delete</p>
                </TooltipContent>
            </Tooltip>


        </div>
    )
}

export default ActionsBtn;
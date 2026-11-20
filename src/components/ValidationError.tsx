import { TriangleExclamationPoint } from "lucide-react"

export const ValidationErrors = ({ msg }: { msg: string }) => {
    return (
        <p className="text-sm text-red-500 flex items-center gap-1.5 pt-1"><TriangleExclamationPoint size={15} /> {msg}.</p>
    )
}
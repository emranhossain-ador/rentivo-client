import { ArrowRight } from "lucide-react"
import Link from "next/link"

const ViewAll = ({ url }: { url: string }) => {
    return (
        <Link href={url} className="inline-flex items-center gap-0.5 text-xs font-semibold text-primary transition-all hover:gap-2 hover:text-brand">
            View All <ArrowRight size={14} />
        </Link>
    )
}

export default ViewAll;
import { ChevronRight, Package } from "lucide-react";
import Link from "next/link";

const Breadcrumb = () => {
    return (
        <nav className="mb-5 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-sm text-foreground/80">
            <Link href={'/'} className="flex items-center gap-1 hover:text-sky-400 transition-colors font-medium">
                <Package size={13} />
                Home
            </Link>
            <ChevronRight size={13} />
            <Link href={'/equipment'} className="hover:text-sky-400 font-medium">Equipment</Link>
            <ChevronRight size={13} />
            <span className="font-semibold text-foreground">
                Equipment Details
            </span>
        </nav>
    )
}

export default Breadcrumb;
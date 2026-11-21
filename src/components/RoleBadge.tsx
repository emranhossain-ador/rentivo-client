
import { UserRole } from "@/lib/type/userType";
import { ChessQueen, ShieldCheck, User } from "lucide-react";

const roleConfig = {
    owner: {
        color: "bg-sky-500/10 text-sky-600 border-sky-500/20",
        icon: ChessQueen,
    },
    customer: {
        color: "bg-orange-500/10 text-orange-600 border-orange-500/20",
        icon: User,
    },
    admin: {
        color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
        icon: ShieldCheck,
    },
} satisfies Record<UserRole, { color: string; icon: typeof User }>;

const RoleBadge = ({ role }: { role: UserRole }) => {
    const { color, icon: Icon } = roleConfig[role];

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${color}`}>
            <Icon className="h-3.5 w-3.5" />
            {role}
        </span>
    );
};

export default RoleBadge;

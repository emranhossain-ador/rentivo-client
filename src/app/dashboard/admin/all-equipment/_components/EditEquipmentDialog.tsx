
"use client";

import { useEffect, useState } from "react";
import {
    Edit3,
    Package,
    MapPin,
    DollarSign,
    FileText,
    Loader2
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { EquipmentType } from "@/lib/type/equipmentType";
import { getCategories } from "@/lib/api/categoris";
import { CategoryType } from "@/lib/type/categoryType";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { updateEquipment } from "@/lib/actions/equipment";

interface EditEquipmentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    equipment: EquipmentType;
}

export default function EditEquipmentDialog({
    open,
    onOpenChange,
    equipment,
}: EditEquipmentDialogProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [categoriesList, setCategoriesList] = useState<CategoryType[]>([]);

    useEffect(() => {
        const fetchCats = async () => {
            const data = await getCategories();
            setCategoriesList(data || []);
        };
        fetchCats();
    }, []);

    const [formData, setFormData] = useState({
        equipmentName: "",
        description: "",
        categoryName: "",
        categorySlug: "",
        location: "",
        rentalPrice: 0,
        rentalType: "daily",
        quantity: 1,
        condition: "",
        brand: "",
        model: "",
        terms: "",
        images: [] as string[],
    });
    useEffect(() => {
        if (equipment) {
            setFormData({
                equipmentName: equipment.equipmentName || "",
                description: equipment.description || "",
                categoryName: equipment.categoryName || "",
                categorySlug: equipment.categorySlug || "",
                location: equipment.location || "",
                rentalPrice: equipment.rentalPrice || 0,
                rentalType: equipment.rentalType || "daily",
                quantity: equipment.quantity || 1,
                condition: equipment.condition || "",
                brand: equipment.brand || "",
                model: equipment.model || "",
                terms: equipment.terms || "",
                images: equipment.images || [],
            })
        }
    }, [equipment]);
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        if (name === "categoryName") {
            const matchedCategory = categoriesList.find((c) => c.name === value);
            setFormData((prev) => ({
                ...prev,
                categoryName: value,
                categorySlug: matchedCategory?.slug || prev.categorySlug,
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "rentalPrice" || name === "quantity"
                    ? value === "" ? "" : Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!equipment?._id) return;
        setLoading(true)

        try {
            const result = await updateEquipment(equipment._id as string, formData as EquipmentType);

            if (result.success) {
                onOpenChange(false);
                toast.success("Equipment updated successfully!");
                setLoading(false)
                router.push('/dashboard/admin/all-equipment');
            }
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update equipment"
            );
            setLoading(false)
            throw error;
        }
    };



    const inputClass =
        "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground/80 hover:border-brand/50 focus:border-brand focus:ring-4 focus:ring-brand/10";

    const labelClass =
        "mb-2 block text-sm font-semibold text-foreground";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="flex max-h-[90dvh] w-[95vw] max-w-3xl! flex-col gap-0 overflow-hidden rounded-2xl border-border p-0"
            >

                {/* Header */}
                <DialogHeader className="border-b border-border bg-muted/30 px-5 py-5 text-left sm:px-7">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Edit3 className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                            <DialogTitle className="text-lg font-bold sm:text-xl">
                                Edit Equipment
                            </DialogTitle>
                            <DialogDescription className="mt-1 text-xs sm:text-sm">
                                Update equipment information and details.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex min-h-0 flex-1 flex-col overflow-hidden"
                >
                    <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-7">

                        {/* Basic Information */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-primary" />
                                <h3 className="text-sm font-bold">
                                    Basic Information
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className={labelClass}>
                                        Equipment Name *
                                    </label>
                                    <input
                                        required
                                        name="equipmentName"
                                        value={formData.equipmentName}
                                        onChange={handleChange}
                                        placeholder="Enter equipment name"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Category *
                                    </label>
                                    <select
                                        required
                                        name="categoryName"
                                        value={formData.categoryName}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="">Select Category</option>
                                        {
                                            categoriesList.map((category) => (
                                                <option key={category._id} value={category.name}>
                                                    {category.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Condition *
                                    </label>
                                    <select
                                        required
                                        name="condition"
                                        value={formData.condition}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="">Select condition</option>
                                        <option value="Brand New">Brand New</option>
                                        <option value="Like New">Like New</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Used">Used</option>
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>Brand</label>
                                    <input
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        placeholder="Enter brand"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Model</label>
                                    <input
                                        name="model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        placeholder="Enter model"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </section>

                        <div className="border-t border-border" />

                        {/* Rental Information */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-primary" />
                                <h3 className="text-sm font-bold">
                                    Rental Information
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>
                                        Rental Price (৳) *
                                    </label>
                                    <input
                                        required
                                        min="0"
                                        type="number"
                                        name="rentalPrice"
                                        value={formData.rentalPrice}
                                        onChange={handleChange}
                                        placeholder="Enter rental price"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Rental Type *
                                    </label>
                                    <select
                                        required
                                        name="rentalType"
                                        value={formData.rentalType}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="hourly">Hourly</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Quantity *
                                    </label>
                                    <input
                                        required
                                        min="1"
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        <MapPin className="mr-1 inline h-3.5 w-3.5" />
                                        Location *
                                    </label>
                                    <input
                                        required
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Enter location"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </section>

                        <div className="border-t border-border" />

                        {/* Description & Terms */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-primary" />
                                <h3 className="text-sm font-bold">
                                    Additional Details
                                </h3>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Description *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the equipment..."
                                    className="w-full resize-none rounded-xl border border-input bg-background p-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Rental Terms
                                </label>
                                <textarea
                                    rows={3}
                                    name="terms"
                                    value={formData.terms}
                                    onChange={handleChange}
                                    placeholder="Enter rental terms and conditions..."
                                    className="w-full resize-none rounded-xl border border-input bg-background p-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                                />
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="p-4">
                        <DialogFooter className="flex flex-col-reverse gap-2 border-t border-border bg-muted/20 sm:flex-row sm:justify-end sm:px-7">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={loading}
                                onClick={() => onOpenChange(false)}
                                className="h-11 rounded-xl cursor-pointer"
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={loading || !equipment}
                                className="h-11 gap-2 rounded-xl px-6 cursor-pointer"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Edit3 className="h-4 w-4" />
                                        Update Equipment
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </div>

                </form>
            </DialogContent>
        </Dialog>
    );
}

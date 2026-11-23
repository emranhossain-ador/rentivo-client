"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { ValidationErrors } from "@/components/ValidationError";
import { getCategories } from "@/lib/api/categoris";
import { CategoryType } from "@/lib/type/categoryType";
import { equipmentCondition } from "@/data/equipmentCondition";
import { useSession } from "@/lib/auth-client";
import { EquipmentType } from "@/lib/type/equipmentType";
import { EquipmentFormErrors, validateEquipment } from "@/lib/validations/equipmentValidation";
import { CheckCircle2, FileText, ImagePlus, Info, Loader2, LucideIcon, MapPin, Package, Settings2, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";

import {
    addEquipment,
    updateEquipment,
} from "@/lib/actions/equipment";

import {
    type ChangeEvent,
    type DragEvent,
} from "react";
import { toast } from "react-toastify";

// Image object type
export interface EquipmentImage {
    id: string;
    file?: File;
    preview: string;
    url: string;
}

// ImgBB API response type
type SectionCardType = {
    icon: LucideIcon;
    title: string;
    description: string;
    children: ReactNode;
};

function SectionCard({ icon: Icon, title, description, children }: SectionCardType) {
    return (
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-start gap-3 border-b border-border p-5 sm:p-6">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon size={21} />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-bold text-foreground sm:text-lg">
                            {title}
                        </h2>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        {description}
                    </p>
                </div>
            </div>
            <div className="p-5 sm:p-6">{children}</div>
        </section>
    );
}


interface EquipmentFormProps {
    equipment?: EquipmentType;
}


const AddEquipmentForm = ({ equipment }: EquipmentFormProps) => {

    const router = useRouter();
    const isEdit = Boolean(equipment?._id);


    const [error, setError] = useState<EquipmentFormErrors>({});

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [images, setImages] = useState<EquipmentImage[]>(() =>
        (equipment?.images ?? []).map((url, index) => ({
            id: `existing-${index}`,
            preview: url,
            url,
        }))
    );

    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [categoriesList, setCategoriesList] = useState<CategoryType[]>([]);
    const [selectedCategoryName, setSelectedCategoryName] = useState<string>(
        equipment?.categoryName ?? ""
    );

    useEffect(() => {
        let isMounted = true;
        const fetchCats = async () => {
            const data = await getCategories();
            if (isMounted) {
                setCategoriesList(data || []);
            }
        };
        fetchCats();
        return () => {
            isMounted = false;
        };
    }, []);



    // Upload Images to ImgBB
    const handleImageChange = async (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files;

        if (!files || files.length === 0) return;

        const selectedFiles = Array.from(files);

        // Validate and create previews
        const remainingSlots = 5 - images.length;

        if (remainingSlots <= 0) {
            setUploadError("You can upload a maximum of 5 images.");
            event.target.value = "";
            return;
        }

        const validFiles = selectedFiles.filter((file) => {
            if (!file.type.startsWith("image/")) {
                setUploadError("Please select valid image files.");
                return false;
            }

            if (file.size > 5 * 1024 * 1024) {
                setUploadError("Each image must be smaller than 5MB.");
                return false;
            }

            return true;
        });

        const acceptedFiles = validFiles.slice(0, remainingSlots);

        if (acceptedFiles.length < validFiles.length) {
            setUploadError("You can upload a maximum of 5 images.");
        }

        if (acceptedFiles.length === 0) {
            event.target.value = "";
            return;
        }

        const newImages: EquipmentImage[] = acceptedFiles.map((file) => ({
            id: crypto.randomUUID(),
            file,
            preview: URL.createObjectURL(file),
            url: "",
        }));

        setImages((prev) => [...prev, ...newImages]);

        event.target.value = "";

        setUploading(true);

        try {
            const uploadedImages = await Promise.all(
                newImages.map(async (image) => {
                    const formData = new FormData();
                    if (!image.file) {
                        throw new Error("Image file not found");
                    }

                    formData.append("image", image.file);

                    const imgApi = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

                    const res = await fetch(imgApi, {
                        method: "POST",
                        body: formData,
                    });

                    const result = await res.json();

                    if (!res.ok || !result.success) {
                        throw new Error(`Failed to upload ${image.file.name}`);
                    }

                    return {
                        id: image.id,
                        url: result.data.url,
                    };
                })
            );

            setImages((prev) =>
                prev.map((image) => {
                    const uploaded = uploadedImages.find(
                        (item) => item.id === image.id
                    );

                    return uploaded ? { ...image, url: uploaded.url } : image;
                })
            );

            toast.success("Images uploaded successfully!");
        } catch (err) {
            console.error(err);

            setUploadError(
                err instanceof Error ? err.message : "Image upload failed!"
            );

            toast.error("Failed to upload images!");
        } finally {
            setUploading(false);
        }
    };


    // Drag Over
    const handleDragOver = (
        event: DragEvent<HTMLDivElement>
    ): void => {
        event.preventDefault();
    };


    // Drop Files
    const handleDrop = (
        event: DragEvent<HTMLDivElement>
    ): void => {
        event.preventDefault();

        const files = event.dataTransfer.files;

        if (files.length > 0) {
            handleDroppedFiles(files);
        }
    };


    // Handle Drag & Drop Upload
    const handleDroppedFiles = async (files: FileList) => {
        // Reuse the same upload handler through the input
        if (!fileInputRef.current) return;

        const dataTransfer = new DataTransfer();

        Array.from(files).forEach((file) => {
            dataTransfer.items.add(file);
        });

        fileInputRef.current.files = dataTransfer.files;

        await handleImageChange({
            target: fileInputRef.current,
        } as ChangeEvent<HTMLInputElement>);
    };


    // Remove Single Image
    const removeImage = (id: string): void => {
        const image = images.find((item) => item.id === id);

        if (image?.preview) {
            URL.revokeObjectURL(image.preview);
        }

        setImages((prev) => prev.filter((item) => item.id !== id));
    };


    // Remove All Images
    const removeAllImages = (): void => {
        images.forEach((image) => {
            URL.revokeObjectURL(image.preview);
        });

        setImages([]);
        setUploadError("");
    };


    const session = useSession();
    const user = session?.data?.user;

    // Handle submit    

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Validation
        const validationErrors = validateEquipment(formData);

        // Validate selected images from state
        if (images.length === 0) {
            validationErrors.images = "Please upload at least 1 image";
        } else if (images.some((image) => !image.url)) {
            validationErrors.images = "Please wait until all images finish uploading";
        }

        setError(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            toast.error("Please fix the validation errors!");
            return;
        }

        // Check image upload
        if (uploading) {
            toast.error("Please wait until images finish uploading!");
            return;
        }

        const uploadedUrls = images.map((image) => image.url);

        if (uploadedUrls.length === 0 || uploadedUrls.some((url) => !url)) {
            toast.error("Please upload all equipment images!");
            return;
        }

        const chosenCategoryName = String(formData.get("categoryName") || "");
        const matchedCategory = categoriesList.find((c) => c.name === chosenCategoryName);
        const chosenCategorySlug = matchedCategory?.slug || equipment?.categorySlug || "";

        // Convert FormData to JSON
        const data: EquipmentType = {
            ownerId: user?.id as string,
            equipmentName: String(formData.get("equipmentName") || "").trim(),
            description: String(formData.get("description") || "").trim(),
            categoryName: chosenCategoryName,
            categorySlug: chosenCategorySlug,
            location: String(formData.get("location") || "").trim(),
            rentalPrice: Number(formData.get("rentalPrice") || 0),
            rentalType: formData.get("rentalType") as EquipmentType["rentalType"],
            quantity: Number(formData.get("quantity") || 0),
            condition: formData.get("condition") as EquipmentType["condition"],
            brand: String(formData.get("brand") || "").trim(),
            model: String(formData.get("model") || "").trim(),
            images: uploadedUrls,
            terms: String(formData.get("terms") || "").trim(),
        };

        try {
            setUploading(true);

            const result = isEdit
                ? await updateEquipment(equipment!._id!, data)
                : await addEquipment(data);


            if (result?.success === true) {

                if (isEdit) {
                    toast.success("Equipment updated successfully!");
                } else {
                    toast.success("Equipment added successfully!");
                }


                if (!isEdit) {
                    form.reset();
                    setError({});
                    setImages([]);
                    setUploadError("");
                }


                router.push("/dashboard/owner/equipments");


            } else {
                toast.error(result.message || "Failed to add equipment!");
            }
        } catch (err) {
            console.error(err);

            toast.error(
                err instanceof Error ? err.message : "Something went wrong!"
            );
        } finally {
            setUploading(false);
        }
    };





    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            {/* 1. Basic Information */}
            <SectionCard
                icon={Package}
                title="Basic Information"
                description="Enter the basic information about your equipment."
            >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-1">
                        <Label htmlFor="equipmentName" title="Equipment Name" isRequired={true} />
                        <Input
                            name="equipmentName"
                            value={equipment?.equipmentName ?? ""}
                            placeholder="e.g. Excavator Machine"
                        />
                        {error.equipmentName && <ValidationErrors msg={error.equipmentName} />}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="categoryName" title="Category" isRequired={true} />
                        <select
                            name="categoryName"
                            value={selectedCategoryName}
                            onChange={(e) => setSelectedCategoryName(e.target.value)}
                            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground/80 hover:border-brand/50 focus:border-brand focus:ring-4 focus:ring-brand/10"
                        >
                            <option value="" disabled>Select category</option>
                            {
                                categoriesList.map((category) => (
                                    <option key={category._id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                        {error.categoryName && <ValidationErrors msg={error.categoryName} />}
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                        <Label htmlFor="description" title="Description" isRequired={true} />
                        <textarea
                            rows={5}
                            name="description"
                            defaultValue={equipment?.description ?? ""}
                            placeholder="Write a detailed description of your equipment..."
                            className={`w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/80 hover:border-brand/50 focus:border-brand focus:ring-4 focus:ring-brand/10 resize-y`}
                        />
                        {error.description && <ValidationErrors msg={error.description} />}
                    </div>
                </div>
            </SectionCard>

            {/* 2. Location and Pricing */}
            <SectionCard
                icon={MapPin}
                title="Location & Rental Pricing"
                description="Set your equipment location, rental price and availability."
            >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-1">
                        <Label htmlFor="location" title="Location" isRequired={true} />
                        <Input name="location" value={equipment?.location ?? ""} placeholder="e.g. Dhaka, Bangladesh" />
                        {error.location && <ValidationErrors msg={error.location} />}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="rentalPrice" title="Rental Price (৳)" isRequired={true} />
                        <Input name="rentalPrice" value={equipment?.rentalPrice ?? ""} placeholder="0.00" />
                        {error.rentalPrice && <ValidationErrors msg={error.rentalPrice} />}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="rentalType" title="Rental Type" isRequired={true} />
                        <select name="rentalType"
                            defaultValue={equipment?.rentalType ?? ""}
                            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground/80 hover:border-brand/50 focus:border-brand focus:ring-4 focus:ring-brand/10">
                            <option disabled>Select</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                        {error.rentalType && <ValidationErrors msg={error.rentalType} />}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="quantity" title="Available Quantity" isRequired={true} />
                        <Input min="1" name="quantity" value={equipment?.quantity ?? ""} placeholder="Available units" />
                        {error.quantity && <ValidationErrors msg={error.quantity} />}
                    </div>
                </div>
            </SectionCard>

            {/* 3. Equipment Specifications */}
            <SectionCard
                icon={Settings2}
                title="Equipment Details"
                description="Provide equipment specifications and condition."
            >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-1">
                        <Label htmlFor="condition" title="Equipment Condition" isRequired={true} />
                        <select
                            name="condition"
                            defaultValue={equipment?.condition ?? ""}
                            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground/80 hover:border-brand/50 focus:border-brand focus:ring-4 focus:ring-brand/10">
                            {
                                equipmentCondition.map((condition, i) =>
                                    <option key={i} value={condition}>{condition}</option>
                                )
                            }
                        </select>
                        {error.condition && <ValidationErrors msg={error.condition} />}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="brand" title="Brand" isRequired={true} />
                        <Input name="brand" value={equipment?.brand ?? ""} placeholder="e.g. Caterpillar" />
                        {error.brand && <ValidationErrors msg={error.brand} />}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="model" title="Model" isRequired={true} />
                        <Input name="model" value={equipment?.model ?? ""} placeholder="e.g. CAT 320D" />
                        {error.model && <ValidationErrors msg={error.model} />}
                    </div>
                </div>
            </SectionCard>

            {/* 4. Equipment Images */}
            <SectionCard
                icon={ImagePlus}
                title="Equipment Images"
                description="Upload clear photos of your equipment. Maximum 5 images, 5MB each."
            >
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-brand/3 px-5 py-10 text-center transition hover:border-primary hover:bg-brand/6"
                >
                    <div className="mb-3 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Upload size={26} />
                    </div>

                    <h3 className="text-sm font-bold text-foreground">
                        Click to upload or drag and drop
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                        PNG, JPG, JPEG or WEBP (Maximum 5MB each)
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white">
                        <ImagePlus size={16} />
                        Browse Images
                    </span>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>

                {/* Image Preview */}
                {images.length > 0 && (
                    <div className="mt-5">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-foreground">
                                Selected Images ({images.length}/5)
                            </h3>

                            <button
                                type="button"
                                onClick={removeAllImages}
                                className="text-xs font-semibold text-destructive hover:underline"
                            >
                                Remove all
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                            {images.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted"
                                >
                                    <Image
                                        src={image.preview}
                                        alt={`Equipment ${index + 1}`}
                                        width={100}
                                        height={100}
                                        className="h-full w-full object-cover"
                                    />

                                    {index === 0 && (
                                        <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-[10px] font-semibold text-white">
                                            Main Image
                                        </span>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => removeImage(image.id)}
                                        className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-white text-rose-600 shadow transition hover:bg-rose-50"
                                        aria-label="Remove image"
                                    >
                                        <X size={15} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Upload Error */}
                {uploadError && (
                    <p className="mt-3 flex items-center gap-2 text-sm text-destructive">
                        <Info size={16} />
                        {uploadError}
                    </p>
                )}

                {error.images && <ValidationErrors msg={error.images} />}
            </SectionCard>

            {/* 5. Terms */}
            <SectionCard
                icon={FileText}
                title="Rental Terms & Conditions"
                description="Explain your rental rules, policies and responsibilities."
            >
                <div className="space-y-1">
                    <Label htmlFor="terms" title="Terms and Conditions" isRequired={true} />
                    <textarea
                        rows={5}
                        name="terms"
                        defaultValue={equipment?.terms ?? ""}
                        placeholder={"Example:\n• Equipment must be returned on time.\n• Renters are responsible for any damage.\n• Late returns may have additional charges."}
                        className={`w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/80 hover:border-brand/50 focus:border-brand focus:ring-4 focus:ring-brand/10 resize-y`}
                    />
                    {error.terms && <ValidationErrors msg={error.terms} />}
                </div>
            </SectionCard>

            <div className="flex flex-col-reverse gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <p className="text-xs text-muted-foreground">
                    <span className="text-destructive">*</span> Required fields
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        disabled={uploading}
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-6 text-sm font-semibold text-foreground transition hover:bg-muted disabled:opacity-50"
                    >
                        <Trash2 size={17} /> Reset Form
                    </button>

                    <Button
                        type="submit"
                        disabled={uploading}
                        className="inline-flex h-12 items-center justify-center gap-2 border border-brand cursor-pointer rounded-xl bg-brand px-7 text-sm font-bold text-white shadow-md shadow-brand/20 transition-all hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {uploading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 size={18} />
                                {
                                    isEdit ?
                                        'Update Equipment'
                                        :
                                        'Add Equipment'
                                }

                            </>
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default AddEquipmentForm;
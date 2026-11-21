
export type EquipmentFormErrors = Partial<
    Record<
        | "equipmentName"
        | "description"
        | "categoryName"
        | "location"
        | "rentalPrice"
        | "rentalType"
        | "quantity"
        | "condition"
        | "brand"
        | "model"
        | "images"
        | "terms",
        string
    >
>;

export const validateEquipment = (
    formData: FormData
): EquipmentFormErrors => {
    const errors: EquipmentFormErrors = {};

    const getValue = (name: string) => formData.get(name)?.toString().trim() || "";

    // Equipment Name
    if (!getValue("equipmentName")) {
        errors.equipmentName = "Equipment name is required";
    }

    // Description
    if (!getValue("description")) {
        errors.description = "Description is required";
    }

    // Category
    if (!getValue("categoryName")) {
        errors.categoryName = "Please select a category";
    }

    // Location
    if (!getValue("location")) {
        errors.location = "Location is required";
    }

    // Rental Price
    const price = Number(getValue("rentalPrice"));

    if (!getValue("rentalPrice") || !Number.isFinite(price) || price <= 0) {
        errors.rentalPrice = "Enter a valid rental price";
    }

    // Quantity
    const quantity = Number(getValue("quantity"));

    if (
        !getValue("quantity") ||
        !Number.isInteger(quantity) ||
        quantity < 1
    ) {
        errors.quantity = "Quantity must be at least 1";
    }

    // Condition
    if (!getValue("condition")) {
        errors.condition = "Please select equipment condition";
    }

    // Rental type
    if (!getValue("rentalType")) {
        errors.rentalType = "Please select rental type";
    }

    // Brand
    if (!getValue("brand")) {
        errors.brand = "Brand is required";
    }

    // Model
    if (!getValue("model")) {
        errors.model = "Model is required";
    }


    // Terms
    if (!getValue("terms")) {
        errors.terms = "Rental terms are required";
    }

    return errors;
};

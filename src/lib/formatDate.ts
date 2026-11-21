import { format, isValid } from "date-fns";

export const formatDate = (date: string | Date) => {
    const parsedDate = new Date(date);

    return isValid(parsedDate)
        ? format(parsedDate, "dd MMM yyyy")
        : "N/A";
};
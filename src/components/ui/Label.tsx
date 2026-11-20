type LabelProps = {
    htmlFor?: string;
    className?: string;
    title: string;
    isRequired?: boolean;
}


const Label = ({ htmlFor, title, className, isRequired = false }: LabelProps) => {
    return (
        <label htmlFor={htmlFor} className={`${className} block text-sm font-semibold text-foreground`}>
            {title} {isRequired && <span className="text-red-500">*</span>}
        </label>
    )
}

export default Label;
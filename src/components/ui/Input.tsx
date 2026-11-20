type InputType = {
    type?: string;
    name: string;
    value?: string;
    className?: string;
    placeholder?: string;
    min?: string;
}

export const Input = ({ type = 'text', name, placeholder, className, value, min }: InputType) => {
    return (
        <input
            type={type}
            name={name}
            min={min}
            placeholder={placeholder}
            defaultValue={value}
            className={`h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground/80 hover:border-brand/50 focus:border-brand focus:ring-4 focus:ring-brand/10 ${className}`}
        />
    )
}
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Control, ControllerRenderProps } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { FormFieldTypes } from "@/lib/utils";

interface IFormField {
    control: Control<any>;
    fieldType: FormFieldTypes;
    name: string;
    defaultValue?: string | number;
    label?: string;
    placeholder?: string;
    description?: string;
    disabled?: boolean;
    children?: React.ReactNode;
}

function RenderField({
    field,
    props,
}: {
    field: ControllerRenderProps<any, string>;
    props: IFormField;
}) {
    const { fieldType, placeholder, defaultValue } = props;

    switch (fieldType) {
        case FormFieldTypes.input:
            return (
                <FormControl>
                    <Input
                        {...field}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        className="h-11 rounded-md border bg-white shadow-md placeholder:border-zinc-400 placeholder:text-zinc-500"
                    />
                </FormControl>
            );

        case FormFieldTypes.select:
            return (
                <FormControl>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger className="h-11 bg-white shadow-md focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                                <SelectValue
                                    placeholder={placeholder}
                                    className="placeholder:text-muted-foreground"
                                />
                            </SelectTrigger>
                        </FormControl>

                        <SelectContent>{props.children}</SelectContent>
                    </Select>
                </FormControl>
            );
        default:
            break;
    }
}

export default function CustomFormField(props: IFormField) {
    const { control, name, label, description } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {label && (
                        <FormLabel className="text-primary text-nowrap">
                            {label}
                        </FormLabel>
                    )}
                    <RenderField key={name} field={field} props={props} />

                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}

                    <FormMessage className="text-red-400" />
                </FormItem>
            )}
        />
    );
}

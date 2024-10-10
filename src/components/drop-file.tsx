import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { useController } from "react-hook-form";
import { Button } from "./ui/button";
import { twMerge } from "tailwind-merge";

export default function DropFile({
    fuelType,
    control,
    name,
}: {
    fuelType: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any;
    name: string;
}) {
    const { field, fieldState } = useController({
        name,
        control,
        defaultValue: null,
    });

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newFile = {
                fuelType,
                file: acceptedFiles[0],
            };
            field.onChange(newFile);
        },
        [field, fuelType]
    );

    const { getRootProps, getInputProps, isDragActive, isDragReject } =
        useDropzone({
            onDrop,
            accept: {
                "text/csv": [".csv"],
            },
            multiple: false,
        });

    return (
        <article className="text-center w-fit space-y-2">
            <p className="font-medium">{fuelType}</p>

            <div
                {...getRootProps()}
                className={twMerge(
                    "p-6 border border-dashed w-fit rounded-xl space-y-4",
                    isDragActive ? "border-blue-500" : "border-gray-300",
                    isDragReject && "border-red-500"
                )}
            >
                <input {...getInputProps()} />
                {isDragReject ? (
                    <p className="text-red-500">Arquivo não suportado.</p>
                ) : (
                    <p>
                        {isDragActive ? (
                            <span>Solte seu arquivo aqui...</span>
                        ) : (
                            <>
                                Solte seu arquivo <strong>.csv</strong> <br />{" "}
                                ou clique para selecionar
                            </>
                        )}
                    </p>
                )}

                <Button variant={"outline"}>Selecionar Arquivos</Button>
            </div>

            {field.value && (
                <div className="mt-2 space-y-1">
                    <p className="text-gray-700">{field.value.file.name}</p>
                </div>
            )}

            {/* Exibe os erros de validação */}
            {fieldState.error && (
                <p className="text-red-500">{fieldState.error.message}</p>
            )}
        </article>
    );
}

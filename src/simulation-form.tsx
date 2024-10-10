import CustomFormField from "./components/custom-form-field";
import { Button } from "./components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldTypes } from "./lib/utils";
import { Form } from "./components/ui/form";
import { ISimulationSchema, SimulationSChema } from "./lib/simulation-schema";
import { Separator } from "./components/ui/separator";
import DropFile from "./components/drop-file";

export default function SimulationForm() {
    const form = useForm({
        resolver: zodResolver(SimulationSChema),
        defaultValues: {
            name: "",
            description: "",
            // date: format(new Date(), "dd-MM-yyyy HH:mm"),
            date: new Date(),
            region: "",
            vehicles: { name: "", additional: "" },
            files: [],
        },
    });

    async function onSubmit(data: ISimulationSchema) {
        console.log(data);
    }

    const fuelTypes = [
        "Diesel",
        "Elétrico",
        "Híbrido Diesel",
        "Híbrido Etanol",
        "Hidrogênio",
    ];

    return (
        <main className="mx-auto max-w-6xl">
            <h1>Nova Simulação</h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <CustomFormField
                        fieldType={FormFieldTypes.input}
                        control={form.control}
                        name="name"
                        label="Nome :"
                        placeholder="Insira o nome da simulação"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <CustomFormField
                            fieldType={FormFieldTypes.input}
                            control={form.control}
                            name="vehicles"
                            label="Veículos :"
                            placeholder="Insira os Veículos"
                        />

                        <CustomFormField
                            fieldType={FormFieldTypes.input}
                            control={form.control}
                            name="date"
                            label="Data :"
                        />

                        <CustomFormField
                            fieldType={FormFieldTypes.input}
                            control={form.control}
                            name="description"
                            label="Descrição :"
                            placeholder="Insira a Descrição"
                        />

                        <CustomFormField
                            fieldType={FormFieldTypes.input}
                            control={form.control}
                            name="region"
                            label="Região :"
                        />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-center font-bold text-2xl">
                            Informações Adicionais
                        </h2>

                        <Separator className="w-[80%] mx-auto" />
                    </div>

                    <div className="flex gap-6 flex-wrap justify-center">
                        {fuelTypes.map((fuelType, i) => (
                            <DropFile
                                fuelType={fuelType}
                                key={i}
                                control={form.control}
                                name={`files.${i}`}
                            />
                        ))}
                    </div>

                    <footer className="flex justify-center gap-4">
                        <Button variant={"secondary"}>Voltar</Button>

                        <Button variant={"destructive"}>Cancelar</Button>

                        <Button variant={"default"}>Criar</Button>
                    </footer>
                </form>
            </Form>
        </main>
    );
}

import { z } from "zod";

export const SimulationSChema = z.object({
    name: z.string().min(1, "Nome deve ser maior que um carácter"),
    description: z.string().min(1, "Descrição deve ser maior que um carácter"),
    date: z.date(),
    region: z.string().min(1, "Selecione uma Região valida"),
    vehicles: z.object({
        name: z.string(),
        additional: z.string(),
    }),
    files: z.array(
        z.object({
            fuelType: z.string(),
            file: z.any(),
        })
    ),
});

export type ISimulationSchema = z.infer<typeof SimulationSChema>;

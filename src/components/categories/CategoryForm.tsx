import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/app/dashboard/categories/page";

const formSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    image: z.string().url("URL inválida"),
    description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
});

interface CategoryFormProps {
    onSave: (category: Omit<Category, "id">) => void;
    onCancel: () => void;
}

const CategoryForm = ({ onSave, onCancel }: CategoryFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            image: "",
            description: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onSave(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome da Categoria</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite o nome da categoria" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL da Imagem</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="https://exemplo.com/imagem.jpg"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Descreva a categoria"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="submit">Salvar</Button>
                </div>
            </form>
        </Form>
    );
};

export default CategoryForm;
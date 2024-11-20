import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params: { id } }: { params: { id: string; }; }) {
    try {
        const category = await prisma.eventCategory.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (category) {
            return NextResponse.json(category, { status: 200 });
        } else {
            return NextResponse.json({ error: "Categoria não encontrada." }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar categoria.", errorDescription: error }, { status: 500 });
    }
}

export async function PUT(request: Request, { params: { id } }: { params: { id: string; }; }) {
    try {
        const { name } = await request.json();

        const category = await prisma.eventCategory.update({
            where: { id: parseInt(id) },
            data: {
                name,
            },
        });

        NextResponse.json(category, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: "Erro ao atualizar a categoria.", errorDescription: error }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params: { id } }: { params: { id: string; }; }) {
    try {
        await prisma.eventCategory.delete({
            where: { id: parseInt(id) },
        });


        NextResponse.json({ success: true }, { status: 204 });
    } catch (error) {
        NextResponse.json({ success: false, error: "Erro ao excluir a categoria.", errorDescription: error }, { status: 500 });
    }
}

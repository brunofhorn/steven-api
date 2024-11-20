import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params: { id } }: { params: { id: string; }; }) {
    try {
        const city = isNaN(Number(id))
            ? await prisma.city.findFirst({
                where: {
                    name: {
                        contains: String(id),
                        mode: 'insensitive',
                    },
                },
            })
            : await prisma.city.findUnique({
                where: {
                    id: Number(id),
                },
            });

        if (city) {
            return NextResponse.json(city, { status: 200 });
        } else {
            return NextResponse.json({ error: "Cidade não encontrada." }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar cidade.", errorDescription: error }, { status: 500 });
    }
}

export async function PUT(request: Request, { params: { id } }: { params: { id: string; }; }) {
    try {
        const { name, state, country } = await request.json();
        const city = await prisma.city.update({
            where: { id: parseInt(id) },
            data: {
                name,
                state,
                country,
            },
        });

        NextResponse.json(city, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: "Erro ao atualizar a cidade.", errorDescription: error }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params: { id } }: { params: { id: string; }; }) {
    try {
        await prisma.city.delete({
            where: { id: parseInt(id) },
        });


        NextResponse.json({ success: true }, { status: 204 });
    } catch (error) {
        NextResponse.json({ success: false, error: "Erro ao excluir a cidade.", errorDescription: error }, { status: 500 });
    }
}

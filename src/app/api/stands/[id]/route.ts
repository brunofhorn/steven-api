import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params: { id } }: { params: { id: string; }; }) {
    try {
        const stand = await prisma.eventStand.findUnique({
            where: { id: parseInt(id) }
        });

        NextResponse.json(stand, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: "Erro ao buscar um estande.", erroDescription: error }, { status: 500 });
    }
}

export async function PUT(request: Request, { params: { id } }: { params: { id: string; }; }) {
    try {
        const { name, description, contact } = await request.json();

        const stand = await prisma.eventStand.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                contact
            },
        });

        NextResponse.json(stand, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: "Erro ao atualizar o estande.", errorDescription: error }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params: { id } }: { params: { id: string; }; }) {
    try {
        await prisma.eventStand.delete({
            where: { id: parseInt(id) },
        });

        NextResponse.json({ success: true }, { status: 204 });
    } catch (error) {
        NextResponse.json({ success: false, error: "Erro ao excluir o estande.", errorDescription: error }, { status: 500 });
    }
}

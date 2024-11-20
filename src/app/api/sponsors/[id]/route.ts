import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params: { id } }: { params: { id: string; }; }) {
    try {
        const sponsor = await prisma.eventSponsor.findUnique({
            where: { id: parseInt(id) }
        });

        NextResponse.json(sponsor, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: "Erro ao buscar um patrocinador.", erroDescription: error }, { status: 500 });
    }
}

export async function PUT(request: Request, { params: { id } }: { params: { id: string; }; }) {
    try {
        const { name, logoUrl, contact } = await request.json();

        const sponsor = await prisma.eventSponsor.update({
            where: { id: parseInt(id) },
            data: {
                name,
                logoUrl,
                contact
            },
        });

        NextResponse.json(sponsor, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: "Erro ao atualizar o patrocinador.", errorDescription: error }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params: { id } }: { params: { id: string; }; }) {
    try {
        await prisma.eventSponsor.delete({
            where: { id: parseInt(id) },
        });

        NextResponse.json({ success: true }, { status: 204 });
    } catch (error) {
        NextResponse.json({ success: false, error: "Erro ao excluir o patrocinador.", errorDescription: error }, { status: 500 });
    }
}

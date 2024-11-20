import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const sponsors = await prisma.eventSponsor.findMany();

        return NextResponse.json(sponsors, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar os patrocinadores.", errorDescription: error }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, logoUrl, contact } = await request.json();

        const sponsor = await prisma.eventSponsor.create({
            data: {
                name,
                logoUrl,
                contact,
            },
        });

        return NextResponse.json(sponsor, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao criar um patrocinador.", errorDescription: error }, { status: 500 });
    }
}

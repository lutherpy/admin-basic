import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const assets = await prisma.asset.findMany();
        return NextResponse.json({ success: true, data: assets });
    } catch (error) {
        return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Erro desconhecido" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { nome, price, autor, autorId } = await req.json();

        if (!nome || !price || !autor || !autorId) {
            return NextResponse.json({ success: false, error: "Todos os campos são obrigatórios" }, { status: 400 });
        }

        const newAsset = await prisma.asset.create({
            data: { nome, price: parseFloat(price), autor, autorId }
        });

        return NextResponse.json({ success: true, data: newAsset });
    } catch (error) {
        return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Erro desconhecido" }, { status: 500 });
    }
}

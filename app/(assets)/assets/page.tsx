"use client";

import { useEffect, useState } from "react";
import { toast, useToast } from "@/hooks/use-toast"

import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Asset = {
  id: string;
  nome: string;
  price: number;
  autor: string;
};

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch("/api/assets");

        if (!response.ok) {
          throw new Error(`Erro ao buscar ativos: ${response.statusText}`);
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || "Erro desconhecido");
        }

        setAssets(result.data);
      } catch (error) {
        toast({
          title: "Erro!",
          description: error instanceof Error ? error.message : "Erro ao carregar os ativos.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  return (
    <div className="flex flex-col   space-y-4">
      {/* Botão para adicionar ativo */}
      <Link href="/add-asset">
        <Button size="sm" className="w-auto">Add New Asset</Button>
      </Link>

      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle>Lista de Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-40 w-full" />
          ) : assets && assets.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Autor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell>{asset.nome}</TableCell>
                    <TableCell>R{asset.price.toFixed(2)}</TableCell>
                    <TableCell>{asset.autor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-gray-500">Nenhum ativo encontrado.</p>
          )}
        </CardContent>
      </Card>

      {/* Toaster do shadcn para exibir notificações */}
      <Toaster />
    </div>
  );
}

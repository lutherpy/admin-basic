"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; // Importar o useRouter

type AssetFormData = {
  nome: string;
  price: number;
};

export default function AddAssetPage() {
  const { register, handleSubmit, reset } = useForm<AssetFormData>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter(); // Inicializar o useRouter

  const onSubmit = async (data: AssetFormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: data.nome,
          price: parseFloat(data.price.toString()),
          autor: "admin",
          autorId: "1",
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: "Sucesso!",
          description: "Ativo adicionado com sucesso!",
          variant: "default",
        });
        reset(); // Limpa o formulário após o envio bem-sucedido
        router.push("/assets"); // Redireciona para a página de ativos
      } else {
        toast({
          title: "Erro!",
          description: result.error || "Falha ao adicionar o ativo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Erro ao conectar ao servidor.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle>Adicionar Asset</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome do Asset</Label>
              <Input id="nome" {...register("nome", { required: true })} placeholder="Nome do asset" />
            </div>

            <div>
              <Label htmlFor="price">Preço</Label>
              <Input id="price" type="number" step="0.01" {...register("price", { required: true })} placeholder="Preço" />
            </div>

            <Button type="submit" className="" disabled={loading}>
              {loading ? "Adicionando..." : "Adicionar Asset"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Toaster do shadcn para exibir notificações */}
      <Toaster />
    </div>
  );
}

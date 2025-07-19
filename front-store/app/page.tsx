"use client";

import { useState, useRef, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCode, CheckCircle, Clock, User, UtensilsCrossed, ShoppingBag } from 'lucide-react';

interface Product {
  nome: string;
  preco: number;
  quantidade: number;
}

interface Order {
  id: string;
  customer: string;
  produtos: Product[];
  total: number;
  timestamp: string;
}

export default function FoodStandPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

 useEffect(() => {
  if (isScanning) {
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    };

    scannerRef.current = new Html5QrcodeScanner("qr-reader", config, false);

    scannerRef.current.render(
      async (decodedText: string) => {
        try {
          const response = await fetch(`http://localhost:3000/api/pedidos/${decodedText}`);
          if (!response.ok) throw new Error('Erro ao buscar pedido');

          const data = await response.json();

          const produtos: Product[] = data.produtos;
          const total = produtos.reduce((sum, produto) => sum + (produto.preco * produto.quantidade), 0);

          const order: Order = {
            id: data.id || decodedText.slice(-6),
            customer: data.customer || `Cliente #${Math.floor(Math.random() * 1000)}`,
            produtos,
            total,
            timestamp: new Date().toLocaleTimeString('pt-BR'),
          };

          setCurrentOrder(order);
          setIsScanning(false);
          scannerRef.current?.clear();
        } catch (error) {
          console.error('Erro ao buscar pedido:', error);
        }
      },
      (error: string) => {
        // Silencia erros
      }
    );
  }

  return () => {
    scannerRef.current?.clear();
  };
}, [isScanning]);

  const startScanning = () => {
    setIsScanning(true);
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (scannerRef.current) {
      scannerRef.current.clear();
    }
  };

  const completeOrder = () => {
    if (currentOrder) {
      //setCompletedOrder(currentOrder);
      setCurrentOrder(null);
      setTotalOrders(prev => prev + 1);
    }
  };

  const cancelOrder = () => {
    setCurrentOrder(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-4 border-purple-500 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-purple-600 p-2 rounded-full">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Sabor & Festa</h1>
                <p className="text-xs text-gray-600">Barraca de Lanches</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Pedidos</p>
              <p className="text-xl font-bold text-purple-600">{totalOrders}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Current Order Display */}
        {currentOrder && (
          <Card className="bg-purple-50 border-2 border-purple-200 shadow-lg mx-auto max-w-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-purple-800 flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5" />
                <span>Pedido Escaneado</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Pedido #{currentOrder.id}</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                  Aguardando
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{currentOrder.customer}</span>
              </div>
              
              <div className="space-y-3">
                <p className="font-semibold text-sm text-gray-700">Produtos:</p>
                <div className="space-y-2">
                  {currentOrder.produtos.map((produto, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg border">
                      <div>
                        <p className="font-medium text-gray-800">{produto.nome}</p>
                        <p className="text-sm text-gray-600">Qtd: {produto.quantidade}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">R$ {produto.preco.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">
                          Total: R$ {(produto.preco * produto.quantidade).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-base text-gray-900">Total Pago:</span>
                  <span className="font-bold text-xl text-purple-600">
                    R$ {currentOrder.total.toFixed(2)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button
                    onClick={completeOrder}
                    size="lg"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Completar Pedido
                  </Button>
                  <Button
                    onClick={cancelOrder}
                    variant="outline"
                    size="default"
                    className="w-full border-2 border-gray-300 hover:border-gray-400"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Scanner Section */}
        {!currentOrder && (
          <Card className="bg-white shadow-lg border-0 mx-auto max-w-md">
            <CardHeader className="text-center pb-3">
              <CardTitle className="text-xl font-bold text-purple-800 flex items-center justify-center space-x-2">
                <QrCode className="h-5 w-5 text-purple-600" />
                <span>Scanner de Pedidos</span>
              </CardTitle>
              <p className="text-sm text-gray-600">
                Escaneie o QRCode do cliente para processar o pedido
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isScanning ? (
                <div className="text-center space-y-3">
                  <div className="bg-purple-100 p-6 rounded-2xl">
                    <QrCode className="h-16 w-16 text-purple-600 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-4">
                      Pronto para escanear o próximo pedido
                    </p>
                    <Button
                      onClick={startScanning}
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full"
                    >
                      Iniciar Scanner
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div id="qr-reader" className="rounded-lg overflow-hidden"></div>
                  <Button
                    onClick={stopScanning}
                    variant="outline"
                    size="default"
                    className="w-full border-2 border-gray-300 hover:border-gray-400"
                  >
                    Cancelar Scanner
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Completed Order */}
        {completedOrder && !currentOrder && (
              <Card className="bg-blue-50 border-2 border-blue-200 shadow-lg mx-auto max-w-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-bold text-blue-800 flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Último Pedido Concluído</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Pedido #{completedOrder.id}</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                      Entregue
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{completedOrder.customer}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{completedOrder.timestamp}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-base text-gray-900">Total:</span>
                      <span className="font-bold text-xl text-blue-600">
                        R$ {completedOrder.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
        )}

        {/* Instructions */}
        {!currentOrder && (
            <Card className="bg-gray-50 border-2 border-gray-200 mx-auto max-w-md">
              <CardHeader>
                <CardTitle className="text-base font-bold text-purple-800">
                  Como Usar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p>1. Clique em "Iniciar Scanner"</p>
                <p>2. Aponte a câmera para o QRCode do cliente</p>
                <p>3. Confira os produtos do pedido</p>
                <p>4. Clique em "Completar Pedido" após entregar</p>
              </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
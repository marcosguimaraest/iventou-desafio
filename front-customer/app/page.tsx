"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QRCodeSVG } from "qrcode.react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  Clock,
  Plus,
  ShoppingCart,
  Minus,
  Trash2,
  X,
  CreditCard,
  MapPin,
  User,
  Phone,
  QrCode,
} from "lucide-react"
import axios from "axios"

interface Shopper {
  id: string
  name: string
  email: string
}

interface OrderItem {
  quantity: number
  priceInCents: number
  productId: string
}

interface Order {
  totalInCents: number
  orderItems: OrderItem[]
  userId: string
}

interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  shoppers: Shopper[]
}

interface CartItem {
  product: Product
  quantity: number
}

const shopper: Shopper[] = [
  {
    id: "1",
    email: "shopper@gmail.com",
    name: "shopper",
  },
]

const userIdPadrao: string = "c8b04e94-cfbe-40a1-ad2b-1cdfa19c6ede"

const QRCodeGenerator: React.FC = () => {
  return <QRCodeSVG className="mr-2 " value={userIdPadrao} size={150} />
}
const image: string = "https://www.svgrepo.com/show/36558/sell-product.svg"
const productsDemo: Product[] = [
  {
    id: "1",
    name: "Pizza Margherita Artesanal",
    description: "Placeholder",
    priceInCents: 4290,
    shoppers: shopper,
  },
]

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix")

  const [products, setProducts] = useState<Product[]>()

  useEffect(() => {
    axios
      .get("http://localhost:3333/product")
      .then((response) => {
        setProducts(response.data)
      })
      .catch((err) => {
        console.log(err)
        setProducts([])
      })
  }, productsDemo)

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product)
    setQuantity(1)
    setIsDialogOpen(true)
  }

  const handleConfirmAdd = () => {
    if (selectedProduct) {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.product.id === selectedProduct.id,
        )

        if (existingItem) {
          return prevItems.map((item) =>
            item.product.id === selectedProduct.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        } else {
          return [...prevItems, { product: selectedProduct, quantity }]
        }
      })

      setIsDialogOpen(false)
      setSelectedProduct(null)
      setQuantity(1)
    }
  }

  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    )
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId),
    )
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) =>
        total + (item.product.priceInCents / 100) * item.quantity,
      0,
    )
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) return

    setIsCartOpen(false)
    setIsPaymentOpen(true)
  }

  const handlePayment = () => {
    const method = paymentMethod === "pix" ? "PIX" : "Cartão de Crédito"
    // alert(
    //   `Pedido realizado com sucesso!\nMétodo: ${method}\nTotal: R$ ${getTotalPrice().toFixed(
    //     2,
    //   )}`,
    // )

    const orderItems = cartItems.map((item): OrderItem => {
      return {
        quantity: item.quantity,
        priceInCents: item.product.priceInCents * quantity,
        productId: item.product.id,
      }
    })

    let totalInCents: number = 0

    orderItems.forEach((item) => {
      totalInCents += item.priceInCents * quantity
    })

    const order: Order = {
      totalInCents: totalInCents,
      orderItems: orderItems,
      userId: userIdPadrao,
    }

    axios
      .post("http://localhost:3333/order", order)
      .then((response) => {
        setCartItems([])
        setIsPaymentOpen(false)
        setPaymentMethod("pix")
      })
      .catch((err) => {
        alert("Problema com o pedido, tente novamente!")
      })
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-purple-600">Iventou</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Entrega Grátis
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsQrCodeOpen(true)}
                className="hidden sm:flex"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Meu QR
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsQrCodeOpen(true)}
                className="sm:hidden h-9 w-9 p-0"
              >
                <QrCode className="h-4 w-4" />
              </Button>

              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Carrinho</span>
                {getTotalItems() > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {products?.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={image}
                  alt={product.name}
                  className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardContent className="p-2 sm:p-3">
                <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base line-clamp-2 leading-tight">
                  {product.name}
                </h3>

                <div className="flex flex-col space-y-2">
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    R$ {(product.priceInCents / 100).toFixed(2)}
                  </span>

                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 w-full text-xs sm:text-sm py-1 sm:py-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialog para seleção de quantidade */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Adicionar ao carrinho
            </DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={image}
                  alt={selectedProduct.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-lg font-bold text-gray-900">
                    R$ {(selectedProduct.priceInCents / 100).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Quantidade
                </label>
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={incrementQuantity}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Total:</span>
                  <span className="text-xl font-bold text-purple-600">
                    R${" "}
                    {((selectedProduct.priceInCents / 100) * quantity).toFixed(
                      2,
                    )}
                  </span>
                </div>

                <Button
                  onClick={handleConfirmAdd}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar ao carrinho
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog do Carrinho */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Carrinho de Compras
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCartOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Seu carrinho está vazio
                </h3>
                <p className="text-gray-500">
                  Adicione alguns produtos para começar
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg"
                  >
                    <img
                      src={image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        R$ {(item.product.priceInCents / 100).toFixed(2)} cada
                      </p>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateCartItemQuantity(
                              item.product.id,
                              item.quantity - 1,
                            )
                          }
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateCartItemQuantity(
                              item.product.id,
                              item.quantity + 1,
                            )
                          }
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900 mb-2">
                        R${" "}
                        {(
                          (item.product.priceInCents / 100) *
                          item.quantity
                        ).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t pt-4 mt-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>
                    Subtotal ({getTotalItems()}{" "}
                    {getTotalItems() === 1 ? "item" : "itens"})
                  </span>
                  <span>R$ {getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxa de entrega</span>
                  <span className="text-green-600">Grátis</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-purple-600">
                      R$ {getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
                size="lg"
              >
                Finalizar Pedido
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Pagamento */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Finalizar Pedido
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Resumo do Pedido */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Resumo do Pedido</h3>
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.quantity}x {item.product.name}
                    </span>
                    <span>
                      R${" "}
                      {(
                        (item.product.priceInCents / 100) *
                        item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">
                    R$ {getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Opções de Pagamento */}
            <div className="space-y-4">
              <h3 className="font-semibold">Escolha a forma de pagamento</h3>

              <div className="space-y-3">
                {/* Opção PIX */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "pix"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                    }`}
                  onClick={() => setPaymentMethod("pix")}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${paymentMethod === "pix"
                          ? "border-purple-500 bg-purple-500"
                          : "border-gray-300"
                        }`}
                    >
                      {paymentMethod === "pix" && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">PIX</span>
                        <Badge variant="secondary" className="text-xs">
                          Instantâneo
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Pagamento rápido e seguro
                      </p>
                    </div>
                  </div>
                </div>

                {/* Opção Cartão */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "card"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                    }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${paymentMethod === "card"
                          ? "border-purple-500 bg-purple-500"
                          : "border-gray-300"
                        }`}
                    >
                      {paymentMethod === "card" && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span className="font-medium">Cartão de Crédito</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Cartão •••• 1234 já cadastrado
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsPaymentOpen(false)
                  setIsCartOpen(true)
                }}
                className="flex-1"
              >
                Voltar ao Carrinho
              </Button>
              <Button
                onClick={handlePayment}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                {paymentMethod === "pix" ? (
                  <>Pagar com PIX</>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pagar com Cartão
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal do QR Code do Usuário */}
      <Dialog open={isQrCodeOpen} onOpenChange={setIsQrCodeOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center justify-center">
              <QRCodeGenerator />
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* QR Code */}
            {/* Informações */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <QrCode className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-purple-900 mb-1">
                    Como usar seu QR Code
                  </h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Mostre este código para o atendente</li>
                    <li>• Use para identificação rápida</li>
                    <li>• Acumule pontos de fidelidade</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Botão de Fechar */}
            <Button
              onClick={() => setIsQrCodeOpen(false)}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

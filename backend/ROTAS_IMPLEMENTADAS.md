# Rotas Implementadas para o Fluxo do Produtor

## Resumo do Modelo de Negócio

- **Shopper = Marca/Barraca** (ex: McDonald's)
- **Event** pode ter múltiplas barracas da mesma marca
- **Product** pertence a uma marca específica
- **Order** pode ter produtos de marcas diferentes
- **OrderItem** indica onde retirar (qual barraca da marca)

## Fluxo do Diagrama Implementado

### 1. "O produtor cadastra barracas" ✅
- **POST** `/shopper` - Criar shopper (marca/barraca)
- **GET** `/shopper` - Listar shoppers
- **GET** `/shopper/:id` - Buscar shopper por ID
- **DELETE** `/shopper/:id` - Deletar shopper

### 2. "O produtor cadastra o produto na barraca" ✅
- **POST** `/product` - Criar produto (associado ao shopper)
- **GET** `/product` - Listar produtos
- **GET** `/product/:id` - Buscar produto por ID
- **DELETE** `/product/:id` - Deletar produto

### 3. "O produtor cadastra a barraca no evento" ✅
- **POST** `/event/:eventId/shoppers/:shopperId` - Adicionar shopper ao evento
- **DELETE** `/event/:eventId/shoppers/:shopperId` - Remover shopper do evento
- **GET** `/event/:eventId/shoppers` - Listar shoppers do evento
- **GET** `/event/:eventId/shoppers-with-products` - Listar shoppers com produtos

## Rotas Adicionais Implementadas

### Consultas Relacionais
- **GET** `/shopper/:shopperId/products` - Produtos de uma marca
- **GET** `/shopper/:shopperId/events` - Eventos de uma marca
- **GET** `/event/:eventId/shoppers` - Marcas de um evento
- **GET** `/event/:eventId/shoppers-with-products` - Marcas com produtos de um evento

### Sistema de Pedidos
- **POST** `/order` - Criar pedido com múltiplos itens
- **GET** `/order` - Listar pedidos
- **GET** `/order/:id` - Buscar pedido por ID
- **DELETE** `/order/:id` - Deletar pedido
- **GET** `/order/:orderId/items` - Buscar todos os itens de um pedido
- **GET** `/order/item/:orderItemId` - Buscar item específico por ID (QR Code)
- **PUT** `/order/item/:orderItemId/status` - Atualizar status de retirada do item
- **PUT** `/order/item/:orderItemId/retrieve` - Marcar item como retirado (usado pela barraca)

## Estrutura do Pedido

```typescript
{
  "userId": "string",
  "totalInCents": 2500,
  "orderItems": [
    {
      "productId": "string",
      "quantity": 2,
      "priceInCents": 1250
    }
  ]
}
```

## Funcionalidades do Sistema

### ✅ Implementado
1. **Cadastro de Marcas/Barracas** (Shopper)
2. **Cadastro de Produtos** por marca
3. **Associação de Marcas a Eventos**
4. **Sistema de Pedidos** com múltiplos itens
5. **Consultas relacionais** entre entidades
6. **Status de retirada** dos itens (OrderItem.status)

### 🔄 Próximos Passos Sugeridos
1. **Sistema de Autenticação** para diferenciar roles
2. **Validação de preços** nos pedidos
3. **Sistema de notificações** para retirada
4. **Relatórios** de vendas por marca/evento
5. **Geração de QR Codes** para cada OrderItem

## Exemplo de Uso

### 1. Criar uma marca (McDonald's)
```bash
POST /shopper
{
  "name": "McDonald's",
  "email": "mcdonalds@evento.com",
  "password": "senha123"
}
```

### 2. Criar produtos da marca
```bash
POST /product
{
  "name": "Big Mac",
  "description": "Hambúrguer clássico",
  "priceInCents": 2500,
  "shopperId": "id-do-mcdonalds"
}
```

### 3. Associar marca ao evento
```bash
POST /event/evento-id/shoppers/mcdonalds-id
```

### 4. Fazer pedido com itens de marcas diferentes
```bash
POST /order
{
  "userId": "user-id",
  "totalInCents": 5000,
  "orderItems": [
    {
      "productId": "big-mac-id",
      "quantity": 1,
      "priceInCents": 2500
    },
    {
      "productId": "pizza-id",
      "quantity": 1,
      "priceInCents": 2500
    }
  ]
}
```

### 5. Consultar produtos disponíveis no evento
```bash
GET /event/evento-id/shoppers-with-products
```

### 6. Buscar item por QR Code (para a barraca)
```bash
GET /order/item/order-item-id
```

### 7. Marcar item como retirado (barraca escaneia QR Code)
```bash
PUT /order/item/order-item-id/retrieve
```

### 8. Consultar status dos itens de um pedido
```bash
GET /order/pedido-id/items
```

## Status dos Itens do Pedido

- `status: false` - Item ainda não foi retirado
- `status: true` - Item já foi retirado na barraca

O usuário pode retirar seus itens em qualquer barraca da mesma marca, conforme especificado no modelo de negócio.

## Fluxo de Retirada com QR Code

1. **Usuário faz pedido** - Sistema gera QR Code único para cada OrderItem
2. **Usuário apresenta QR Code** - Na barraca correspondente à marca do produto
3. **Barraca escaneia QR Code** - Sistema busca o OrderItem pelo ID
4. **Barraca confirma retirada** - Sistema marca `status: true` no OrderItem
5. **Usuário pode acompanhar** - Status de retirada de cada item do pedido

### Rotas para Retirada:
- **GET** `/order/item/:orderItemId` - Buscar detalhes do item (QR Code)
- **PUT** `/order/item/:orderItemId/retrieve` - Marcar como retirado
- **GET** `/order/:orderId/items` - Ver status de todos os itens do pedido 

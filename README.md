# iventou-desafio

## Event Purchase Platform

This is a platform for purchasing goods inside an event, designed to reduce queues and streamline the purchasing process.

### Main Features

- **Zé Delivery-like experience**: Features only products, not individual stores
- **Queue reduction**: Allows clients to choose which store they want to withdraw their purchase from within the event
- **Single QR-Code system**: Clients have one QR-Code that they can show at any store
- **Store manager interface**: Managers can scan QR-Codes, view orders, and checkout products for delivery to customers

### How It Works

1. **Customer Side**: 
   - Browse and purchase products through the platform
   - Receive a single QR-Code for all purchases
   - Choose pickup location at any participating store within the event

2. **Store Manager Side**:
   - Scan customer QR-Codes using the scanner interface
   - View customer orders and product details
   - Mark items as delivered after handing them to the customer

## Project Structure

```
ivent/
├── front-store/          # Store manager interface (Next.js)
│   └── app/
│       └── page.tsx      # QR scanner and order management
├── backend/              # API backend
└── README.md
```

## How to Build and Run

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on localhost:3333

### Frontend (Store Manager Interface)

1. Navigate to the frontend directory:
```bash
cd front-store
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to `http://localhost:3000`

### Backend API

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend should be running on `http://localhost:3333`

## Usage

### For Store Managers

1. Open the store manager interface in your browser
2. Click "Iniciar Scanner" to start the QR-Code scanner
3. Point the camera at the customer's QR-Code
4. Review the order details and products
5. Click "Completar Pedido" after delivering the items to the customer

### API Endpoints

- `GET /user/:id` - Get user data and orders
- `GET /product/:id` - Get product details
- `PUT /order/item/:id/retrieve` - Mark order item as retrieved

## Technology Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **QR Scanner**: html5-qrcode library
- **UI Components**: Custom components with Lucide icons
- **HTTP Client**: Axios
- **Backend**: Node.js API (details in backend directory)
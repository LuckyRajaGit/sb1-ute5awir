import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem, Payment } from '../../types';
import { PaymentModal } from './PaymentModal';
import { formatIndianPrice } from '../../utils/currency';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onPaymentComplete: (payments: Payment[]) => void;
}

export function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onPaymentComplete,
}: CartProps) {
  const [showPayment, setShowPayment] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Qty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      onUpdateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatIndianPrice(item.price * item.quantity)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Total:</span>
          <span className="text-xl font-bold">{formatIndianPrice(total)}</span>
        </div>
        <button
          onClick={() => setShowPayment(true)}
          disabled={items.length === 0}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          Process Payment
        </button>
      </div>

      {showPayment && (
        <PaymentModal
          total={total}
          onClose={() => setShowPayment(false)}
          onComplete={(payments) => {
            onPaymentComplete(payments);
            setShowPayment(false);
          }}
        />
      )}
    </div>
  );
}
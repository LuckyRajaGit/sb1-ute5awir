import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Payment, PaymentMethod } from '../../types';
import { formatIndianPrice } from '../../utils/currency';

interface PaymentModalProps {
  total: number;
  onClose: () => void;
  onComplete: (payments: Payment[]) => void;
}

export function PaymentModal({ total, onClose, onComplete }: PaymentModalProps) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentAmount, setCurrentAmount] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('cash');

  const remainingAmount = total - payments.reduce((sum, p) => sum + p.amount, 0);

  const handleAddPayment = () => {
    const amount = parseFloat(currentAmount);
    if (amount <= 0 || amount > remainingAmount) return;

    setPayments([...payments, { method: selectedMethod, amount }]);
    setCurrentAmount('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Payment</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-lg">Total: {formatIndianPrice(total)}</p>
            <p className="text-lg">Remaining: {formatIndianPrice(remainingAmount)}</p>
          </div>

          <div className="flex gap-2">
            {(['cash', 'card', 'upi'] as PaymentMethod[]).map((method) => (
              <button
                key={method}
                onClick={() => setSelectedMethod(method)}
                className={`px-4 py-2 rounded ${
                  selectedMethod === method
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {method.toUpperCase()}
              </button>
            ))}
          </div>

          <input
            type="number"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border rounded"
          />

          <button
            onClick={handleAddPayment}
            disabled={!currentAmount || parseFloat(currentAmount) > remainingAmount}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
          >
            Add Payment
          </button>

          {payments.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-bold mb-2">Payment Summary</h3>
              {payments.map((payment, index) => (
                <div key={index} className="flex justify-between">
                  <span>{payment.method.toUpperCase()}</span>
                  <span>{formatIndianPrice(payment.amount)}</span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => onComplete(payments)}
            disabled={remainingAmount > 0}
            className="w-full bg-green-600 text-white py-2 rounded disabled:bg-gray-400"
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
}
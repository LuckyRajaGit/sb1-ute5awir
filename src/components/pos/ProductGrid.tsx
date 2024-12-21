import React from 'react';
import { Product } from '../../types';
import { formatIndianPrice } from '../../utils/currency';

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export function ProductGrid({ products, onProductSelect }: ProductGridProps) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onProductSelect(product)}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="aspect-square relative mb-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">{formatIndianPrice(product.price)}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
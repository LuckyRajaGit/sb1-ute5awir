import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart, Users, Package, FileText, BarChart3, Settings, LogOut } from 'lucide-react';

const menuItems = [
  { icon: ShoppingCart, label: 'New Sale', path: '/' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: FileText, label: 'Invoices', path: '/invoices' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xl font-bold">POS System</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
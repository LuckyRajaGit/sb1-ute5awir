import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { POSPage } from '../../pages/POSPage';
import { CustomersPage } from '../../pages/CustomersPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { InvoicesPage } from '../../pages/InvoicesPage';
import { ReportsPage } from '../../pages/ReportsPage';
import { SettingsPage } from '../../pages/SettingsPage';

export function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<POSPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}
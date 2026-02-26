import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import SidebarContent from './SidebarContent';

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button - Mobile Only */}
      <button
        className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-md bg-background border border-border shadow-lg hover:bg-muted transition-colors"
        onClick={() => setMobileOpen(true)}
        aria-label="Menüyü aç"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-[220px] z-50
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          bg-background border-r border-border
        `}
      >
        {/* Close Button - Mobile Only */}
        <button
          className="lg:hidden absolute top-3 right-3 p-2 rounded-md hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(false)}
          aria-label="Menüyü kapat"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <SidebarContent />
      </aside>
    </>
  );
}

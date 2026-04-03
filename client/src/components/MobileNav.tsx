import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import SidebarContent from './SidebarContent';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button 
        onClick={() => setIsOpen(true)} 
        className="fixed top-3 left-3 z-50 p-2 bg-background/50 backdrop-blur-sm rounded-md border border-border hover:bg-secondary transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-50" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-background z-50 shadow-lg border-r border-border">
            <div className="flex justify-end p-4">
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <SidebarContent onLinkClick={() => setIsOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
}

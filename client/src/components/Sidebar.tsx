import SidebarContent from './SidebarContent';

export default function Sidebar() {
  return (
    <aside className="hidden lg:block fixed top-0 left-0 w-[220px] h-full bg-background border-r border-border">
      <SidebarContent />
    </aside>
  );
}

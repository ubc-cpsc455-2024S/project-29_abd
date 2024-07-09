import { DashboardNav } from "src/components/ui/dashboard-nav.tsx"
import { navItems } from "src/components/constants/data.ts";
import { cn } from "src/lib/utils.ts";

export default function Sidebar() {
  return (
    <nav
      className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72`)}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}

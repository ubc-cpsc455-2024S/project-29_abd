"use client";

// import { usePathname } from "next/navigation";

import { NavItem } from "src/types";
import { Dispatch, SetStateAction } from "react";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items }: DashboardNavProps) {
  // const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return null;
}

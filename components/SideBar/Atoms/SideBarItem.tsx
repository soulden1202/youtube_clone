import React, { ReactNode } from "react";
import Link from "next/link";

interface SideBarItemProps {
  href: string | object;
  icon: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  href,
  icon,
  label,
  onClick,
  className = "flex pl-3 w-full h-[3rem] hover:bg-gray-700 cursor-pointer",
}) => {
  return (
    <Link href={href}>
      <div className={className} onClick={onClick}>
        <div className="flex flex-row gap-3 text-white items-center justify-center">
          <span className="text-lg">{icon}</span>
          <span>{label}</span>
        </div>
      </div>
    </Link>
  );
};

export default SideBarItem;

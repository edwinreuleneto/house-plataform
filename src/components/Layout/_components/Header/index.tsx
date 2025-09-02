"use client";

// Dependencies
import { motion } from "framer-motion";

// Catalyst UI
import Button from "@/components/Form/Button";
import { Avatar } from "@/components/catalyst/avatar";

// Icons
import { Menu, X } from "lucide-react";

// Context
import { useAuth } from "@/context/auth";

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
  isMobile: boolean;
}

export function Header({ onMenuClick, sidebarOpen, isMobile }: HeaderProps) {
  const { user } = useAuth();

  const getUserInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 1)
      .toUpperCase();
  };

  return (
    <motion.header
      className="h-16 lg:h-20 glass border-b border-white/20 shadow-xs relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-6">
        {/* Menu & Logo */}
        <div className="flex items-center space-x-4">
          {/* <Button
            variant="ghost"
            onClick={onMenuClick}
            className="rounded-xl hover:bg-neutral-100 transition-all h-9 w-9 lg:h-10 lg:w-10"
            icon={
              sidebarOpen && isMobile ? (
                <X className="h-5 w-5 text-black" />
              ) : (
                <Menu className="h-5 w-5 text-black" />
              )
            }
          /> */}
        </div>

        {/* Header Right */}
        {/* User Dropdown */}
        {/* <DropdownMenu> */}
        <div className="pv-4">
          <div className="flex items-center gap-1">
            {(() => {
              const displayName =
                user?.user?.name || user?.user?.email || "Usuário";
              const initials = getUserInitials(displayName);
              return (
                <>
                  <Avatar
                    className="h-9 w-9 lg:h-9 lg:w-9"
                    alt={displayName}
                    initials={initials}
                  />
                  {/* <div className="hidden lg:flex flex-col items-start w-[160px] ml-1">
                        <p className="text-sm font-semibold text-slate-800 truncate">{displayName}</p>
                        {user?.user?.email && (
                          <span className="text-xs text-slate-400 truncate">{user.user.email}</span>
                        )}
                      </div> */}
                </>
              );
            })()}
          </div>
        </div>
        {/* </DropdownMenu> */}
      </div>
    </motion.header>
  );
}

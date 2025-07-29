'use client'

import { useState } from 'react'
import { motion } from "framer-motion"
import { usePathname } from 'next/navigation'
import Image from 'next/image';

// Components
import {
  Dropdown,
  DropdownButton,
} from "@/components/catalyst/dropdown"
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "@/components/catalyst/sidebar"

// Icons
import {
  LayoutDashboard,
  User2,
  Sparkles,
  LucideAxis3D,
} from "lucide-react"

// Context
import ModalSupport from "../Suport"

const SidebarContent = () => {
  const pathname = usePathname()
  const [supportOpen, setSupportOpen] = useState(false)

  const menuItems = [
    { href: "/plataform", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { href: "/plataform/leads", icon: LucideAxis3D, label: "Leads", exact: true },
    { href: "/plataform/sales", icon: Sparkles, label: "Sales", exact: true },
    { href: "/plataform/users", icon: User2, label: "Users Houser", exact: true },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <>
      <motion.div
        className="grid grid-rows-[1fr_auto] h-full"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, type: "spring" }}
      >
        <Sidebar>
          {/* Header */}
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem} className="w-full py-2">
                <motion.div className="w-[100%] pt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <SidebarLabel>
                    <Image src="/images/houser/houser.png" width={100} height={120} alt="Donna. Presente, precisa e inteligente." />
                  </SidebarLabel>
                </motion.div>
              </DropdownButton>
            </Dropdown>
          </SidebarHeader>

          {/* Body */}
          <SidebarBody>
            <SidebarSection>
              {menuItems.map((item, index) => {
                const active = item.href ? pathname === item.href : isActive(item.href)
                return (
                  <motion.div key={item.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 + index * 0.1 }}>
                    <SidebarItem
                      href={item.href}
                      current={active}
                      className={active ? 'bg-zinc-100 dark:bg-zinc-800/50' : ''}
                    >
                      <item.icon className="w-5 h-5" />
                      <SidebarLabel>{item.label}</SidebarLabel>
                    </SidebarItem>
                  </motion.div>
                )
              })}
            </SidebarSection>
            <SidebarSpacer />
          </SidebarBody>
        </Sidebar>
      </motion.div>

      <ModalSupport isOpen={supportOpen} onClose={() => setSupportOpen(false)} />
    </>
  )
}

export default SidebarContent;
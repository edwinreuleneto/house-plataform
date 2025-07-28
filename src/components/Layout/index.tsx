// Components
import { Navbar } from '@/components/catalyst/navbar'
import { Sidebar } from '@/components/catalyst/sidebar'
import { SidebarLayout } from '@/components/catalyst/sidebar-layout'
import SidebarContent from './_components/Sidebar'

// Ui
import { BlurFade } from '../magicui/blur-fade'

const Layout = ({ children,
}: Readonly<{
  children: React.ReactNode
}>) => {

  return (
    <SidebarLayout
      sidebar={<Sidebar>
        <SidebarContent />
      </Sidebar>}
      navbar={<Navbar></Navbar>}
    >
      <BlurFade>
        {children}
      </BlurFade>
    </SidebarLayout>
  )
}

export default Layout;
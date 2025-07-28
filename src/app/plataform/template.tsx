// Components
import Layout from "@/components/Layout"


export default function TemplatePlataform({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Layout>
      {children}
    </Layout>
  )
}

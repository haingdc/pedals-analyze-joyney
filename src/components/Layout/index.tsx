import Header from '@components/Layout/Header.tsx'
import '@components/Layout/Layout.css'
import { useConfig } from '@components/App/Config/utils.tsx'
import Menu from '@components/Layout/Menu.tsx'

type AppLayoutProps = {
  children: React.ReactNode
}

const AppLayout: React.FunctionComponent<AppLayoutProps> = ({ children }) => {
  const config = useConfig()
  return (
    <>
      {config.isOpen && <Menu />}
      <div className='container'>
        <Header />
        <main className='main-content'>{children}</main>
        <footer className='footer'>
          <div className='content'>
            <p>© 2024 Phân Tích Dữ Liệu</p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default AppLayout

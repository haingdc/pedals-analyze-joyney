import '@components/Layout/Menu.css'
import ButtonIcon from '@components/ui-shadcn-composed-components/ButtonIcon.tsx'
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useConfigDispatch } from '@components/App/Config/utils.tsx'
import MenuChild from '@components/Layout/MenuChild.tsx'

const Menu: React.FunctionComponent = () => {
  const dispatch = useConfigDispatch()
  return (
    <div className='app-menu-container'>
      <header className='header-container'>
        <div className='header-left'>
          <ButtonIcon onClick={() => dispatch({ type: 'hide' })}>
            <ArrowLeftIcon />
          </ButtonIcon>
          Menu
        </div>
        <div className='header-right'>
          <ButtonIcon>
            <MagnifyingGlassIcon />
          </ButtonIcon>
        </div>
      </header>
      <div className='list-container'>
        <MenuChild to='/'>Home</MenuChild>
        <MenuChild to='/blog'>Blog</MenuChild>
        <MenuChild to='/'>Package Analysis</MenuChild>
        <MenuChild to='/analytics'>Analytics</MenuChild>
        <MenuChild to='/deploy'>Deploy</MenuChild>
      </div>
    </div>
  )
}

export default Menu

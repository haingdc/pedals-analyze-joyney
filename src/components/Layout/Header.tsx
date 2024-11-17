import { useConfigDispatch } from '@components/App/Config/utils.tsx'
import '@components/Layout/Header.css'
import ButtonIcon from '@components/ui-shadcn-composed-components/ButtonIcon.tsx'
import {
  HamburgerMenuIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'

function Header() {
  const dispatch = useConfigDispatch()

  return (
    <header className='app-header'>
      <div>
        <Link to='/'>
          <ButtonIcon>
            <HomeIcon />
          </ButtonIcon>
        </Link>
      </div>
      <div className='flex items-center gap-2'>
        <ButtonIcon>
          <MagnifyingGlassIcon />
        </ButtonIcon>
        <ButtonIcon onClick={() => dispatch({ type: 'toggle' })}>
          <HamburgerMenuIcon />
        </ButtonIcon>
      </div>
    </header>
  )
}

export default Header

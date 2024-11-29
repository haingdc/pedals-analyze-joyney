import { useConfigDispatch } from "@components/App/Config/utils.tsx"
import SearchButton from "@components/Layout/components/SearchButton.tsx"
import "@components/Layout/Header.css"
import ButtonIcon from "@components/ui-shadcn-composed-components/ButtonIcon.tsx"
import { HamburgerMenuIcon, HomeIcon } from "@radix-ui/react-icons"
import { Link } from "react-router-dom"

function Header() {
  const dispatch = useConfigDispatch()

  return (
    <header className="app-header">
      <div className="start-items">
        <Link to="/">
          <ButtonIcon>
            <HomeIcon />
          </ButtonIcon>
        </Link>
      </div>
      <div className="end-items">
        <div className="search-container">
          <SearchButton />
        </div>
        <ButtonIcon onClick={() => dispatch({ type: "toggle" })}>
          <HamburgerMenuIcon />
        </ButtonIcon>
      </div>
    </header>
  )
}

export default Header

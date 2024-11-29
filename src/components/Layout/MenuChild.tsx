import { Link } from "react-router-dom"
import { useConfigDispatch } from "@components/App/Config/utils.tsx"

type MenuChildProps = {
  to: string
  children: React.ReactNode
}

const MenuChild: React.FunctionComponent<MenuChildProps> = (
  { to, children },
) => {
  const dispatch = useConfigDispatch()
  const handleClick = () => {
    dispatch({ type: "hide" })
  }
  return (
    <div className="child" onClick={handleClick}>
      <Link to={to}>{children}</Link>
    </div>
  )
}

export default MenuChild

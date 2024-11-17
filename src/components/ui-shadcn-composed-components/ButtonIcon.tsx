import type { ButtonProps } from "@components/ui/button.tsx"
import { Button } from "@components/ui/button.tsx"

export interface ButtonIconProps extends ButtonProps {
  children: React.ReactNode,
}

const ButtonIcon: React.FunctionComponent<ButtonIconProps> = ({ children, ...props }) => {
  return (
    <Button variant="outline" size="icon" {...props}>
      {children}
    </Button>
  )
}

export default ButtonIcon

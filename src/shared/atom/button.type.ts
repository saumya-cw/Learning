export type ButtonType = 'primary' | 'secondary'

export interface ButtonProps {
    variant?: ButtonType
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    children: React.ReactNode

}
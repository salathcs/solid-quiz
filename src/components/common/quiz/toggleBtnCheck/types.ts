export interface Props {
    value: string,
    onChange: (value: string, checked: boolean) => void,
    defaultChecked: boolean,
    disabled: boolean
}
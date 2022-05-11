export interface Props {
    show: boolean,
    onHide: () => void,
    onConfirm: (isPublish: boolean) => void,
}
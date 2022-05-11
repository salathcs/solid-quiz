export interface Props {
    show: boolean,
    onHide: () => void,
    onConfirm: (agentUri: string) => void,
    friendList: string[]
}
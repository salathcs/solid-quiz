export interface Props {
    formikId: string,     //formik id (must be equal with initValues key)
    label: string,
    onChange?: (value: boolean) => void
}
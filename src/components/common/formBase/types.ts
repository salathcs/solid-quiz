import { FormikValues } from "formik";

export interface Props {
    children: JSX.Element | JSX.Element[];
    initialValues: FormikValues,
    schema: any,    //Yup validation schema
    onSubmit: (values: FormikValues) => void;
    submitLabel: string
}
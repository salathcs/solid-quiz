import { FormikValues } from "formik";

export interface Props {
    onSubmit: (values: FormikValues) => void;
}
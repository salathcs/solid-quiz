import { QuizFormModel } from '../../../../models/QuizFormModel';

export interface Props {
    afterFormSubmit: (values: QuizFormModel) => void;
}
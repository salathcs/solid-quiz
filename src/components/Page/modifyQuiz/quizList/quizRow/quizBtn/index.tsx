import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { getBoolean } from '@inrupt/solid-client';
import { MULTI_LANGUAGE_SUPPORT, TITLE } from '../../../../../../constants/SolidQuizMissingValues';
import { TranslateContext } from '../../../../../../contexts/TranslateContext';
import { getString } from '../../../../../../helpers/LangReader';
import { CustomButtonYesNo } from '../../../../../common/buttonToYesNoModal/customButtonYesNo';
import { PageSwitcherContext } from '../../../../../../contexts/PageSwitcherContext';
import { CreateQuiz } from '../../../../createQuiz';

export const QuizBtn: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);
	const { SwitchTo } = useContext(PageSwitcherContext);
	const [quizTitle, setQuizTitle] = useState<string>("");
	
	useEffect(() => {
		const multiLangSupport = getBoolean(props.datasetAndThing.thing, MULTI_LANGUAGE_SUPPORT);

		let title = getString(props.datasetAndThing.thing, TITLE, multiLangSupport ?? false, lang);

		setQuizTitle(title);
	}, [props.datasetAndThing.thing, lang]);

	return (
		<div className="d-grid">
			<CustomButtonYesNo 
				variant="secondary" 
				modalText={t("modifyQuiz.modal.text")} 
				onConfirm={() => SwitchTo(<CreateQuiz datasetAndThing={props.datasetAndThing} />)}>
					{quizTitle}
			</CustomButtonYesNo>
		</div>
	);
}
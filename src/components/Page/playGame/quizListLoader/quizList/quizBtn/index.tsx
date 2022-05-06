import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { getBoolean } from '@inrupt/solid-client';
import { MULTI_LANGUAGE_SUPPORT, TITLE } from '../../../../../../constants/SolidQuizMissingValues';
import { TranslateContext } from '../../../../../../contexts/TranslateContext';
import { getString } from '../../../../../../helpers/LangReader';
import { Button } from 'react-bootstrap';

export const QuizBtn: React.FC<Props> = (props: Props) => {
	const { lang } = useContext(TranslateContext);
	const [quizTitle, setQuizTitle] = useState<string>("");
	
	useEffect(() => {
		const multiLangSupport = getBoolean(props.datasetAndThing.thing, MULTI_LANGUAGE_SUPPORT);

		let title = getString(props.datasetAndThing.thing, TITLE, multiLangSupport ?? false, lang);

		setQuizTitle(title);
	}, [props.datasetAndThing.thing, lang]);

	return (
			<Button variant="secondary" size="lg" onClick={() => props.onQuizSelected(props.datasetAndThing)} >{quizTitle}</Button>
	);
}
import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { getBoolean } from '@inrupt/solid-client';
import { MULTI_LANGUAGE_SUPPORT, TITLE } from '../../../../../../constants/SolidQuizMissingValues';
import { Button } from 'react-bootstrap';
import { TranslateContext } from '../../../../../../contexts/TranslateContext';
import { getString } from '../../../../../../helpers/LangReader';

export const QuizBtn: React.FC<Props> = (props: Props) => {
	const { lang } = useContext(TranslateContext);
	const [quizTitle, setQuizTitle] = useState<string>("");
	
	useEffect(() => {
		const multiLangSupport = getBoolean(props.quizThing, MULTI_LANGUAGE_SUPPORT);

		let title = getString(props.quizThing, TITLE, multiLangSupport ?? false, lang);

		setQuizTitle(title ?? "error");
	}, [props.quizThing, lang]);

	return (
		<div className="d-grid">
			<Button variant="secondary" size="lg" className='btn btn-default btn-block'>{quizTitle}</Button>
		</div>
	);
}
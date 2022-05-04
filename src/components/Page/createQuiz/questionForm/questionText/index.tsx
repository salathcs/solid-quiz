import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Row, Col } from 'react-bootstrap';
import { TranslateContext } from '../../../../../contexts/TranslateContext';
import { LangText } from './langText';
import { MonoText } from './monoText';

export const QuestionText: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);	

	const handleChange = (value: string) => {
		props.onChange((model) => {
			let rv = {
				...model
			};

			if (lang === 'hu'){
				rv.textHu = value;
			}
			else{
				rv.textEn = value;
			}

			return rv;
		});
	}

	const handleChangeEn = (value: string) => {
		props.onChange((model) => {
			return {
				...model,
				textEn: value
			};
		});
	}

	const handleChangeHu = (value: string) => {
		props.onChange((model) => {
			return {
				...model,
				textHu: value
			};
		});
	}

	const content = props.multiLang ? 
		<LangText 
			labelEn={t("createQuiz.question.textEn")} 
			labelHu={t("createQuiz.question.textHu")} 
			onChangeEn={handleChangeEn}
			onChangeHu={handleChangeHu} /> :
		<MonoText label={t("createQuiz.question.text")} onChange={handleChange} />

	return (
		<Row>
			<Col>
				{content}
			</Col>
		</Row>
	);
}
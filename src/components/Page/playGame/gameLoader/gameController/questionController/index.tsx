import React, { useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';

export const QuestionController: React.FC<Props> = (props: Props) => {
	const [actQuestion, setActQuestion] = useState(null);

	//TODO: questions in random order, useEffect on actQNumb -> load nex q if change, handle no next q -> result screen
	return (
		<>
		</>
	);
}
import React, { useState, useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button } from 'react-bootstrap';
import { IoMdShare } from "@react-icons/all-files/io/IoMdShare";
import { QuizShareModal } from './quizShareModal';
import { SpinnerContext } from '../../../../../../contexts/SpinnerContext';
import { checkForQuizShare, handlePublishQuiz } from '../../../../../../helpers/SharesHelper';
import { useSession } from '@inrupt/solid-ui-react';
import { InfoModal } from '../../../../../common/infoModal';
import { TranslateContext } from '../../../../../../contexts/TranslateContext';

export const QuizShare: React.FC<Props> = (props: Props) => {
	const { session } = useSession();
	const { t } = useContext(TranslateContext);
	const { SpinAround } = useContext(SpinnerContext);
	const [shareModalShow, setAhareModalShow] = useState(false);
	const [infoModal, setInfoModal] = useState<string | null>(null);

	const handleConfirm = () => {
		setAhareModalShow(false);
			
		SpinAround(async () => {
			const quizAlreadyshared = await checkForQuizShare(props.datasetAndThing, session.fetch);

			if (quizAlreadyshared){
				setInfoModal(t("modifyQuiz.modal.share.publish.alreadyPublished"));
			}
			else{
				await handlePublishQuiz(props.datasetAndThing, session.fetch);
	
				setInfoModal(t("modifyQuiz.modal.share.publish.ok"));
			}
		});	
	};

	return (
		<>
			<Button variant='light' onClick={() => setAhareModalShow(true)}><IoMdShare /></Button>
			
			<QuizShareModal show={shareModalShow} onHide={() => setAhareModalShow(false)} onConfirm={handleConfirm} />

			<InfoModal show={infoModal !== null} onHide={() => setInfoModal(null)} body={infoModal ?? "error"} />
		</>
	);
}
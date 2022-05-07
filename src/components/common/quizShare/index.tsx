import React, { useState, useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button } from 'react-bootstrap';
import { IoMdShare } from "@react-icons/all-files/io/IoMdShare";
import { QuizShareModeModal } from './quizShareModeModal';
import { SpinnerContext } from '../../../contexts/SpinnerContext';
import { checkForQuizShare, getFriendsList, handlePublishQuiz, shareQuizWithFriend } from '../../../helpers/SharesHelper';
import { useSession } from '@inrupt/solid-ui-react';
import { InfoModal } from '../infoModal';
import { TranslateContext } from '../../../contexts/TranslateContext';
import { WorkspaceContext } from '../../../contexts/WorkspaceContext';
import { QuizShareModal } from './quizShareModal';

export const QuizShare: React.FC<Props> = (props: Props) => {
	const { session } = useSession();
	const { t } = useContext(TranslateContext);
	const { SpinAround } = useContext(SpinnerContext);
	const { workspaceUrl, webId } = useContext(WorkspaceContext);
	const [shareModeModalShow, setShareModeModalShow] = useState(false);
	const [infoModal, setInfoModal] = useState<string | null>(null);
	const [shareModalShow, setShareModalShow] = useState(false);
	const [friendList, setFriendList] = useState<string[]>([]);

	const handleConfirm = (isPublish: boolean) => {
		setShareModeModalShow(false);

		if (isPublish) {
			handlePublish();
		}
		else{
			SpinAround(async () => {
				const friendList = await getFriendsList(webId, session.fetch);
				
				setFriendList(friendList);
				setShareModalShow(true);
			});	
		}
	};

	const handlePublish = () => {			
		SpinAround(async () => {
			const quizAlreadyshared = await checkForQuizShare(props.datasetAndThing, session.fetch);

			if (quizAlreadyshared) {
				setInfoModal(t("shareQuiz.modal.publish.alreadyPublished"));
			}
			else {
				await handlePublishQuiz(workspaceUrl, props.datasetAndThing, session.fetch);
	
				setInfoModal(t("shareQuiz.modal.publish.ok"));
			}
		});	
	};

	const handleShare = (agentUri: string) => {
		setShareModalShow(false);

		SpinAround(async () => {
			const quizAlreadyshared = await checkForQuizShare(props.datasetAndThing, session.fetch);

			if (quizAlreadyshared) {
				setInfoModal(t("shareQuiz.modal.publish.alreadyPublished"));
			}
			else {
				await shareQuizWithFriend(agentUri, workspaceUrl, props.datasetAndThing, session.fetch);
	
				setInfoModal(t("shareQuiz.modal.publish.ok"));
			}
		});	
	};

	return (
		<>
			<Button variant='light' onClick={() => setShareModeModalShow(true)}><IoMdShare /></Button>
			
			<QuizShareModeModal show={shareModeModalShow} onHide={() => setShareModeModalShow(false)} onConfirm={handleConfirm} />

			<QuizShareModal show={shareModalShow} onHide={() => setShareModalShow(false)} onConfirm={handleShare} friendList={friendList} />

			<InfoModal show={infoModal !== null} onHide={() => setInfoModal(null)} body={infoModal ?? "error"} />
		</>
	);
}
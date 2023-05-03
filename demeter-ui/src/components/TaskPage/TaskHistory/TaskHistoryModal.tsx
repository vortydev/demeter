import { useEffect, useState } from "react";
import { Modal, Button, Accordion } from "react-bootstrap";
import { getWeeklyHistory } from "../../../services/taskHistory.functions";
import { TaskHistory } from "../../../types/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faLeftLong, faRightLong, faTurnUp } from "@fortawesome/free-solid-svg-icons";

interface taskHistoryProps {
	show: boolean;
	newHistory: boolean;
	close: () => void;
	viewReceiver: String;
}

function TaskHistoryModal({ show, newHistory, close, viewReceiver }: taskHistoryProps) {
	const [history, setHistory] = useState<TaskHistory[]>([]);
	const [weekPrior, setWeekPrior] = useState<{ page:number, dates: Date[]}[]>([]);
	const [dateTampon, setDateTampon] = useState<Date>();
	const [subTasks, setSubTasks] = useState<Record<number, TaskHistory[]>>({});
	const [displayedTasks, setDisplayedTasks] = useState<{ title: string, sections: { when: string, tasks: TaskHistory[] }[] }[]>([]);
	const [currentPage, setCurrentPage] = useState(0);


	async function getList() {
		// requete qui get toute les taskHistory entre aWeekBefore & aujourd'hui : setHistory
		const today = new Date();
		const aWeekBefore = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); 
		setHistory(await getWeeklyHistory(aWeekBefore));

		// filtre qui prends chaque date unique de history
		const uniqueDates = history
		  .map((task) => task.completionDate)
		  .filter((value, index, self) => self.indexOf(value) === index)
		  .reverse();

		// groupe les dates par groupe de 12 et les insère dans weekPrior
		const pages: { page: number, dates: Date[] }[] = [];
		for (let i = 0; i < uniqueDates.length; i += 12) {
			const page = uniqueDates.slice(i, i + 12);
			pages.push({ page: i / 12, dates: page });
		}
		setWeekPrior(pages);
	}
	
	useEffect(() => {
		getList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [show, newHistory]);

	// toggle la liste de tâches de la journée
	function setDay(day: Date) {
		setDateTampon(day);	// remember the selected date
		if (displayedTasks.length === 0 || dateTampon !== day) {
			// filter the day's tasks and their receiver
			const seenTasks = history.filter((t) => (t.completionDate === day && t.receiver === viewReceiver));

			// group sub-tasks with their parent
			const parentTasks = seenTasks.filter((t) => t.parentId === 0);
			const newSubTasks: Record<number, TaskHistory[]> = {};
			seenTasks.forEach((t) => {
				if (t.parentId !== 0) {
					const parentTaskId = t.parentId || 0;
					if (!newSubTasks[parentTaskId]) {
						newSubTasks[parentTaskId] = [];
					}
					newSubTasks[parentTaskId].push(t);
				}
			});
			// console.log("parent tasks", parentTasks);
			// console.log("subtasks", newSubTasks);

			setSubTasks(newSubTasks);	// set subtasks

			// group by categories (1:Daily, 2:Hebdo, 3:Autre)
			const catTasks: Record<number, TaskHistory[]> = {};
			parentTasks.forEach((t) => {
				if (!catTasks[t.categorytaskId]) {
					catTasks[t.categorytaskId] = [];
				}
				catTasks[t.categorytaskId].push(t);	// add parent task

				const subtasks = newSubTasks[t.ogTaskId];
				if (subtasks) {
					subtasks.forEach((st) => {
						catTasks[t.categorytaskId].push(st); // add subtask
					});
				}
			});
			// console.log("cat tasks", catTasks);

			// group by sections within a category
			const taskList: { title: string, sections:{ when: string, tasks: TaskHistory[] }[] }[] = [];
			for (let categoryId in catTasks) {
				if (catTasks.hasOwnProperty(categoryId)) {
					const ct = catTasks[categoryId];
					let title: string;
					if (categoryId === "1") {
						title = "Quotidiennes";
					}
					else if (categoryId === "2") {
						title = "Hebdomadaires";
					}
					else {
						title = "Autres";
					}
					const sections: { when: string, tasks: TaskHistory[] }[] = [];
					for (let whenToDo of ['open', 'preClose', 'close', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']) {
						const tasks = ct.filter(task => task.whenToDo === whenToDo);
						if (tasks.length > 0) {
							let whenStr: string = whenToDo;
							if (whenToDo === 'open') whenStr = "Ouverture";
							else if (whenToDo === 'preClose') whenStr = "Pré-Fermeture";
							else if (whenToDo === 'close') whenStr = "Fermeture";
							else if (whenToDo === 'mon') whenStr = "Lundi";
							else if (whenToDo === 'tue') whenStr = "Mardi";
							else if (whenToDo === 'wed') whenStr = "Mercredi";
							else if (whenToDo === 'thu') whenStr = "Jeudi";
							else if (whenToDo === 'fri') whenStr = "Vendredi";
							else if (whenToDo === 'sat') whenStr = "Samedi";
							else if (whenToDo === 'sun') whenStr = "Dimanche";
							sections.push({ when: whenStr, tasks });
						}
					}
					taskList.push({ title, sections: sections });
				}
			}
			// console.log("taskList", taskList);

			setDisplayedTasks(taskList);	// set displayed tasks
		} 
		else {
			setDateTampon(undefined);	// clear cached date
			setDisplayedTasks([]);		// display an empty array of tasks
		}
	}

	// pro-gamer hack pour les noms et couleurs
	var receiverName = viewReceiver === "delivery" ? "Livreurs" : viewReceiver;
	var receiverColor = viewReceiver === "delivery" ? "purpleText" : (viewReceiver === "Centro" ? "blueText" : "greenText");

	return (
		<Modal show={show} onClose={close} >
			<div className="popupForm">
				<h3 className="popupTitle">Historique des tâches (<span className={`${receiverColor}`}>{receiverName}</span>)</h3>
				<p className="popupHint mb-3">
					Cliquer sur une date pour voir la complétion des tâches ce jour-là
				</p>

				<div className="hisDayList flex mb-2">
					{weekPrior[currentPage]?.dates.map((day) => (
						<Button
							className="hisDayBtn mb-2"
							variant={day === dateTampon ? "demeter" : "outline-dark"}
							onClick={() => setDay(day)}
						>
							{new Date(new Date(day).getTime() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString()}
						</Button>
					))}
					<div className="hisNav">
						<FontAwesomeIcon
							icon={faLeftLong}
							size="lg"
							onClick={() => setCurrentPage((prevPage) => prevPage > 0 ? prevPage - 1 : prevPage)}
						/>
						<span>{currentPage + 1}/{weekPrior.length}</span>
						<FontAwesomeIcon
							icon={faRightLong}
							size="lg"
							onClick={() => setCurrentPage((prevPage) => prevPage < weekPrior.length - 1 ? prevPage + 1 : prevPage)}
						/>
					</div>
				</div>

				{displayedTasks.map((category) => (
					<Accordion defaultActiveKey={['Ouverture']} alwaysOpen className="hisTaskList mb-4">
						<h3 className="hisCat">{category.title}</h3>
						{category.sections.map((section) => (
							<Accordion.Item eventKey={section.when}>
								<Accordion.Header>
									<span>{section.when}</span>
									<FontAwesomeIcon className="icon" icon={faAngleDown} size="lg" />
								</Accordion.Header>
								<Accordion.Body>
									{section.tasks.map((t) => (
										<div>
											{t.parentId === 0 && <hr className="taskLine" />}
											<div className={`hisTaskRow flex ${subTasks[t.ogTaskId] ? 'taskParent' : ''}`}>
												{t.parentId !== 0 && (<FontAwesomeIcon className="iconBullet mr-2" icon={faTurnUp} size="sm" />)}
												<span className="hisTask">{t.taskName}</span>
												<span className={`taskResponsable ${subTasks[t.ogTaskId] ? 'hide' : ''}`}>{t.whoDid}</span>
											</div>
										</div>
									))}
								</Accordion.Body>
							</Accordion.Item>
						))}
					</Accordion>
				))}

				{(displayedTasks.length === 0 && dateTampon !== undefined) && (
				<p className="popupHint">
					<i>Rien à afficher pour cette date</i>
				</p>
				)}

				<div className="popupBtnBox mt-3">
					<Button variant="demeter-dark" onClick={() => {
						setDisplayedTasks([]);
						setDateTampon(undefined);
						close();
					}}>
						Retour
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export { TaskHistoryModal };

import { useEffect, useState } from "react";
import { Modal, Button, Accordion } from "react-bootstrap";
import { getWeeklyHistory } from "../../../services/taskHistory.functions";
import { TaskHistory } from "../../../types/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faTurnUp } from "@fortawesome/free-solid-svg-icons";

interface taskHistoryProps {
	show: boolean;
	newHistory: boolean;
	close: () => void;
	viewReceiver: String;
}

function TaskHistoryModal({ show, newHistory, close, viewReceiver }: taskHistoryProps) {
	const [history, setHistory] = useState<TaskHistory[]>([]);
	const [weekPrior, setWeekPrior] = useState<Date[]>([]);
	const [dateTampon, setDateTampon] = useState<Date>();
	const [subTasks, setSubTasks] = useState<Record<number, TaskHistory[]>>({});
	const [displayedTasks, setDisplayedTasks] = useState<{ title: string, sections: { when: string, tasks: TaskHistory[] }[] }[]>([]);

	async function getList() {
		const today = new Date();
		const aWeekBefore = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
		// requete qui get toute les taskHistory entre aWeekBefore & aujourd'hui : setHistory
		// filtre qui prends chaque date unique de history et les mets dans setWeekPrior

		setHistory(await getWeeklyHistory(aWeekBefore));
		setWeekPrior(
			history
				.map((task) => task.completionDate)
				.filter((value, index, self) => self.indexOf(value) === index)
				.reverse()
		);
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

			// set subtasks
			setSubTasks(newSubTasks);

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

			// set displayed tasks
			setDisplayedTasks(taskList);
		} else {
			setDisplayedTasks([]);
		}
	}

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
					{weekPrior.map((day) => (
						<Button
							className="hisDayBtn mb-2"
							variant="outline-dark"
							onClick={() => setDay(day)}
						>
							{new Date(new Date(day).getTime() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString()}
						</Button>
					))}
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
												{t.parentId !== 0 && (
													<FontAwesomeIcon
														className="iconBullet mr-2"
														icon={faTurnUp}
														size="sm"
													/>
												)}
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


				<div className="popupBtnBox mt-3">
					<Button
						variant="demeter-dark"
						onClick={() => {
							setDisplayedTasks([]);
							close();
						}}
					>
						Retour
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export { TaskHistoryModal };

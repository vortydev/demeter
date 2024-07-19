import { useEffect, useState } from "react";
import { Modal, Button, Accordion } from "react-bootstrap";
import { getWeeklyHistory } from "../../../services/taskHistory.functions";
import { TaskHistory } from "../../../types/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faLeftLong, faRightLong, faTurnUp, faCircleNotch } from "@fortawesome/free-solid-svg-icons";

// Define buffer size
const bufferSize = 12;
const fetchDays = 30;

interface taskHistoryProps {
	show: boolean;
	newHistory: boolean;
	close: () => void;
	viewReceiver: String;
}

function TaskHistoryModal({ show, newHistory, close, viewReceiver }: taskHistoryProps) {
	const [dateTampon, setDateTampon] = useState<Date>();
	const [subTasks, setSubTasks] = useState<Record<number, TaskHistory[]>>({});
	const [displayedTasks, setDisplayedTasks] = useState<{ title: string, sections: { when: string, tasks: TaskHistory[] }[] }[]>([]);

	// Use buffer to store TaskHistory data
	const [taskHistoryBuffer, setTaskHistoryBuffer] = useState<TaskHistory[]>([]);
	const [dateBuffer, setDateBuffer] = useState<Date[]>([]);

	const [currentPage, setCurrentPage] = useState(0);
	const [loading, setLoading] = useState(true);
	const [hasMoreData, setHasMoreData] = useState(true);
	const [lastLoadedDate, setLastLoadedDate] = useState<Date>(new Date());
	
	
	useEffect(() => {
		// Function to fetch TaskHistory data and update buffer
		async function fetchTaskHistory() {
			setLoading(true);

			const today = new Date();
			const aWeekBefore = new Date(today.getTime() - fetchDays * 24 * 60 * 60 * 1000);
			console.log(`Fetching initial history from ${aWeekBefore} to ${today}`);
			const fetchedHistory: TaskHistory[] = await getWeeklyHistory(aWeekBefore, fetchDays);
			console.log("Fetched history:", fetchedHistory);
			

			if (fetchedHistory.length === 0) {
				setHasMoreData(false);
			} 
			else {
				setTaskHistoryBuffer(fetchedHistory);
				setLastLoadedDate(aWeekBefore);
		
				const uniqueDates = fetchedHistory
				  .map(task => task.completionDate)
				  .filter((value, index, self) => self.indexOf(value) === index)
				  .reverse();
				setDateBuffer(uniqueDates);
			}

			setLoading(false);
		}

		if (show && taskHistoryBuffer.length === 0) {
			fetchTaskHistory();
		}
	}, [show]);


	async function loadMoreHistory() {
		if (!hasMoreData) return;
	  
		setLoading(true);
	  
		const newEndDate = new Date(lastLoadedDate.getTime() - fetchDays * 24 * 60 * 60 * 1000);
		console.log(`Fetching more history from ${newEndDate} to ${lastLoadedDate}`);
	  
		const fetchedHistory: TaskHistory[] = await getWeeklyHistory(newEndDate, fetchDays);
	  
		if (fetchedHistory.length === 0) {
			setHasMoreData(false);
		} 
		else {
			setTaskHistoryBuffer(prevBuffer => [...prevBuffer, ...fetchedHistory]);
			setLastLoadedDate(newEndDate);
		
			const uniqueDates = fetchedHistory
				.map(task => task.completionDate)
				.filter((value, index, self) => self.indexOf(value) === index)
				.reverse();
			setDateBuffer(prevBuffer => [...prevBuffer, ...uniqueDates]);
		}

		setLoading(false);
	  }
	  

	// Function to get TaskHistory data for a specific date
	function getTaskHistoryForDate(day: Date): TaskHistory[] {
		return taskHistoryBuffer.filter((task) => task.completionDate === day && task.receiver === viewReceiver);
	}

	// Function to handle page navigation
	function handlePageNavigation(direction: number) {
		const newPage = Math.max(0, Math.min(currentPage + direction, Math.ceil(dateBuffer.length / bufferSize) - 1));

		if (direction > 0 && newPage === currentPage) {
		loadMoreHistory(); // Load more data if reaching the end of the buffer
		}
	  
		setCurrentPage(newPage);
	}
	  

	// toggle la liste de tâches de la journée
	function setDay(day: Date) {
		setDateTampon(day);
		if (displayedTasks.length === 0 || dateTampon !== day) {
			// filter the day's tasks and their receiver
			const seenTasks = getTaskHistoryForDate(day);

			// group sub-tasks with their parent
			const parentTasks = seenTasks.filter((t) => t.parentId === 0);
			const newSubTasks: Record<number, TaskHistory[]> = {};

			seenTasks.forEach((t) => {
				if (t.parentId !== 0) {
					const parentTaskId = t.parentId;
					if (!newSubTasks[parentTaskId]) {
						newSubTasks[parentTaskId] = [];
					}
					newSubTasks[parentTaskId].push(t);
				}
			});

			setSubTasks(newSubTasks);	// set subtasks

			// group by categories (1:Daily, 2:Hebdo, 3:Autre)
			const catTasks: Record<number, TaskHistory[]> = {};
			parentTasks.forEach((t) => {
				if (!catTasks[t.categorytaskId]) {
					catTasks[t.categorytaskId] = [];
				}
				const taskExists = catTasks[t.categorytaskId].some((task) => task.ogTaskId === t.ogTaskId); // check if task already exists in array
				if (!taskExists) {
					catTasks[t.categorytaskId].push(t);    // add parent task
				}
			
				const subtasks = newSubTasks[t.ogTaskId];
				if (subtasks) {
					subtasks.forEach((st) => {
						const subtaskExists = catTasks[t.categorytaskId].some((task) => task.ogTaskId === st.ogTaskId); // check if subtask already exists in array
						if (!subtaskExists) {
							catTasks[t.categorytaskId].push(st); // add subtask
						}
					});
				}
			});
			
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
					const whenLabels: { [key: string]: string } = {
						open: "Ouverture",
						preClose: "Pré-Fermeture",
						close: "Fermeture",
						mon: "Lundi",
						tue: "Mardi",
						wed: "Mercredi",
						thu: "Jeudi",
						fri: "Vendredi",
						sat: "Samedi",
						sun: "Dimanche",
					  };

					for (let whenToDo of ['open', 'preClose', 'close', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']) {
						const tasks = ct.filter(task => task.whenToDo === whenToDo);
						if (tasks.length > 0) {
							sections.push({ when: whenLabels[whenToDo] || "Non-Catégorisé", tasks });
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
					Cliquer sur une date pour voir la complétion des tâches ce jour-là.
				</p>

				{loading && <div className="mb-2">
					<p id="loading"><FontAwesomeIcon icon={faCircleNotch} spin />Chargement</p>
				</div>}

				<div className="hisNav mb-2">
					<Button
						onClick={() => handlePageNavigation(-1)}
						disabled={currentPage === 0}
						className="navButton"
						variant="icon-nav"
					>
						<FontAwesomeIcon
						icon={faLeftLong}
						size="lg"
						/>
					</Button>
					<span>{currentPage + 1}/{Math.ceil(dateBuffer.length / bufferSize)}</span>
					<Button
						onClick={() => handlePageNavigation(1)}
						disabled={currentPage >= Math.ceil(dateBuffer.length / bufferSize) - 1 && !hasMoreData}
						className="navButton"
						variant="icon-nav"
					>
						<FontAwesomeIcon
						icon={faRightLong}
						size="lg"
						/>
					</Button>
					</div>

				<div className="hisDayList flex">
					{dateBuffer.slice(currentPage * bufferSize, (currentPage + 1) * bufferSize).map((day) => (
						<Button
							className="hisDayBtn mb-2"
							variant={day === dateTampon ? "demeter" : "outline-dark"}
							onClick={() => setDay(day)}
						>
							{new Date(new Date(day).getTime() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString()}
						</Button>
					))}
				</div>

				{displayedTasks.map((category) => (
					<Accordion defaultActiveKey={['Ouverture']} alwaysOpen className="hisTaskList mt-3 mb-4">
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
						setCurrentPage(0);
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

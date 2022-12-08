import { Task } from "../../../types/Types";
import { TaskRow } from "../TaskRow";

interface OtherTaskProps {
  listTask: Task[];
  allCatTask: Task[];
  deleteSuccess: (deleted: boolean) => void;
  editSuccess: (edited: boolean) => void;
  completedSuccess: (completed: boolean) => void;
  role: string;
}

function OtherTaskDisplay({ listTask, allCatTask, deleteSuccess, editSuccess, completedSuccess, role }: OtherTaskProps) {
  const noChildList = listTask.filter((t) => t.parentId === 0);

  return (
    <div className="taskRowList flex mt-4 mb-4">
      {
        noChildList.map((Task) => (
          <TaskRow
            task={Task}
            listTask={allCatTask}
            deleteSuccess={deleteSuccess}
            editSuccess={editSuccess}
            completedSuccess={completedSuccess}
            role={role}
          />
        ))}
    </div>);
}

export { OtherTaskDisplay };
import React, { useState } from "react";

import ElipsisMenu from "../components/ElipsisMenu";
import elipsis from "../assets/icon-vertical-ellipsis.svg";

import { BoardType, TaskType } from "../types";

import AddEditTaskModal from "./AddEditTaskModal";
import DeleteModal from "./DeleteModal";

interface TaskModalProps {
  taskIndex: number;
  colIndex: number;
  board?: BoardType;
  setIsTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSetTaskStatus: (
    taskIndex: number,
    colIndex: number,
    newColIndex: number,
    status: string
  ) => void;
  onDeleteTask: (taskIndex: number, colIndex: number) => void;
  onAddTask: (task: TaskType, colIndex: number) => void;
  onEditTask: (
    task: TaskType,
    taskIndex: number,
    prevColIndex: number,
    newColIndex: number
  ) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  taskIndex,
  colIndex,
  board,
  setIsTaskModalOpen,
  onSetTaskStatus,
  onDeleteTask,
  onAddTask,
  onEditTask,
}) => {
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const columns = board && board.columns ? board.columns : [];
  const col = columns[colIndex];
  const task = col.tasks[taskIndex];

  const [status, setStatus] = useState<string>(task.status);
  const [newColIndex, setNewColIndex] = useState<number>(columns.indexOf(col));

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onSetTaskStatus(taskIndex, colIndex, newColIndex, status);
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent === "Delete") {
      onDeleteTask(taskIndex, colIndex);
      setIsTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      onClick={onClose}
      className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 left-0 bottom-0 justify-center items-center flex dropdown"
    >
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <div className="relative flex justify-between w-full items-center">
          <h1 className="text-lg">{task.title}</h1>
          <img
            onClick={() => setIsElipsisMenuOpen((prevState) => !prevState)}
            src={elipsis}
            alt="elipsis"
            className="cursor-pointer h-6"
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>
        <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6">
          {task.description}
        </p>
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
            value={status}
            onChange={onChange}
          >
            {columns.map((col, index) => (
              <option className="status-options" key={index}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.title}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
          onAddTask={onAddTask}
          onEditTask={onEditTask}
          board={board}
          device="desktop"
        />
      )}
    </div>
  );
};

export default TaskModal;

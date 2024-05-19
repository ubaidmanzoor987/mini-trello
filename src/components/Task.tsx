import React, { useState } from "react";

import TaskModal from "../modals/TaskModal";
import { BoardType, TaskType } from "../types";

interface TaskProps {
  colIndex: number;
  taskIndex: number;
  board?: BoardType;
  onAddTask: (task: TaskType, colIndex: number) => void;
  onEditTask: (
    task: TaskType,
    taskIndex: number,
    prevColIndex: number,
    newColIndex: number
  ) => void;
  onDeleteTask: (taskIndex: number, colIndex: number) => void;
  onSetTaskStatus: (
    taskIndex: number,
    colIndex: number,
    newColIndex: number,
    status: string
  ) => void;
}

const Task: React.FC<TaskProps> = ({
  colIndex,
  taskIndex,
  board,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onSetTaskStatus,
}) => {
  const columns = board && board.columns ? board.columns : [];
  const col = columns[colIndex];
  const task = col.tasks[taskIndex];
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);

  const handleOnDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className="w-[280px] first:my-5 rounded-lg bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer"
      >
        <p className="font-bold tracking-wide">{task.title}</p>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
          board={board}
          onAddTask={onAddTask}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
          onSetTaskStatus={onSetTaskStatus}
        />
      )}
    </div>
  );
};

export default Task;

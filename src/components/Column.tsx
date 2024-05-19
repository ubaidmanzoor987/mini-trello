import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";

import { BoardType, ColumnType, TaskType } from "../types";

import Task from "./Task";

interface ColumnProps {
  colIndex: number;
  onDragTask: (
    colIndex: number,
    prevColIndex: number,
    taskIndex: number
  ) => void;
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

const Column: React.FC<ColumnProps> = ({
  colIndex,
  board,
  onDragTask,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onSetTaskStatus,
}) => {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];

  const [color, setColor] = useState<string>("");

  const col =
    board && board.columns && board.columns[colIndex]
      ? board.columns[colIndex]
      : ({} as ColumnType);

  useEffect(() => {
    setColor(shuffle(colors).pop() as string);
  }, []);

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );
    if (colIndex !== prevColIndex) {
      onDragTask(colIndex, prevColIndex, taskIndex);
    }
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]"
    >
      <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${color}`} />
        {col.name} ({col.tasks.length})
      </p>
      {col.tasks.map((task, index) => (
        <Task
          key={index}
          taskIndex={index}
          colIndex={colIndex}
          onAddTask={onAddTask}
          onEditTask={onEditTask}
          board={board}
          onDeleteTask={onDeleteTask}
          onSetTaskStatus={onSetTaskStatus}
        />
      ))}
    </div>
  );
};

export default Column;

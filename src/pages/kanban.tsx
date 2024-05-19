import React, { useEffect, useState } from "react";
import Column from "../components/Column";

// import EmptyBoard from "./EmptyBoard";
import Sidebar from "../components/Sidebar";

import data from "../mocked/data.json";
import { BoardType, TaskType } from "../types";

const Kanban = () => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const boards = data.boards as BoardType[];
  const board = boards.find((board) => board.isActive);
  const columns = board?.columns || [];

  const onAddTask = (task: TaskType, colIndex: number) => {
    if (board) {
      const column = board.columns.find((col, index) => index === colIndex);
      if (column) column.tasks.push(task);
    }
  };

  const onEditTask = (
    task: TaskType,
    taskIndex: number,
    prevColIndex: number,
    newColIndex: number
  ) => {
    const { title, status, description } = task;
    if (board) {
      const column = board.columns.find((col, index) => index === prevColIndex);
      if (column) {
        const task = column.tasks.find((task, index) => index === taskIndex);
        if (task) {
          task.title = title;
          task.status = status;
          task.description = description;
          if (prevColIndex === newColIndex) return;
          column.tasks = column.tasks.filter(
            (task, index) => index !== taskIndex
          );
          const newCol = board.columns.find(
            (col, index) => index === newColIndex
          );
          if (newCol) {
            newCol.tasks.push(task);
          }
        }
      }
    }
  };

  const onDeleteTask = (taskIndex: number, colIndex: number) => {
    if (board) {
      const column = board.columns.find((col, i) => i === colIndex);
      if (column) {
        column.tasks = column.tasks.filter((task, i) => i !== taskIndex);
      }
    }
  };
  const onDragTask = (
    colIndex: number,
    prevColIndex: number,
    taskIndex: number
  ) => {
    if (board) {
      const prevCol = board.columns.find((col, i) => i === prevColIndex);
      if (prevCol) {
        const task = prevCol.tasks.splice(taskIndex, 1)[0];
        if (task) {
          const newCol = board.columns.find((col, i) => i === colIndex);
          if (newCol) {
            newCol.tasks.push(task);
          }
        }
      }
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div
      className={
        windowSize[0] >= 768 && isSideBarOpen
          ? "bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6 ml-[261px]"
          : "bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6"
      }
    >
      {windowSize[0] >= 768 && (
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          boards={boards}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => (
            <Column
              key={index}
              colIndex={index}
              board={board}
              onAddTask={onAddTask}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
              onDragTask={onDragTask}
            />
          ))}
          <div
            onClick={() => setIsBoardModalOpen(true)}
            className="h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2 mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg"
          >
            + New Column
          </div>
        </>
      ) : (
        <>Boad s empty</>
      )}
    </div>
  );
};

export default Kanban;

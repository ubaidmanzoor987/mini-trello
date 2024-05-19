import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface CardProps {
  task: { id: string, content: string };
  index: number;
}

const Card: React.FC<CardProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-kanban-card p-4 mb-2 rounded-lg shadow-md border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <span className="text-kanban-text">{task.content}</span>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">2/3</span>
              <div className="w-6 h-6 bg-blue-500 rounded-full ml-2"></div>
              <div className="w-6 h-6 bg-yellow-500 rounded-full ml-1"></div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;

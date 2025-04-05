import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from './Card';

export function SortableCard({ todo, onMoveLeft, onMoveRight, onPriorityChange, onAssigneeChange, assigneeOptions }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card 
        todo={todo} 
        onMoveLeft={onMoveLeft}
        onMoveRight={onMoveRight}
        onPriorityChange={onPriorityChange}
        onAssigneeChange={onAssigneeChange}
        assigneeOptions={assigneeOptions}
      />
    </div>
  );
} 
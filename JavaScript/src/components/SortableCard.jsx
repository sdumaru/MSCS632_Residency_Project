import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from './Card';

export function SortableCard({ todo }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card todo={todo} />
    </div>
  );
} 
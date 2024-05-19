export interface ColumnType {
  id?: string;
  name: string;
  tasks: TaskType[];
}

export interface BoardType {
  id: string;
  name: string;
  isActive: boolean;
  columns: ColumnType[];
}

export interface TaskType {
  id?: string;
  title: string;
  status: string;
  description: string;
}

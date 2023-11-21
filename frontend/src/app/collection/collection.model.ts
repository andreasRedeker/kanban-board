import { Task } from "../task/task.model";

export class Collection {
    id!: number;
    title!: string;
    description!: string;
    dateCreated!: string;
    task!: Task[];
  }
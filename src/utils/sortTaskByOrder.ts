import { TaskEntity } from "../types/entities";

export const sortTaskByOrder = (tasks: TaskEntity[]): TaskEntity[] => {
  return [...tasks.slice().sort((a, b) => a.index - b.index)];
};

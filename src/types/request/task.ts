export type CreateTask = {
  columnId: string;
  name: string;
  description?: string;
};

export type UpdateTask = {
  dashboard?: string;
  name?: string;
  description?: string;
  index?: number;
  columnId?: string;
};

export type ChangeOrderTask = {
  index: number;
  columnId?: string;
};

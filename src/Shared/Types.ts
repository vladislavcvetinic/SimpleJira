export interface ActionInterface {
  type: string;
  payload?: TASK;
}

export interface TASK {
  id?: string;
  name: string;
  className: string;
  deadLine: string;
  favourite: boolean;
  description: string;
  category: string;
  tags: string[];
}

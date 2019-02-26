export interface ITabzGroup {
  id: number;
  name?: string;
  height: number;
  width: number;
  children?: ITabzGroup[];

  parent?: ITabzGroup;
  next?: ITabzGroup;
  verticalLayout?: boolean;
  last?: boolean;
}

export interface ITabzGroup {
  id: number;
  name?: string;
  height: number;
  width: number;
  children?: ITabzGroup[];
}

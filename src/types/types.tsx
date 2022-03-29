export interface IResult {
  FirstName: string;
  LastName: string;
  Phone: string;
  id: string;
}

export interface IMyState {
  result?: IResult[];
  FirstName?: string;
  LastName?: string;
  Phone?: string;
  updateId?: string;
}

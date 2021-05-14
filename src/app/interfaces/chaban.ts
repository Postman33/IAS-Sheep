import {Farm} from './farm';

export interface Chaban {
  _id? : string;
  id? : string;
  FIO : string;
  birthday : Date;
  farm? : Farm[];
}


import {Animal} from './animal';

export interface EventInfo {
  _id? : string;
  id? : string;
  eventDate: Date,
  eventName :string,
  animals: Animal[],
  eventData: any
}

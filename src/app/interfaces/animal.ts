import {Farm} from './farm';
import {Chaban} from './chaban';
import {Otara} from './otara';

export interface Animal {
  _id? : string;
  id? : string;
  chipNo : string,
  passport: {


    sex?:  string,
    typeAnimal? : string,
    breed? : string,
    horns?: string,
    birthday? : Date,
    dateOfEntry?: Date,
    farm?:  Farm,
    chaban?:  Chaban,
    colorPrimary?: string,
    colorSecondary?: string,
    colorSecondaryOpt?: string,
    dateOfDisposal? : Date,
    reasonOfDisposal? : string,
    generation? : string,
    isSelling? : boolean,
    bloodBreeds?: string,
    typeOfCreating?:string,
    bloodGroup?: string,
    bloodPercent? :number
    otara? : Otara,
  }
}


export interface Animal {
  _id? : string;
  id? : string;
  passport: {

    chipNo : string,
    breed? : string,
    horns?: string,
    birthday? : Date,
    dateOfEntry?: Date,
    farm?: any, // TODO: -> Farm
    chaban?:any,  // TODO: -> Chaban
    colorPrimary?: String,
    colorSecondary?: String,
    colorSecondaryOpt?: String,
    dateOfDisposal? : Date,
    reasonOfDisposal? : String,
  }
}

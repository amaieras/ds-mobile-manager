import {ProblemList} from "./ProblemList";
/**
 * Created by Spacaru on 10/22/2017.
 */
export class PhoneList {
  newBrand = '';
  newModel = '';
  newSingleModel = '';
  phoneBrand = '';
  phoneModel = '';
  imei = '';
  phoneColor = '';
  phoneQuantity = 1;
  problems: ProblemList[]  = [];
  observation = '';
  deliveredDate: string;
  isRepaired = false;
}

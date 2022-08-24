import { Injectable } from '@angular/core';
import { ModeGenerationEnum } from '../const/mode-generation-enum';

@Injectable({
  providedIn: 'root'
})
export class ParametreService {

  // modeGeneration: ModeGenerationEnum = ModeGenerationEnum.ALEATOIRE;
  modeGeneration: ModeGenerationEnum = ModeGenerationEnum.TOUT_LE_MONDE;

  constructor() { }

  getModeGeneration(): ModeGenerationEnum {
    return this.modeGeneration;
  }
}

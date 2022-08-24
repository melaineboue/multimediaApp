import { TypeGenerationEnum } from "../const/type-generation-enum";

export interface Pole {
  id: number,
  code: string
  libelle: string,
  capacite: number,
  modeGeneration: TypeGenerationEnum
}

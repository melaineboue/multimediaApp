import { Personne } from "./personne";

export interface ProgrammeJour {
  date: string;
  programmeDetails: Map<string, Personne[]> // key: pole (exemple: projection)
  personneProgrammes?: string[];
  nonProgrammesObligatoire?: string[]
}

import { ProgrammeJour } from "./programme-jour"

export interface ProgrammePeriode {
  dateDebut?: string,
  dateFin?: string
  programmes?: ProgrammeJour[]
}

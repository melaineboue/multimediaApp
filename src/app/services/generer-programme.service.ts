import { Injectable } from '@angular/core';
import { TypeGenerationEnum } from '../const/type-generation-enum';
import { Personne } from '../models/personne';
import { Pole } from '../models/pole';

@Injectable({
  providedIn: 'root'
})
export class GenererProgrammeService {
  periodePersonnes: Map<string, Map<string, number>>;

  personnesCodePrenom: Map<string, Personne> = new Map([
    ['melaineboue',{prenom: 'Mélaine'} as Personne],
    ['cybelle',{prenom: 'Cybelle'} as Personne],
    ['angem',{prenom: 'Ange M'} as Personne ],
    ['ange',{prenom: 'Ange'} as Personne],
    ['glenn',{prenom: 'Glenn'} as Personne],
    ['dono',{prenom: 'Donovan'} as Personne],
    ['helina',{prenom: 'Helina'} as Personne],
    ['lambert',{prenom: 'Lambert'} as Personne],
    ['sylvanus',{prenom: 'Sylvanus'} as Personne],
    ['yarden',{prenom: 'Yarden'} as Personne],
    ['jeanpaul',{prenom: 'Jean Paul'} as Personne],
    ['terence',{prenom: 'Terence'} as Personne],
    ['stephane',{prenom: 'Stephane'} as Personne],
    ['dieudonne',{prenom: 'Dieudonne'} as Personne],
    ['brihanna',{prenom: 'Brihanna'} as Personne],
    ['marlene',{prenom: 'Marlene'} as Personne],
    ['paola',{prenom: 'Paola'} as Personne],
    ['carmel',{prenom: 'Carmel'} as Personne],
    ['josue',{prenom: 'Josue'} as Personne],
    ['donald',{prenom: 'Donald'} as Personne],
    ['ludmila',{prenom: 'Ludmila'} as Personne],
    ['maurine',{prenom: 'Maurine'} as Personne],
    ['emmanuelk',{prenom: 'Emmanuel K'} as Personne],
    ['emmanuelt',{prenom: 'Emmanuel T'} as Personne],
    ['verdey',{prenom: 'Verdey'} as Personne],
    ['haldran',{prenom: 'Haldran'} as Personne],
    ['james',{prenom: 'James'} as Personne],
    ['ghislain',{prenom: 'Ghislain'} as Personne],
    ['benjamin',{prenom: 'Benjamin'} as Personne],
    ['cyril',{prenom: 'Cyril'} as Personne]
  ]);

  poleCodeLibelle: Map<string, string> = new Map([
    ['chefdeplateau','Chef de plateau'],
    ['superviseurcadrage','Superviseur de cadrage'],
    ['cadrage','Cadrage'],
    ['photographe','Photographe'],
    ['realisation','Réalisation'],
    ['projection','Projection'],
    ['sono','Sono'],
    ['dresscode','Dress code'],
    ['gouter','Gouter'],
  ]);

  poles: Map<string, Pole> = new Map([
    ['chefdeplateau',{id:1, code:'chefdeplateau', libelle:'Chef de plateau', capacite: 1, modeGeneration: TypeGenerationEnum.INDEPENDANT } as Pole],
    ['superviseurcadrage',{id:2, code:'superviseurcadrage', libelle:'Superviseur de cadrage', capacite: 1, modeGeneration: TypeGenerationEnum.INDEPENDANT } as Pole],
    ['cadrage',{id:3, code:'cadrage', libelle:'Cadrage', capacite: 6, modeGeneration: TypeGenerationEnum.INDEPENDANT } as Pole],
    ['photographe',{id:4, code:'photographe', libelle:'Photographe', capacite: 2, modeGeneration: TypeGenerationEnum.INDEPENDANT } as Pole],
    ['realisation',{id:5, code:'realisation', libelle:'Réalisation', capacite: 1, modeGeneration: TypeGenerationEnum.INDEPENDANT } as Pole],
    ['projection', {id:6, code:'projection', libelle:'Projection', capacite: 1, modeGeneration: TypeGenerationEnum.INDEPENDANT } as Pole],
    ['sono', {id:7, code:'sono', libelle:'Sono', capacite: 1, modeGeneration: TypeGenerationEnum.INDEPENDANT } as Pole],
    ['gouter', {id:8, code:'gouter', libelle:'Gouter', capacite: 3, modeGeneration: TypeGenerationEnum.PROGRAMME_DU_JOUR } as Pole],
    ['dresscode', {id:9, code:'dresscode', libelle:'Dress code', capacite: 3, modeGeneration: TypeGenerationEnum.NON_REMPLI } as Pole]
  ]);

  capacitePole: Map<string, number> = new Map([
    ['chefdeplateau',1],
    ['superviseurcadrage',1],
    ['cadrage',6],
    ['photographe',2],
    ['realisation',1],
    ['projection',1],
    ['sono',1],
    ['gouter', 3],
  ]);

  capacitePersonneParPole: Map<string, Map<string, number>> = new Map([
    ['chefdeplateau',new Map([
      ['glenn',1],
      ['melaineboue',1],
      ['yarden',1],
      ['sylvanus',1],
      ['helina',0],
      ['james',1]
    ])],

    ['superviseurcadrage',new Map([
      ['cybelle',1],
      ['melaineboue',1],
      ['stephane',1],
      ['sylvanus',1]
    ])],

    ['cadrage',new Map([
      ['melaineboue',2],
      ['cybelle',2],
      ['angem',2 ],
      ['ange',2],
      ['helina',0],
      ['lambert',0],
      ['sylvanus',1],
      ['jeanpaul',2],
      ['terence',2],
      ['stephane',2],
      ['dieudonne',1],
      ['brihanna',0],
      ['marlene',2],
      ['paola',2],
      ['carmel',3],
      ['josue',1],
      ['ludmila',1],
      ['maurine',1],
      ['emmanuelt',1],
      ['haldran',2],
      ['cyril',2]
    ])],

    ['photographe',new Map([
      ['ludmila',2],  // Capacité par mois dans ce pole
      ['verdey',2],
      ['emmanuelt',2],
      ['emmanuelk',2]
    ])],

    ['realisation',new Map([
      ['ghislain',3],
      ['donald',0],
      ['maurine',1],
      ['dieudonne',1]
    ])],

    ['projection',new Map([
      ['maurine',2],
      ['dieudonne',2],
      ['benjamin',1]
    ])],

    ['sono',new Map([
      ['james',1],
      ['donovan',0],
      ['glenn',1],
      ['haldran',1],
      ['glenn',1],
      ['yarden',1]
    ])],

  ]);

  constructor() {
    // console.log('service', this.poleCodeLibelle);
    // console.log('service values', this.poleCodeLibelle.keys());
  }


  getPersonneParCode(codePersonne: string){
    return this.personnesCodePrenom.get(codePersonne)
  }

  getListPole(): string[]{
    return Array.from(this.poleCodeLibelle.keys());
  }

  getListePoleGenerable(): string[]{
    return Array.from(this.poles.values())
      .filter(pole => pole.modeGeneration != TypeGenerationEnum.NON_REMPLI && pole.modeGeneration != TypeGenerationEnum.PROGRAMME_DU_JOUR)
      .map(pole => pole.code);
  }

  getPoleLibelleParCode(pole: string): string {
    return this.poleCodeLibelle.get(pole);
  }

  /**
   * 1. On decremente la capacité restante de la personne programmé dans le pole
   * 2. On decremente la capacité restante du pole
   * @param pole le pole
   * @returns return le prenom de la personne programmée
   */
  programmerPersonnePourPole(pole: string): string {
    // S'il est appélé, c'est que la capacité du pole n'est pas encore pleine
    let prenom = "";

    // this.capacitePersonneParPole.get()
    return prenom;
  }

  getPersonnesPourPole(pole: string): string[]{
    console.log('ooo', pole, this.capacitePersonneParPole);

    return Array.from(this.capacitePersonneParPole.get(pole).keys());
  }



  getCapacitePersonneParPole(): Map<string, Map<string, number>> {
    return this.capacitePersonneParPole;
  }


  getPoleLibelleFromCode(codePole): string {
    return this.poleCodeLibelle.get(codePole);
  }

  getCapacitePole(pole: string): number {
    return this.capacitePole.get(pole);
  }


}

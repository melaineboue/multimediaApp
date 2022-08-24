import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { addDays, choisirEtSupprimer, choisirIndexSansSupprimer, programmerPersonne, range } from 'src/app/const/fonctions';
import { ModeGenerationEnum } from 'src/app/const/mode-generation-enum';
import { MoisSelection } from 'src/app/models/mois-selectionne';
import { Personne } from 'src/app/models/personne';
import { ProgrammeJour } from 'src/app/models/programme-jour';
import { ProgrammePeriode } from 'src/app/models/programme-periode';
import { GenererProgrammeService } from 'src/app/services/generer-programme.service';
import { ParametreService } from 'src/app/services/parametre.service';

@Component({
  selector: 'app-generation-programme',
  templateUrl: './generation-programme.component.html',
  styleUrls: ['./generation-programme.component.scss']
})
export class GenerationProgrammeComponent implements OnInit {

  programmePeriode: ProgrammePeriode = {
    dateDebut: '',
    dateFin: '',
    programmes: []
  }

  dateDebut: Date;
  dateFin: Date;
  nombreAgenerer = 0;
  moisSelection: MoisSelection[] = [
    { indice: 0, code: "jan", libelle: "Janvier", selectionne: false },
    { indice: 1, code: "fev", libelle: "Février", selectionne: false },
    { indice: 2, code: "mar", libelle: "Mars", selectionne: false },
  ];

  listePole: string[];
  capacite: Map<string, Map<string, number>>
  dejaProgramme: Map<string, Map<string, number>>;
  listeCodePersonneProgrammees: string[]; // Les codes personnes programmés chaque dimanche
  listePersonneProgrammees: Personne[]; // Les personnes programmés chaque dimanche

  timer;

  constructor(private programmeService: GenererProgrammeService, private parametreService: ParametreService) {
    this.listePole = programmeService.getListePoleGenerable();
  }



  ngOnInit(): void {
    //console.log(new Date(2008,0+1,0).toString());
    this.genererMois();
  }

  /**
   * Programme tout le monde de manière aléatoire
   * Le souci est qu'on peut se retrouver dans une situation où une personne peut être programmé plus de 10 fois
   * et une autre 1 seule fois
   */
  genererProgrammeAleatoire() {
    // this.nombreAgenerer = this.setDateDebutFindates(this.dateDebut, this.dateFin);
    // for(let i=0;i<this.nombreAgenerer;i++){

    //   this.programmePeriode.programmes.push({} as ProgrammeJour);
    // }

    // this.dateDebut = new Date();


    // Recupération des informations necessaire
    this.listePole = this.programmeService.getListPole();
    this.capacite = this.programmeService.getCapacitePersonneParPole();
    console.log('capacite', this.capacite);

    this.dejaProgramme = new Map(); // pole, (personne, nombre de fois elle est programmé)


    for (let i = 0; i < this.programmePeriode.programmes.length; i++) {

      console.log('on attaque le dimanche ' + i);

      // Pour chaque dimanche
      this.listeCodePersonneProgrammees = [];
      this.listePersonneProgrammees = [];

      let programmeJour: ProgrammeJour = {
        date: this.programmePeriode.programmes[i].date,
        programmeDetails: new Map()
      } as ProgrammeJour;

      this.listePole.filter(pole => pole !== 'dresscode' && pole !== 'gouter').forEach(pole => {
        console.log('programme pole', pole);
        let personnesCompetentes = Array.from(this.capacite.get(pole).keys());
        console.log('personnes', personnesCompetentes);
        let personneProgrammeesPole: Personne[] = [];
        console.log('pole: ' + pole + ', capacité:' + this.programmeService.getCapacitePole(pole) + ', actuel: ' + personneProgrammeesPole.length);

        // Finir avec ce pole pour le jour selectionné
        while (personneProgrammeesPole.length < this.programmeService.getCapacitePole(pole) && personnesCompetentes.length > 0) {

          console.log('pole capacité actuel restant', pole, this.programmeService.getCapacitePole(pole), personneProgrammeesPole.length, personnesCompetentes);
          console.log('actuel restant', personneProgrammeesPole, personnesCompetentes);

          //for(let j=0; j< this.programmeService.getCapacitePole(pole); j++){
          let codePersonne = programmerPersonne(personnesCompetentes);
          if (this.listeCodePersonneProgrammees.includes(codePersonne)) {
            // La personne selectionnée est déjà choisi pour un autre pole
            console.log("La personne " + codePersonne + " selectionnée est déjà choisi pour un autre pole");

          } else {

            if (!this.dejaProgramme.has(pole)) {
              this.dejaProgramme.set(pole, new Map())
            }

            let dejaProgrammePersonne = this.dejaProgramme.get(pole);
            if (!dejaProgrammePersonne.has(codePersonne)) {
              dejaProgrammePersonne.set(codePersonne, 0);
            }

            let capaciteMaximaleDansLeMois = this.programmeService.getCapacitePersonneParPole().get(pole).get(codePersonne);
            if (this.dejaProgramme.get(pole).get(codePersonne) < capaciteMaximaleDansLeMois) {
              this.listeCodePersonneProgrammees.push(codePersonne);
              let personneSelectionnee = this.programmeService.getPersonneParCode(codePersonne);
              this.listePersonneProgrammees.push(personneSelectionnee);
              personneProgrammeesPole.push(personneSelectionnee);
            }


            dejaProgrammePersonne.set(codePersonne, dejaProgrammePersonne.get(codePersonne) + 1);
          }

        }

        console.log('les programmés du pole ', pole, personneProgrammeesPole);

        programmeJour.programmeDetails.set(pole, personneProgrammeesPole)

      });

      this.programmePeriode.programmes[i] = programmeJour;
      console.log('PROGRAMME DU JOUR ', i, programmeJour);

      // Définir le gouter
      let listePersonneGouter = [];
      this.programmePeriode.programmes[i].programmeDetails.set('gouter', []);
      while (listePersonneGouter.length < 3) {
        let codePersonne = programmerPersonne(this.listeCodePersonneProgrammees);
        listePersonneGouter.push(this.programmeService.getPersonneParCode(codePersonne));
      }

      console.log('gouter', listePersonneGouter);
      programmeJour.programmeDetails.set('gouter', listePersonneGouter);

    }

    console.log('programme final', this.programmePeriode);
    console.log('les programmes', this.dejaProgramme);





    // this.timer = setInterval(() =>{
    //   generateProgrammeCore(this.programmePeriode);
    //   //this.texte = this.liste[Math.floor(Math.random()*this.liste.length)];
    // }, 2);
  }


  /**
   * programme tout le monde de manière aléatoire
   * 1- choisi un pole précis (au hasard)
   * 2- Prends la liste des personnes compétente pour ce pole
   * 3- Programmer quelqu'un de manière aleatoire et passe à la personne suivante. Une fois que toutes les personnes ont été programmé une fois, on réitère l'opération jusqu'à atteindre la capacité
   *    des compétences ou à atteindre le nombre de programmés voulu
   */
  genererProgrammerToutLeMonde() {

    // les dimanches à choisir
    // si un dimanche est plein, on le retire du tableau
    // let dimanches = range(this.programmePeriode.programmes.length);
    let codePersonnes : string[] = [];

    // choisir le pole
    let pole = choisirEtSupprimer(this.listePole);

    // recupération des compétents du pole
    codePersonnes = this.programmeService.getPersonnesPourPole(pole);

    let indice = 0;
    /**
     * supprimer le nom de la personne si sa capacité est 0
     * Repeter la boucle tant que la liste des personnes n'est pas encore vide ou si le pole selectionné a atteint sa capacité
     * Prerequis:
     */
    // while(codePersonnes.length > 0){
    while(indice < 50){
     // TODO: les pole ont atteint leur capacité

      let personneCourante = codePersonnes[indice % codePersonnes.length];

      let joursNonProgramme = this.getJoursNonProgramme(this.programmePeriode.programmes, personneCourante);
      let jour = choisirIndexSansSupprimer(joursNonProgramme); // indice du jour dans programmes

      console.log('on a choisi', jour, this.programmePeriode.programmes);

      this.programmerPersonneJour(this.programmePeriode.programmes[jour], personneCourante, pole);

      // this.programmePeriode.programmes[jour].programmeDetails


      indice++;
      // codePersonnes = [];
    }




    // console.log('Après choix ', pole, jour,dimanches);
    // Parcourir la liste des personnes

    // Choisir au hasard un pole

    // Choisir un jour au hasard

    //Affecter la personne

    // Repeter cette operation jusqu'à ce que la capacité des jours soit pleine
    // ou chaque personne atteigne sa capacité maximale

    console.log('programme final', this.programmePeriode);

  }

  /**
   * Retourne un tableau d'entiers qui represente la liste des jours où personne courante n'est pas programmé
   * @param programmes le programme de tout le mois
   * @param personneCourante la personne courante
   * @returns un tableau d'entier
   */
  getJoursNonProgramme(programmes: ProgrammeJour[], personneCourante: string): number[] {
    let joursNonProgramme: number[] = [];

    programmes.forEach((programme, index) => {
      if(!programme.nonProgrammesObligatoire.concat(programme.personneProgrammes).includes(personneCourante)){
        joursNonProgramme.push(index);
      }
    });

    return joursNonProgramme;
  }

  /**
   * Programme une personne à un jour dans un pole précis
   * @param programme le programme du jour
   * @param codePersonne le code de la personne
   * @param pole le pole concerné
   */
  programmerPersonneJour(programme: ProgrammeJour, codePersonne: string, pole: string){
    let programmeDetails = programme.programmeDetails;
    let personnesPole: Personne[] = null;
    if(programmeDetails.has(pole)){
      personnesPole = programmeDetails.get(pole);
    } else {
      personnesPole = [];
      programmeDetails.set(pole, personnesPole);
    }

    personnesPole.push(this.programmeService.getPersonneParCode(codePersonne));
    programme.personneProgrammes.push(codePersonne);
    console.log('ok yehh', programme);

  }

  genererMois() {

    this.programmePeriode.programmes = [];
    this.dateDebut = new Date();
    this.dateFin = new Date(new Date(this.dateDebut.getFullYear(), this.dateDebut.getMonth() + 1, 0).toString());
    this.setDateDebutFindates(this.dateDebut, this.dateFin);

    if (this.parametreService.getModeGeneration() == ModeGenerationEnum.ALEATOIRE) {
      this.genererProgrammeAleatoire();
    } else {
      this.genererProgrammerToutLeMonde();
    }
  }

  stopGenerate() {
    clearInterval(this.timer);
  }

  /**
   * Définit les dates des dimnches à partir du premier dimanche jusqu'au dernier jour du mois
   * @param dateDebut date de debut
   * @param dateFin date de fin
   * @returns
   */
  setDateDebutFindates(dateDebut: Date, dateFin: Date) {
    // console.log(dateDebut, dateFin);
    this.programmePeriode.dateDebut = moment(dateDebut).format('DD/MM/YYYY');
    this.programmePeriode.dateFin = moment(dateFin).format('DD/MM/YYYY');
    const msInDay = 24 * 60 * 60 * 1000;
    const differenceDays = Math.floor(Math.abs(Number(dateFin) - Number(dateDebut)) / msInDay) + 1;

    const jourAretirer = 7 - this.dateDebut.getDay();
    const nombreDimancheRestant = Math.floor((differenceDays - jourAretirer) / 7) + 1; // nombre de dimanche restant
    // console.log(nombreDimancheRestant);

    let dateActuel = addDays(new Date(), jourAretirer);
    let periode = {
      date: (moment(dateActuel)).format('DD/MM/YYYY'),
      programmeDetails: {},
      nonProgrammesObligatoire: [],
      personneProgrammes: []
    } as ProgrammeJour;

    this.programmePeriode.programmes.push(periode);

    for (let i = 1; i < nombreDimancheRestant; i++) {
      dateActuel = addDays(dateActuel, 7);

      periode = {
        date: (moment(dateActuel)).format('DD/MM/YYYY'),
        programmeDetails: {}
      } as ProgrammeJour;

      this.programmePeriode.programmes.push(periode);
    }
  }

  selectionnerMois(mois: number) {
    this.moisSelection[mois].selectionne = !this.moisSelection[mois].selectionne;
  }

  moisEstSelectionne(mois: number): boolean {
    return this.moisSelection[mois].selectionne;
  }

}

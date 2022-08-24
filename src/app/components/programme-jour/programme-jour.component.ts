import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProgrammeJour } from 'src/app/models/programme-jour';
import { GenererProgrammeService } from 'src/app/services/generer-programme.service';

@Component({
  selector: 'app-programme-jour',
  templateUrl: './programme-jour.component.html',
  styleUrls: ['./programme-jour.component.scss']
})
export class ProgrammeJourComponent implements OnInit {

  @Input() programme: ProgrammeJour = { programmeDetails: new Map() } as ProgrammeJour;

  listePole = [];

  constructor(private programmeService: GenererProgrammeService) {}

  ngOnInit(): void {
    this.listePole = this.programmeService.getListPole();
  }

  getProgrammeFromPole(pole): string {
    console.log('obtenir', pole, this.programme.date, this.programme.programmeDetails);

    if(this.programme?.programmeDetails?.has(pole) && this.programme?.programmeDetails?.get(pole)){
      return this.programme.programmeDetails.get(pole).map(personne=> personne?.prenom).join(', ');
    }
    else
      return '';
  }

  getPoleFromCode(pole: string): string {
    return this.programmeService.getPoleLibelleFromCode(pole);
  }

}

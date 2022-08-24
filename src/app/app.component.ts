import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'multimediaApp';
  texte = 'Oui';
  timer;
  liste = ['BOUE Melaine', 'Ghislain', 'Brico', 'Jaurès', 'Armis'];


  generer(){
    this.timer = setInterval(() =>{
      this.texte = this.liste[Math.floor(Math.random()*this.liste.length)];
      console.log('yes',this.texte);
    }, 20);
  }

  stop(){
    clearInterval(this.timer);
  }

  show(){
    console.log('actuelle', this.texte);

  }
}

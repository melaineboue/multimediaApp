export function addDays(date: Date, days: number){
  const dateRetour = new Date(date.valueOf());
  dateRetour.setDate(dateRetour.getDate() + days);
  return dateRetour;
}

export function programmerPersonne(listePersonne: string[]): string {
  let index = Math.floor(Math.random() * listePersonne.length);
  const prenom = listePersonne[index];
  listePersonne.splice(index, 1);
  return prenom;
}

export function choisirEtSupprimer(liste: string[]): string{
  const choix = choisirSansSupprimer(liste);
  supprimerIndiceDuTableau(liste, liste.indexOf(choix));
  return choix;
}

export function choisirIndexSansSupprimer(liste: any[]): number{
  let index = Math.floor(Math.random() * liste.length);
  return index;
}

export function choisirSansSupprimer(liste: string[]): string{
  let index = Math.floor(Math.random() * liste.length);
  const choix = liste[index];
  return choix;
}

export function supprimerIndiceDuTableau(liste: string[], indice: number){
  liste.splice(indice, 1);
}

/**
 * Renvoi un tableau de taille passé en paramètre dont les valeurs vont de 0 à n-1
 * @param nombre la taille du tableau
 * @returns un tableau de taille nombre
 */
export function range(nombre: number): number[] {
  let reponse = [];
  for(let i=0; i < nombre; i++){
    reponse.push(i);
  }
  return reponse;
}

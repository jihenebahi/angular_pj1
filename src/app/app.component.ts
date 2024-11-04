import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projeta2';
  newItem: string = ''; // Variable pour stocker l'entrée de l'utilisateur
  items: string[] = []; // Liste pour stocker les éléments ajoutés
  isRandom: boolean = true; // Par défaut, on commence en mode aléatoire
  buttonLabel: string = 'Appliquer des couleurs aléatoires'; // Texte du bouton pour les couleurs
  sortMode: number = 0; // 0: Ascendant, 1: Descendant, 2: Aléatoire
  sortButtonLabel: string = 'Trier Ascendant'; // Texte du bouton de tri
  isListVisible: boolean = true; // Variable pour suivre l'état de visibilité de la liste
  displayButtonLabel: string = 'Cacher la liste'; // Texte du bouton d'affichage

  // Méthode pour ajouter un nouvel élément à la liste
  addItem() {
    if (this.newItem.trim()) {
      this.items.push(this.newItem);
    }
  }

  // Méthode pour supprimer le dernier élément de la liste
  removeLastItem() {
    if (this.items.length > 0) {
      this.items.pop();
    }
  }

  // Méthode pour obtenir la couleur basée sur l'index
  getColor(index: number) {
    if (this.isRandom) {
      return this.randomColors[index] || this.getRandomColor();
    } else {
      const colors = ['red', 'blue', 'green']; // Couleurs cycliques
      return colors[index % colors.length]; // Applique les couleurs en boucle
    }
  }

  // Tableau pour stocker les couleurs aléatoires
  randomColors: string[] = [];

  // Méthode pour changer entre mode aléatoire et cyclique
  toggleColorMode() {
    this.isRandom = !this.isRandom; // Alterne entre aléatoire et cyclique
    if (this.isRandom) {
      this.buttonLabel = 'Appliquer des couleurs cycliques'; // Modifie le texte du bouton
      this.randomColors = this.items.map(() => this.getRandomColor()); // Génère des couleurs aléatoires
    } else {
      this.buttonLabel = 'Appliquer des couleurs aléatoires'; // Modifie le texte du bouton
    }
  }

  // Méthode pour générer une couleur aléatoire
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Méthode pour trier la liste et changer le label du bouton
  sortList() {
    this.sortMode = (this.sortMode + 1) % 3; // Alterne entre 0, 1, et 2

    if (this.sortMode === 0) {
      this.items.sort(); // Tri ascendant
      this.sortButtonLabel = 'Trier Descendant'; // Change le texte du bouton
    } else if (this.sortMode === 1) {
      this.items.sort((a, b) => b.localeCompare(a)); // Tri descendant
      this.sortButtonLabel = 'Trier Aléatoire'; // Change le texte du bouton
    } else {
      this.items = this.items
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value); // Tri aléatoire
      this.sortButtonLabel = 'Trier Ascendant'; // Change le texte du bouton
    }
  }

  // Méthode pour afficher ou cacher la liste
  toggleListVisibility() {
    this.isListVisible = !this.isListVisible; // Inverse l'état de visibilité
    this.displayButtonLabel = this.isListVisible ? 'Cacher la liste' : 'Afficher la liste'; // Change le texte du bouton
  }
}
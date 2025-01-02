import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {

  constructor() {}

  ngAfterViewInit() {
    // Sélectionner tous les liens du menu de navigation
    const links = document.querySelectorAll('.nav-link');

    // Ajouter l'événement de clic pour chaque lien
    links.forEach(link => {
      link.addEventListener('click', (event: Event) => {
        event.preventDefault();

        const targetId = (link as HTMLAnchorElement).getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100, // Ajuster pour la hauteur de la barre de navigation
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

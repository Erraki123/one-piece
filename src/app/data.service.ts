import { Injectable } from '@angular/core';

interface Service {
  title: string;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private storageKey = 'services'; // Clé utilisée pour le localStorage

  constructor() {
    // Initialisation des services avec les données du localStorage si elles existent
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([])); // Initialiser avec un tableau vide si rien n'est trouvé
    }
  }

  // Récupérer les services depuis le localStorage
  getServices(): Service[] {
    const services = localStorage.getItem(this.storageKey);
    return services ? JSON.parse(services) : [];
  }

  // Ajouter un service et le sauvegarder dans le localStorage
  addService(service: Service): void {
    const services = this.getServices();
    services.push(service);
    localStorage.setItem(this.storageKey, JSON.stringify(services)); // Sauvegarder les services dans le localStorage
  }

  // Supprimer un service et mettre à jour le localStorage
  deleteService(service: Service): void {
    let services = this.getServices();
    services = services.filter((s: Service) => s !== service); // Déclaration explicite du type 's'
    localStorage.setItem(this.storageKey, JSON.stringify(services)); // Mettre à jour le localStorage
  }

  // Mettre à jour un service dans le localStorage
  updateService(oldService: Service, newService: Service): void {
    let services = this.getServices();
    const index = services.findIndex((service: Service) => service === oldService); // Déclaration explicite du type 'service'
    if (index !== -1) {
      services[index] = { ...newService }; // Mettre à jour le service
      localStorage.setItem(this.storageKey, JSON.stringify(services)); // Sauvegarder dans le localStorage
    }
  }
}

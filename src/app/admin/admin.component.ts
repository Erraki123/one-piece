
  import { Component, OnInit } from '@angular/core';
  import { DataService } from '../data.service';
  
  @Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
  })
  export class AdminComponent implements OnInit {
    newService = {
      title: '',
      description: '',
      image: ''
    };
  
    editService: any = null; // Used for editing a service
    services: any[] = []; // Stores the list of services
  
    constructor(private dataService: DataService) {}
  
    ngOnInit() {
      // Fetch data when the component loads
      this.services = this.dataService.getServices();
    }
  
    // Add a new service
    addService() {
      if (this.newService.title && this.newService.description) {
        this.dataService.addService({ ...this.newService });
        this.newService = { title: '', description: '', image: '' }; // Reset the form
        this.services = this.dataService.getServices(); // Refresh data
      }
    }
  
    // Delete a service
    deleteService(service: any) {
      this.dataService.deleteService(service);
      this.services = this.dataService.getServices(); // Refresh data after deletion
    }
  
    // Set a service for editing
    editServiceDetails(service: any) {
      this.editService = { ...service }; // Create a copy for editing
    }
  
    // Save changes to the edited service
    saveEditedService() {
      if (this.editService && this.editService.title && this.editService.description) {
        const originalService = this.services.find(s => s.title === this.editService.title);
        if (originalService) {
          this.dataService.updateService(originalService, this.editService);
          this.editService = null; // Exit edit mode
          this.services = this.dataService.getServices(); // Refresh data
        }
      }
      
    }
    onFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.newService.image = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
    
    onEditFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.editService.image = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
    
  }
  
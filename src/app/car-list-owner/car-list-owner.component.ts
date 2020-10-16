import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-car-list-owner',
  templateUrl: './car-list-owner.component.html',
  styleUrls: ['./car-list-owner.component.css']
})
export class CarListOwnerComponent implements OnInit {
  cars: Array<any>;
  owners: Array<any>;
  ownerPerCar = new Array();

  idCars = new Array();
  constructor(private carService: CarService, private giphyService: GiphyService) { }

  ngOnInit() {
    //me traigo los carros con cool-cars para mostrarlos, debido a que necesito acceder al id del owner y no requiero el href de los carros.
    this.carService.getAll("cool-cars").subscribe(data => {
      this.cars = data;
      for (const car of this.cars) {
        this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
      }


      this.carService.getAllOw().subscribe(datos => {
        this.owners = datos._embedded.owners;
        // AQUI ES PARA ASIGNARLE EL DUEÑO A CADA CARRO
        for (const car of this.cars) {
          car.nameOwner = "Not Found.";
          for (const ownerX of this.owners) {
            if (car.ownerDni === ownerX.dni) {
                  car.nameOwner = ownerX.name;
                  car.idOfOwner = ownerX._links.self.href.slice(50);
                  break;
                
            }
            
          }
          // actualiza la api en caso de que la id de dueño de algun carro ya no exista.
          if(car.nameOwner === "Not Found."){
            if(car.ownerDni != null){
              car.ownerDni = null;
              this.saveNow(car);     
            }
          }
        }
      });


    });

  }

   saveNow(variable:any){
      this.carService.save(variable).subscribe(result => {
      }, error => console.error(error));
    }
   



}

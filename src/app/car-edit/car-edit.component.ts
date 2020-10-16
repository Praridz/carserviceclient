import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';
import { NullAstVisitor } from '@angular/compiler';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  car: any = {};
  ownerLista = new Array();
  sub: Subscription;
  theOwner:string;
  selected:string;
  ownerList;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private giphyService: GiphyService) {
  }

  ngOnInit() {

    //trae lista de todos los owners







    this.carService.getAllOw().subscribe(datos => {
      this.ownerList = datos._embedded.owners;
      for (const ownr of this.ownerList){
          (this.ownerLista).push({dni:ownr.dni, name:ownr.name});
      }
      
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        //traigo de la api el carro (id), de cars y no cool-cars, debido a que en cars se encuentra el href de dicho carro.
        this.carService.get(id).subscribe((car: any) => {
          if (car) {
            this.car = car;
            this.car.href = car._links.self.href;
            this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
            

             
              for (const ownerX of this.ownerList) {
                this.car.nameOwner = "Nobody.";
                if (this.car.ownerDni === ownerX.dni) {
                  this.car.nameOwner = ownerX.name;
                      break;
                }
                
              }
           
           
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });

  });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/car-list']);
  }

  save(form: NgForm) {
    this.carService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.carService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }


}


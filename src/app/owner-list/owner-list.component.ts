import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  listToDelete = new Array();
  owners: Array<any>;
  areSelected: boolean = false;

  constructor( private router: Router,private carService: CarService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.carService.getAllOw().subscribe(datos => {
      this.owners = datos._embedded.owners;
      for (const owner of this.owners) {
        owner.id = owner._links.self.href.slice(50);
        this.giphyService.get(owner.name).subscribe(url => owner.giphyUrl = url);
      }
    });
  }
  
  //metodo que controla los owners seleccionados.
  addingList(e,ownerz:any) {
      if(e.target.checked){        
        this.listToDelete.push(ownerz._links.self.href); //agregamos al owner a la lista de borrar
      }else{
        var indice = this.listToDelete.indexOf(ownerz._links.self.href); // obtenemos el indice del
        this.listToDelete.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
      }
      if((this.listToDelete).length!=0){
        this.areSelected=true;
      }else{
        this.areSelected=false;
      }
    
 }





g

  eliminate(){
    for(const kill of this.listToDelete){
      
      this.carService.removeOw(kill).subscribe(result => {
        this.finalmente();
      }, error => console.error(error));
    }

    
  }

 finalmente(){
  this.ngOnInit();
  this.router.navigate(['/owner-list']);
 }
}




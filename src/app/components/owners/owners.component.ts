import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from 'src/app/models/owner';
import { PixOMateService } from '../../services/pix-o-mate.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent {
  titleHeader: string = ''
  owners: Owner[] = []
  owner: Owner | undefined
  favourite: Owner[] = []
  page: number = 0
  loading: Boolean = false
  error: Boolean = false
  errorObject: any = {}
  searchText: any = ''


  constructor( private router: Router, 
               private pixOMate: PixOMateService ) {
    this.loading = true
    this.getOwners();
    if (router.url === '/owners') this.titleHeader = 'Owners'
    else if (router.url === '/search') this.titleHeader = 'Search'
  }

  getOwners(changePage: Boolean = true) {
    let search
    if (this.searchText.length > 2) search = this.searchText
    if (this.searchText.length === 0 && !changePage) {
      this.owners = []
      this.page = 0
      changePage = true
    }

    if(changePage) this.page = this.page+1
    if(!changePage && search) this.owners = []

    if (changePage || search) this.pixOMate.getOwners(this.page, search)
      .subscribe( res => {
        const min = 10000000;
        const max = 99999999;
        res.forEach((owner: Owner) => {
          owner.first_name = owner.name.split(' ').slice(0, -1).join(' ')
          owner.lastname = owner.name.split(' ').slice(-1).join(' ')
          owner.phone = `6${Math.floor(Math.random()*(max-min+1)+min)}`
          owner.website = owner.email.split('@').slice(1).join(' ')

          this.owners.push(owner)
        });
        this.loading = false
      }, (err) => {
        this.error = true;
        this.loading = false;
        this.errorObject.message = err.error.error.message;
        this.errorObject.status = err.error.error.status;
      })
  }

  detailOwner(owner: Owner) {
    if(this.owner === owner) this.owner = undefined;
    else {
      this.owner = owner;
    }
  }

  favouriteOwner() {
    if(this.owner && !this.favourite.includes(this.owner)) this.favourite.push(this.owner);
    else if(this.owner && this.favourite.includes(this.owner)) this.favourite.splice(this.favourite.indexOf(this.owner), 1);
  }

  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log("End");
      this.getOwners();
    }
}
}

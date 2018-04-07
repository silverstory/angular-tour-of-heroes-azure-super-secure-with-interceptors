import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  // heroes: Observable<Hero>[] = [];
  heroes: Observable<Hero[]>;

  constructor(private heroService: HeroService) { }

  async ngOnInit() {
    try {
      this.heroes = await this.heroService.getHeroes();
    } catch (error) {
      this.heroService.log(error);
    }
  }

}

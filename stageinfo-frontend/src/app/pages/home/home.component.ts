import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestService } from '../../../app/core/services/test.service';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  // tableau d'objet pour stocker les stages
  public stages: Array<any> = new Array();

  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.getStages();
  }

  getStages(){
    this.testService.getStages()
    .pipe(takeUntil(this.destroy$))
      .subscribe((_stages: any[]) => {
        this.stages = _stages;
        console.log(this.stages);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  
}

import { Component, AfterViewInit, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { GestureController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterViewInit {
  @ViewChild('rectangle') rectangle: ElementRef | any;

  type:string= '';
  currentX:number = 0;
  

  

  constructor(private gest:GestureController) {}

  ngAfterViewInit(): void {
    this.updateGesture();
    
  }

  updateGesture(){
    const drag = this.gest.create({
      el:this.rectangle.nativeElement,
      threshold:1,
      gestureName:'drag',
      onMove:ev => {
          this.type = ev.type;
          this.currentX = ev.currentX;
          console.log(ev.type, ev.currentX);
      },
    });
    drag.enable();
  }

}

import { Component, AfterViewInit, ViewChild, ViewChildren, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { GestureController, IonText, Gesture } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterViewInit {
  
  myArray:any = ['H','O','M','E'];
  dropArr:any = [];
  @ViewChildren('drag') drags: QueryList<ElementRef> | any;
  @ViewChild('dropzone') drop: ElementRef | any;
  gestureArray: Gesture[] = [];

  zoneIn:boolean = false;

    

  constructor(private gest:GestureController, private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.updateGesture();
    
  }

  updateGesture() {
    this.gestureArray.map(gesture => gesture.destroy());
    this.gestureArray = [];
  
    const arr = this.drags.toArray();
  
    arr.forEach((item: ElementRef, index: number) => {
      const drag = this.gest.create({
        el: item.nativeElement,
        threshold: 1,
        gestureName: 'drag',
        onStart: ev => {
          item.nativeElement.style.transition = '';
          this.changeDetectorRef.detectChanges();
        },
        onMove: ev => {
          item.nativeElement.style.transform = `translateX(${ev.deltaX}px) translateY(${ev.deltaY}px)`;
          this.checkDropZoneHover(ev.currentX, ev.currentY);
        },
        onEnd: ev => {
          if (this.zoneIn) {
            this.handleDrop(item, ev.currentX, ev.currentY, index);
          } else {
            item.nativeElement.style.transform = `translateX(0px) translateY(0px)`;
          }
        }
      });
      drag.enable();
      this.gestureArray.push(drag);
    }
    
    
    );
    this.drags.changes.subscribe(() => {
      this.updateGesture();
    });
  
   
  }




checkDropZoneHover(x:any,y:any) {
  const drop = this.drop.nativeElement.getBoundingClientRect();

  if( this.isInZone(x,y,drop)){
    this.drop.nativeElement.style.backgroundColor = '#3880ff';
    this.zoneIn = true;
  }else {
    this.drop.nativeElement.style.backgroundColor = 'white';
    this.zoneIn = false;
  }

  this.changeDetectorRef.detectChanges();

 
}

isInZone(x:any,y:any,dropzone:any) {
  if ( x < dropzone.left || x > dropzone.right ){
    return false;
  }
  if ( y < dropzone.top || y > dropzone.bottom ){
    return false;
  }
return true;

}

handleDrop(item:any, endX:any, endY:any, index:any) {
  const drop = this.drop.nativeElement;
  if(this.isInZone(endX, endY, drop)){
    item.nativeElement.remove();
    const removedItem = this.myArray.splice(index,1);
    this.dropArr.push(removedItem[0]);
  }else{
    item.nativeElement.style.transform = `translateX(0px) translateY(0px)`;
  }


  this.drop.nativeElement.style.backgroundColor = 'white';
  this.changeDetectorRef.detectChanges();
  this.updateGesture();
 
  }


}



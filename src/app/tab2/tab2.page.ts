import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Animation, AnimationController, IonCard } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit {

  @ViewChild(IonCard, { read: ElementRef }) card !:ElementRef;
private animation !: Animation;

  constructor(private animationCtrl: AnimationController) {
  

  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl.create()
    .addElement(this.card.nativeElement)
    .duration(1500)
    .iterations(Infinity)
    .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
    .fromTo('opacity', 1, 0.2);
    }

  play() {
    this.animation.play();
    }
    pause() {
    this.animation.pause();
    }
    stop() {
    this.animation.stop();
    }
    



}

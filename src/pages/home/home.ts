import { Component, ViewChild, ElementRef, Renderer, ViewChildren, QueryList } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';



const DIRECTION_VERTICAL = 30;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('canvas') canvasEl: ElementRef;
  @ViewChildren('line',{read:ElementRef}) linesRef;
  
  screenWidth : any;

  image2: any;
  canvas: any;
  context: any;

  shiftX;
  shiftY;
  linesArr :ElementRef [];
  hLinesArr : ElementRef [];
  shiftLX;
  shiftLXE;
  shiftRX;
  shiftRXE;
  
  constructor(public navCtrl: NavController, private plt: Platform) {
    this.screenWidth = window.screen.width;
  }

  ionViewDidLoad(){
   //this.canvas = this.canvasEl.nativeElement;
  // this.image2 = this.imageEl.nativeElement; 
  // this.canvas.width = this.plt.width();
  // this.canvas.height = this.plt.height();
   this.linesArr = this.linesRef.toArray();
   this.hLinesArr = this.linesArr.slice(0,4);
   ///this.initializeCanvas();
  
  }

  ionViewDidEnter(){
    console.log(this.plt.height())
   //this.drawImage();
  }



  initializeCanvas(){
    if(this.canvas.getContext){
      this.setupCanvas();
    }
  }

  setupCanvas(){
    this.context = this.canvas.getContext('2d');
  }/*
  drawImage(){
    var img = new Image();
    img.src = '../../assets/imgs/download.png';
    img.addEventListener('load',()=>{
      this.context.drawImage(img,0,0,this.canvas.width,this.canvas.height);
     
    })
   
    console.log(img);
    
  }
/*
  moveX(event){
   // console.log(event);
    /*let touch = event.touches[0];
    console.log(touch.clientX);
    
    console.log(event.target.style.transform = "translateX("+(touch.clientX-width)+"px)");
    */
  // let width = event.deltaX - event.target.offsetLeft;
/*
    if(event.srcEvent.clientX>1){
      console.log(this.lineRef.nativeElement.style.transform = "translateX("+event.deltaX +"px)");
    }
  
  }

  clusterMove(event){
    //console.log(event);
   // let mc = new HammerGestureConfig
    //event.direction = DIRECTION_VERTICAL;
    //event.offsetDirection = DIRECTION_VERTICAL;
    let halfHeight = this.plt.height()/2;
   // event.center.y = halfHeight;
    let transHeight;
    if(event.deltaY>=0){
      transHeight =event.deltaY - halfHeight;
    }
    else{
      transHeight= event.deltaY + halfHeight;
    }
    console.log(this.clusteref.nativeElement.style.transform = "translateY("+event.deltaY+"px)");
    //this.mirror1Ref.nativeElement.style.transform = "translateY("+event.deltaY+"px)";
   // this.mirror2Ref.nativeElement.style.transform = "translateY("+event.deltaY+"px)";
   
  }
*/
/*saveImage(){
    console.log(this.lineRef.nativeElement.getBoundingClientRect().x);
    this.context.lineJoin = 'round';
    this.context.strokeStyle = '#000';
    this.context.lineWidth = 2.5; 

    this.context.beginPath();
    this.context.moveTo(this.lineRef.nativeElement.getBoundingClientRect().x,0);
    this.context.lineTo(this.lineRef.nativeElement.getBoundingClientRect().x,this.plt.height());
    console.log(this.context.stroke());
  }

*/
  startMoveY(ev){
    let isHLine:boolean = false;
    let currLine;
    for (let line of this.hLinesArr){
      if(line.nativeElement == ev.target){
        isHLine = true;
        currLine = line.nativeElement;
     
      }
    }
    if (ev.touches.length == 1 && isHLine) {
      
      this.shiftY = ev.touches[0].clientY - currLine.getBoundingClientRect().top;
      this.moveYAt(ev.targetTouches[0].pageY,ev, currLine);
    }
    
  }

  moveYAt(pageY,ev, currLine){
    
    let transY = (pageY -this.shiftY)+'px';
    console.log(transY);
   // console.log(ev.target.style.transform = `translateX(${transX}px)`);
    ev.target.style.top = transY;
    currLine.style.top = transY;
    
    
  }

  moveY(ev){
    let isHLine:boolean=false;
    let currLine;
    for(let line of this.hLinesArr){
      if(line.nativeElement == ev.target){
         isHLine = true;
         currLine = line.nativeElement;
      }
      if (ev.touches.length == 1 && isHLine) {
        this.moveYAt(ev.targetTouches[0].pageY, ev,currLine);
      }
    }
   
  }
  startMoveClusterX(ev){
     console.log("START MOVE LINE RED")
    
    let leftLine = this.linesArr[4].nativeElement;
    let rightLine = this.linesArr[6].nativeElement;
    let middleLine = this.linesArr[5].nativeElement;

    if (ev.touches.length == 1) {
      
      this.shiftX = ev.touches[0].clientX - middleLine.getBoundingClientRect().left;
      this.shiftLX = ev.touches[0].clientX - leftLine.getBoundingClientRect().left;
      this.shiftRX = ev.touches[0].clientX - rightLine.getBoundingClientRect().left;
      console.log(this.shiftLX)
      console.log(this.shiftX)
      console.log(this.shiftRX)
      this.moveXClusterAt(ev.targetTouches[0].pageX,ev);
    }
    
  }

  moveXClusterAt(pageX,ev){
    let leftLine = this.linesArr[4].nativeElement;
    let rightLine = this.linesArr[6].nativeElement;
    let middleLine = this.linesArr[5].nativeElement;

    if(ev.touches){

      let transX = (pageX -this.shiftX)+'px';
      let transLX = (pageX - this.shiftLX)+'px';
      let transRX = (pageX - this.shiftRX)+'px';
      
      ev.target.style.left = transX;
      middleLine.style.left = transX;
      leftLine.style.left = transLX;
      rightLine.style.left = transRX;
    }
    
    
  }
  moveClusterX(ev){
   // console.log(ev);
     if (ev.touches.length == 1) {
       this.moveXClusterAt(ev.targetTouches[0].pageX, ev);
     }
   }

  end(){
  this.shiftX = null;
  this.shiftY= null;
  
  this.shiftLX = null;
  this.shiftRX = null
  }





  startMoveX(ev){
   /* console.log("starMoveX")
    let leftLine = this.linesArr[4].nativeElement;
    let rightLine = this.linesArr[6].nativeElement;
    let middleLine = this.linesArr[5].nativeElement;
   

    if (ev.touches.length == 1 ) {

      //this.shiftLX = middleLine.getBoundingClientRect().left - leftLine.getBoundingClientRect().left;
      this.shiftX = middleLine.getBoundingClientRect().left ;
      this.shiftRX = middleLine.getBoundingClientRect().left - leftLine.getBoundingClientRect().left ; 
      this.shiftRXE =  middleLine.getBoundingClientRect().left  - ev.touches[0].clientX ;
      //console.log(this.shiftLX)
      console.log(this.shiftRX)

      /*
      if(ev.target == leftLine){
        this.shiftLX = ev.touches[0].clientX - leftLine.getBoundingClientRect().left;
        this.shiftRX = ev.touches[0].clientX - rightLine.getBoundingClientRect().left;
        this.moveXAt(ev.targetTouches[0].pageX,ev,rightLine);
      }
      else if(ev.target == rightLine){
        this.shiftLX = ev.touches[0].clientX - leftLine.getBoundingClientRect().left;
        this.shiftRX = ev.touches[0].clientX - rightLine.getBoundingClientRect().left;
        this.moveXAt(ev.targetTouches[0].pageX,ev,leftLine);
      }
        
       this.moveXAt(ev.targetTouches[0].pageX,ev,leftLine);
  }*/

  console.log("START MOVE LINE BLACK")

    let leftLine = this.linesArr[4].nativeElement;
    let rightLine = this.linesArr[6].nativeElement;
    let middleLine = this.linesArr[5].nativeElement;

    if (ev.touches.length == 1) {
      
      this.shiftX = ev.touches[0].clientX - middleLine.getBoundingClientRect().left;
      this.shiftLX = ev.touches[0].clientX - leftLine.getBoundingClientRect().left;
      this.shiftRX = ev.touches[0].clientX - rightLine.getBoundingClientRect().left;
      console.log(this.shiftLX)
      console.log(this.shiftX)
      console.log(this.shiftRX)
      //this.moveXClusterAt(ev.targetTouches[0].pageX,ev);
    }
    
  }

  moveXAt(pageX,ev, otherLine){

    let leftLine = this.linesArr[4].nativeElement;
    let rightLine = this.linesArr[6].nativeElement;
    let middleLine = this.linesArr[5].nativeElement;

    let between = rightLine.getBoundingClientRect().left - middleLine.getBoundingClientRect().left;
    let middlePosition = middleLine.getBoundingClientRect().left;
    
    console.log("BEETWEN RED AND BLACK"+between);

    if(ev.touches){

      let transLX = (middlePosition-between)+'px';
      let transRX = (pageX - this.shiftRX)+'px';
      
      leftLine.style.left = transLX;
      rightLine.style.left = transRX;
    }

  }

  moveX(ev){
    let leftLine = this.linesArr[4].nativeElement;
    this.moveXAt(ev.targetTouches[0].pageX, ev,leftLine);
    /*
    let leftLine = this.linesArr[4].nativeElement;
    let rightLine = this.linesArr[6].nativeElement;
    console.log('move')
      if (ev.touches.length == 1) {
        if(ev.target == leftLine){
          this.moveXAt(ev.targetTouches[0].pageX, ev,rightLine);
        }
        else if(ev.target == rightLine){
          this.moveXAt(ev.targetTouches[0].pageX, ev,leftLine);
        }
        
      }*/
  }
   

  startMoveXLeft(ev){

    let leftLine = this.linesArr[4].nativeElement;
    let rightLine = this.linesArr[6].nativeElement;
    let middleLine = this.linesArr[5].nativeElement;

    if (ev.touches.length == 1) {
      
      this.shiftX = ev.touches[0].clientX - middleLine.getBoundingClientRect().left;
      this.shiftLX = ev.touches[0].clientX - leftLine.getBoundingClientRect().left;
      this.shiftRX = ev.touches[0].clientX - rightLine.getBoundingClientRect().left;
      console.log(this.shiftLX)
      console.log(this.shiftX)
      console.log(this.shiftRX)
      //this.moveXClusterAt(ev.targetTouches[0].pageX,ev);
    }

  }

  moveXLeft(ev){
    //let leftLine = this.linesArr[4].nativeElement;
    this.moveXAtLeft(ev.targetTouches[0].pageX, ev);
    /*
    let leftLine = this.linesArr[4].nativeElement;
    let rightLine = this.linesArr[6].nativeElement;
    console.log('move')
      if (ev.touches.length == 1) {
        if(ev.target == leftLine){
          this.moveXAt(ev.targetTouches[0].pageX, ev,rightLine);
        }
        else if(ev.target == rightLine){
          this.moveXAt(ev.targetTouches[0].pageX, ev,leftLine);
        }
        
      }*/
  }

  moveXAtLeft(pageX,ev){
    let leftLine = this.linesArr[4].nativeElement;
    let rightLine = this.linesArr[6].nativeElement;
    let middleLine = this.linesArr[5].nativeElement;

    let between = middleLine.getBoundingClientRect().left - leftLine.getBoundingClientRect().left ;
    let middlePosition = middleLine.getBoundingClientRect().left;

    console.log("BEETWEN RED AND BLACK"+between);

    if(ev.touches){

      let transLX = (pageX - this.shiftLX)+'px';
      let transRX = (middlePosition+between)+'px';
      
      
      leftLine.style.left = transLX;
      rightLine.style.left = transRX;
    }

  }




/*
  imageMove(ev) {
    if (ev.targetTouches.length == 1) {
      console.log(ev);
      this.moveImageAt(ev.touches[0].pageX, ev.touches[0].pageY);
    }


  }
  imagePinch(ev){
    var currentZoom = this.image.zoom;
    console.log('Current zoom : ',currentZoom)
    /*if(ev.additionalEvent && ev.additionalEvent.substring(0,5) === 'pinch'){
      console.log('Pinch event',ev);
    }*/
   /*
  }
  imagePinchStart(ev){
    this.lastZoom = undefined;
  }

  startMove(ev) {
    if (ev.targetTouches.length == 1) {
      console.log('Bounding funct: ', this.image.getBoundingClientRect());
      console.log('Event : ', ev);
      this.shiftX = ev.touches[0].clientX - this.image.getBoundingClientRect().left;
      console.log('funct with left: ', this.image.getBoundingClientRect().left);
      this.shiftY = ev.touches[0].clientY - this.image.getBoundingClientRect().top;
      console.log('funct with top: ', this.image.getBoundingClientRect().top);

      this.moveImageAt(ev.pageX, ev.pageY);
    }

  }

  moveImageAt(pageX,pageY){
    console.log('Page X: ',pageX, 'Page Y: ',pageY)
    let transX = (pageX -this.shiftX)+'px';
    let transY = (pageY - this.shiftY)+'px';
    console.log(this.image.style.transform = 'translate('+transX+','+transY+')');
    
    
  }*/
}

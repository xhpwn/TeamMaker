import { Component } from "@angular/core";

@Component({
    selector: 'app-ml',
    template: `
    <div class="circle__wrapper">
      <div class="circle__1"></div>
      <div class="circle__2"></div>
      <div class="circle__3"></div>
      <div class="circle__4"></div>
    </div>
    `,
    styles: [`
    .circle__wrapper {
      position: relative;
      width: 40vw;
      height: 160px;
    }
    
    .circle__1 {
      width: 160px;
      height: 160px;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      border-top: 5px solid #FFA719;
      border-right: 5px solid #FFA719;
      border-left: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-radius: 50%;
      transform: rotate(-45deg);
      animation: rotateCircle 3s ease-in-out 0s infinite;
    }
    
    .circle__2 {
      width: 130px;
      height: 130px;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      border-top: 5px solid #e56660;
      border-right: 5px solid #e56660;
      border-left: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-radius: 50%;
      transform: rotate(-45deg);
      animation: rotateCircle 3s ease-in-out 0.1s infinite;
    }
    
    .circle__3 {
      width: 100px;
      height: 100px;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      border-top: 5px solid #009EB2;
      border-right: 5px solid #009EB2;
      border-left: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-radius: 50%;
      transform: rotate(-45deg);
      animation: rotateCircle 3s ease-in-out 0.2s infinite;
    }
    
    .circle__4 {
      width: 70px;
      height: 70px;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      border-top: 5px solid #724e94;
      border-right: 5px solid #724e94;
      border-left: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-radius: 50%;
      transform: rotate(-45deg);
      animation: rotateCircle 3s ease-in-out 0.3s infinite;
    }
    
    @keyframes rotateCircle {
      0% {
        transform: rotate(-45deg);
      }
      80% {
        transform: rotate(calc(3turn - 20deg));
      }
      90% {
        transform: rotate(calc(3turn - 45deg));
      }
      100% {
        transform: rotate(calc(3turn - 45deg));
      }
    }
    /*only for general style*/
    * {
      margin: 0;
      padding: 0;
    }
    
    html {
      width: 100%;
      height: 100%;
    }
    
    body {
      background-color: #21252e;
      width: 100%;
      min-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }    
    
    `]
})

export class MlComponent {

}
/*
 * @Author: zhangjicheng
 * @Date: 2022-10-18 17:17:12
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-18 17:19:59
 * @FilePath: \scroller.js\src\main.ts
 */
import tweenFunctions from 'tween-functions';

type TweenFunctionsType = 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' | 'easeInSine' | 'easeOutSine' | 'easeInOutSine' | 'easeInExpo' | 'easeOutExpo' | 'easeInOutExpo' | 'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc' | 'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic' | 'easeInBack' | 'easeOutBack' | 'easeInOutBack' | 'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce';

class Scroller {

  element: HTMLElement | Window;
  easing: TweenFunctionsType;
  scrollId: number | undefined;
  source: number;
  target: number;
  duration: number;
  prevTimestamp: number;

  constructor(element?: HTMLElement) {
    this.scrollId;
    this.element = element || window;
    this.easing = 'easeOutCubic';
    this.prevTimestamp = 0;
    this.target = 0;
    this.source = 0;
    this.duration = 250;
  }

  step(timestamp: number) {
    if (!this.prevTimestamp) this.prevTimestamp = timestamp; 
    const currentTime = timestamp - this.prevTimestamp;
    const value = tweenFunctions[this.easing](currentTime, this.source, this.target, this.duration);
    this.element.scrollTo(0, value);
    if (value < this.target) {
      this.scrollId = requestAnimationFrame(this.step.bind(this));
    } else {
      this.source = this.target;
    }
  }

  scrollTo(y: number) {
    this.prevTimestamp = 0;
    this.target = y;
    this.scrollId = requestAnimationFrame(this.step.bind(this));
  }
}

export default Scroller;
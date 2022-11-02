/*
 * @Author: zhangjicheng
 * @Date: 2022-10-18 17:17:12
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-11-02 17:58:27
 * @FilePath: \scroller.js\src\main.ts
 */
import tweenFunctions from '@/utils/tweenFunctions';

/** 滚动配置 */
type Option = {
  /** 滚动持续时间 */
  duration?: number,
  /** 动画函数 */
  easing?: 'linear' | 'ease',
}

/**
 * 滚动器
 */
 class Scroller {

  private scrollId: number;
  private prevTimestamp: number;
  private scrollCb?: (y: number) => void;
  private speed: number;
  /** 滚动起始位置 */
  public source: number;
  /** 滚动截止位置 */
  public target: number;
  /** 滚动元素，默认window */
  public element: HTMLElement | Window;
  /** 滚动动画 */
  public easing: 'ease' | 'linear';
  /** 滚动持续时间 默认300ms */
  public duration: number;

  constructor(element?: HTMLElement, option?: Option) {
    const {
      duration = 300,
      easing = 'ease'
    } = option || {};

    this.scrollId = 0;
    this.speed = 50 / 1000;
    this.element = element || window;
    this.easing = easing;
    this.prevTimestamp = 0;
    this.target = 0;
    this.source = 0;
    this.duration = duration;
  }

  /**
   * 滚动步骤
   * @param timestamp 
   */
  private step(timestamp: number) {

    if (!this.prevTimestamp) this.prevTimestamp = timestamp; 
    const currentTime = timestamp - this.prevTimestamp;
    const value = tweenFunctions[this.easing](currentTime, this.source, this.target, this.duration);
    if (this.scrollCb) this.scrollCb(value);
    if (this.element === window) {
      window.scrollTo(0, value);
    } else {
      (this.element as HTMLElement).scrollTop = value;
    }

    if (value !== this.target) {
      this.scrollId = requestAnimationFrame(this.step.bind(this));
    }
  }

  /**
   * 滚动到指定位置
   * @param y 目标位置
   * @param callBack 回调方法，返回每次滚动位置
   */
  scrollTo(y: number, callBack?: (y: number) => void) {
    this.scrollCb = callBack;
    this.source = this.element === window ? window.scrollY : (this.element as Element).scrollTop;
    this.prevTimestamp = 0;
    this.target = y;
    this.scrollId = requestAnimationFrame(this.step.bind(this));
  }

  private linearStep(timestamp: number) {
    if (!this.prevTimestamp) this.prevTimestamp = timestamp; 
    const currentTime = timestamp - this.prevTimestamp;
    const value = this.source + currentTime * this.speed;
    if (this.scrollCb) this.scrollCb(value);
    if (this.element === window) {
      window.scrollTo(0, value);
    } else {
      (this.element as HTMLElement).scrollTop = value;
    }
    this.scrollId = requestAnimationFrame(this.linearStep.bind(this));
  }

  /**
   * 开始滚动
   * @param speed 滚动速度 px/s 默认50
   * @param callBack 回调方法，返回每次滚动位置
   */
  start(speed?: number, callBack?: (y: number) => void) {
    this.scrollCb = callBack;
    if (speed) this.speed = speed / 1000; // 将速度转为 px/ms
    this.source = this.element === window ? window.scrollY : (this.element as Element).scrollTop;
    this.prevTimestamp = 0;
    this.scrollId = requestAnimationFrame(this.linearStep.bind(this));
  }

  /**
   * 停止滚动
   */
  stop() {
    window.cancelAnimationFrame(this.scrollId);
  }
}

export default Scroller
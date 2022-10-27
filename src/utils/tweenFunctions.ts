/*
 * @Author: zhangjicheng
 * @Date: 2022-10-27 15:55:17
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-27 15:56:25
 * @FilePath: \scroller.js\src\utils\tweenFunctions.ts
 */

type tweenParams = [
  /** 当前时间 */
  time: number,
  /** 起始值 */
  start: number,
  /** 结束值 */
  end: number,
  /** 持续时间 */
  duration: number
]

/** 匀速运动 */
function linearTween(...params: tweenParams): number {
  const [time, start, end, duration] = params;
  const 
    v = (end - start) / duration,
    s = v * time + start;
  return time > duration ? end : s;
}

/** 匀减速运动 */
function easeTween(...params: tweenParams) {
  const [time, start, end, duration] = params;
  const
    v_end = 0,
    v_begin = (end - start) * 2 / duration - v_end,
    a = (v_end - v_begin) / duration,
    v = v_begin + a * time,
    s = start + (v_begin + v) * time / 2;
  return time > duration ? end : s;
}

/** 运动函数 */
const tweenFunctions = {
  /** 匀速运动 */
  linear: linearTween,
  /** 匀减速运动 */
  ease: easeTween,
}

export default tweenFunctions;
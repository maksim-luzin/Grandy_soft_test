import { AnimationTime } from '../const';
import { IPoint } from '../interfaces';

class Line {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly xMemory: number;
  private readonly yMemory: number;
  private xStart: number;
  private yStart: number;
  private xEnd: number;
  private yEnd: number;
  private deltaX: number;
  private deltaY: number;

  constructor({ x, y }: IPoint, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.xMemory = x;
    this.yMemory = y;
    this.xStart = x;
    this.yStart = y;
    this.xEnd = x;
    this.yEnd = y;
    this.deltaX = 0;
    this.deltaY = 0;
  }

  setNewPoint({ x, y }: IPoint) {
    if (x > this.xMemory) {
      this.xStart = this.xMemory;
      this.yStart = this.yMemory;
      this.xEnd = x;
      this.yEnd = y;
    } else {
      this.xStart = x;
      this.yStart = y;
      this.xEnd = this.xMemory;
      this.yEnd = this.yMemory;
    }
  }

  getLine() {
    return {
      startPoint: {
        x: this.xStart,
        y: this.yStart
      },
      endPoint: {
        x: this.xEnd,
        y: this.yEnd
      }
    };
  }

  drawLine() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.xStart, this.yStart);
    this.ctx.lineTo(this.xEnd, this.yEnd);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  setDelta() {
    this.deltaX = (this.xEnd - this.xStart) / (2 * AnimationTime);
    this.deltaY = Math.abs(this.yEnd - this.yStart) / (2 * AnimationTime);
  }

  collapseUpdate(delta: number) {
    this.xStart += delta * this.deltaX;
    this.xEnd -= delta * this.deltaX;
    if (this.yStart < this.yEnd) {
      this.yStart += delta * this.deltaY;
      this.yEnd -= delta * this.deltaY;
    } else {
      this.yStart -= delta * this.deltaY;
      this.yEnd += delta * this.deltaY;
    }
  }
}

export { Line };

import { pointRadius } from '../const';
import { IPoint } from '../interfaces';

class Point {
  point: IPoint;
  ctx: CanvasRenderingContext2D;

  constructor(point: IPoint, ctx: CanvasRenderingContext2D) {
    this.point = point;
    this.ctx = ctx;
  }

  drawPoint() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'red';
    this.ctx.arc(this.point.x, this.point.y, pointRadius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export { Point };

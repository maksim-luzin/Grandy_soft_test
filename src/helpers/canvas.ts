/* eslint-disable no-confusing-arrow */
/* eslint-disable operator-linebreak */
import { Line } from './line';
import { AnimationTime } from '../const';
import { IPoint } from '../interfaces';
import { MouseKey } from '../enums';
import { Point } from './point';

class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  newLine?: Line;
  lines: Line[] = [];
  offset!: IPoint;
  points: Point[] = [];
  newPoints: Point[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas.width = this.canvas.getBoundingClientRect().width;
    this.canvas.height = this.canvas.getBoundingClientRect().height;
    this.offset = {
      x: this.canvas.getBoundingClientRect().x,
      y: this.canvas.getBoundingClientRect().y
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createNewLine({ x, y }: IPoint) {
    this.newLine = new Line({ x, y }, this.ctx);
  }

  updateNewLine({ x, y }: IPoint) {
    if (!this.newLine) return;
    this.clearCanvas();
    this.newLine.setNewPoint({
      x: x - this.offset.x,
      y: y - this.offset.y
    });
    this.newLine.drawLine();

    this.addNewPointsForIntersections();
    this.renderAllLinesAndPoints();
  }

  addLine() {
    if (!this.newLine) return;
    this.lines.push(this.newLine);
    this.points = [...this.points, ...this.newPoints];
    this.newLine = undefined;
    this.newPoints = [];
  }

  removeNewLine() {
    this.newLine = undefined;
  }

  clearNewLine() {
    this.removeNewLine();
    this.removeNewPoints();
    this.clearCanvas();
    this.renderAllLinesAndPoints();
  }

  removePoints() {
    this.points = [];
  }

  removeNewPoints() {
    this.newPoints = [];
  }

  renderAllLinesAndPoints() {
    this.lines.forEach((line) => {
      line.drawLine();
    });

    this.points.forEach((point) => {
      point.drawPoint();
    });

    this.newPoints.forEach((point) => {
      point.drawPoint();
    });
  }

  addNewPointsForIntersections() {
    this.removeNewPoints();
    if (!this.newLine) return;
    const getK = (line: Line) =>
      line.getLine().endPoint.x === line.getLine().startPoint.x
        ? 0
        : (line.getLine().endPoint.y - line.getLine().startPoint.y) /
          (line.getLine().endPoint.x - line.getLine().startPoint.x);

    const getB = (line: Line, k: number) =>
      line.getLine().startPoint.y - k * line.getLine().startPoint.x;

    const xIntersectionCheck = (line: Line, x: number) =>
      line.getLine().startPoint.x < x && line.getLine().endPoint.x > x;

    const kNewLine = getK(this.newLine);
    const bNewLine = getB(this.newLine, kNewLine);

    this.lines.forEach((line) => {
      const kLine = getK(line);
      if (kNewLine === kLine) return;

      const bLine = getB(line, kLine);

      const x = (bNewLine - bLine) / (kLine - kNewLine);
      const y = kLine * x + bLine;
      if (
        this.newLine &&
        xIntersectionCheck(line, x) &&
        xIntersectionCheck(this.newLine, x)
      ) {
        this.newPoints.push(new Point({ x, y }, this.ctx));
      }
    });
  }

  clickHandler({ x, y }: IPoint, button: number) {
    if (button === MouseKey.Right && this.newLine) return this.clearNewLine();
    if (button === MouseKey.Left && !this.newLine) {
      return this.createNewLine({
        x: x - this.offset.x,
        y: y - this.offset.y
      });
    }
    if (button === MouseKey.Left && this.newLine) return this.addLine();
  }

  collapse() {
    this.removePoints();
    this.removeNewPoints();
    this.lines.forEach((line) => line.setDelta());
    const startTimeAnimate = Date.now();
    let lastTimeAnimate = startTimeAnimate;
    let deltaTime = 0;

    const setDeltaTime = () => {
      const time = Date.now();
      deltaTime = time - lastTimeAnimate;
      lastTimeAnimate = time;
    };

    const isAnimationEnd = () =>
      lastTimeAnimate - startTimeAnimate >= AnimationTime;

    const endAnimation = () => {
      this.lines = [];
    };

    const updateAnimate = () => {
      setDeltaTime();

      this.clearCanvas();

      if (isAnimationEnd()) return endAnimation();

      this.lines.forEach((line) => {
        line.collapseUpdate(deltaTime);
        line.drawLine();
      });

      return requestAnimationFrame(updateAnimate);
    };

    return updateAnimate();
  }
}

export { Canvas };

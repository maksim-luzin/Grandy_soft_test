/* eslint-disable arrow-spacing */
import { useRef, MouseEvent, useEffect, useState } from 'react';
import { Canvas } from '../../helpers';

import styles from './styles.module.scss';

const CanvasPage = (): any => {
  const [canvas, setCanvas] = useState<Canvas | undefined>(undefined);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const contextMenuNativeHandler = (e: Event) => {
    e.preventDefault();
  };

  useEffect(() => {
    const isContext = canvasRef.current !== null;

    if (isContext) {
      canvasRef.current.addEventListener(
        'contextmenu',
        contextMenuNativeHandler
      );
    }

    setCanvas(
      isContext ? new Canvas(canvasRef.current as HTMLCanvasElement) : undefined
    );
  }, [canvasRef]);

  const clickHandler = ({ clientX, clientY, button }: MouseEvent) => {
    canvas?.clickHandler({ x: clientX, y: clientY }, button);
  };

  const contextMenuHandler = () => {
    canvas?.clearNewLine();
  };

  const moveHandler = ({ clientX, clientY }: MouseEvent) => {
    canvas?.updateNewLine({ x: clientX, y: clientY });
  };

  const collapseLinesHandler = () => {
    canvas?.collapse();
  };

  return (
    <div className={styles.page}>
      <canvas
        className={styles.canvas}
        onClick={clickHandler}
        onMouseMove={moveHandler}
        onContextMenu={contextMenuHandler}
        ref={canvasRef}
      />
      <button className={styles.collapse} onClick={collapseLinesHandler}>
        Collapse lines
      </button>
    </div>
  );
};

export { CanvasPage };

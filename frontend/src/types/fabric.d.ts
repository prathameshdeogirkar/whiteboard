declare module "fabric" {
  export namespace fabric {
    type CanvasObject = Record<string, unknown>;

    class Canvas {
      constructor(element: HTMLCanvasElement, options?: Record<string, unknown>);

      backgroundColor: string;
      freeDrawingBrush: {
        width: number;
        color: string;
      };

      clear(): void;
      dispose(): void;
      loadFromJSON(json: string | CanvasObject, callback?: () => void): void;
      on(eventName: string, callback: (...args: unknown[]) => void): void;
      renderAll(): void;
      toDataURL(options?: Record<string, unknown>): string;
      toJSON(): CanvasObject;
    }
  }

  export const fabric: {
    Canvas: typeof fabric.Canvas;
  };
}

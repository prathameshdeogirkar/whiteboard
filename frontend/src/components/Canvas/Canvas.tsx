import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import socket from "../../services/socket";

type CanvasProps = {
  color: string;
  brushSize: number;
  sessionId: string;
  setCanvasInstance: (canvas: fabric.Canvas) => void;
};

const Canvas = ({
  color,
  brushSize,
  sessionId,
  setCanvasInstance,
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 1200,
      height: 700,
      backgroundColor: "#ffffff",
      isDrawingMode: true,
    });

    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = "#000000";

    fabricRef.current = canvas;

    setCanvasInstance(canvas);

    // Send drawing to other users
    canvas.on("path:created", () => {
      socket.emit("drawing", {
        roomId: sessionId,
        canvasData: canvas.toJSON(),
      });
    });

    // Receive drawing from other users
    socket.on("drawing", (canvasData) => {
      canvas.loadFromJSON(canvasData, () => {
        canvas.renderAll();
      });
    });

    return () => {
      socket.off("drawing");
      canvas.dispose();
    };
  }, [sessionId, setCanvasInstance]);

  useEffect(() => {
    if (!fabricRef.current) return;

    fabricRef.current.freeDrawingBrush.width = brushSize;
    fabricRef.current.freeDrawingBrush.color = color;
  }, [color, brushSize]);

  return (
    <canvas
      className="whiteboard-canvas"
      ref={canvasRef}
    />
  );
};

export default Canvas;

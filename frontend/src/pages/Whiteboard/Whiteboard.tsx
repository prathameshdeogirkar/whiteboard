import { useCallback, useRef, useState, useEffect } from "react";
import { fabric } from "fabric";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";

import socket from "../../services/socket";

import Canvas from "../../components/Canvas/Canvas";
import Toolbar from "../../components/Toolbar/Toolbar";
import UserNavbar from "../../components/Navbar/UserNavbar";

import type { Cursor } from "../../types/cursor";
const Whiteboard = () => {
  const { sessionId } = useParams();

  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

  const [, setCursors] = useState<Cursor[]>([]);

  const canvasRef = useRef<fabric.Canvas | null>(null);

  const history = useRef<string[]>([]);
  const historyIndex = useRef(-1);

  const setCanvasInstance = useCallback((canvas: fabric.Canvas) => {
    canvasRef.current = canvas;

    history.current.push(
      JSON.stringify(canvas.toJSON())
    );

    historyIndex.current = 0;

    canvas.on("path:created", () => {
      const currentState = JSON.stringify(
        canvas.toJSON()
      );

      history.current = history.current.slice(
        0,
        historyIndex.current + 1
      );

      history.current.push(currentState);

      historyIndex.current++;
    });
  }, []);

  const undo = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    if (historyIndex.current <= 0) return;

    historyIndex.current--;

    canvas.loadFromJSON(
      history.current[historyIndex.current],
      () => {
        canvas.renderAll();
      }
    );
  };

  const redo = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    if (
      historyIndex.current >=
      history.current.length - 1
    ) {
      return;
    }

    historyIndex.current++;

    canvas.loadFromJSON(
      history.current[historyIndex.current],
      () => {
        canvas.renderAll();
      }
    );
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.clear();

    canvas.backgroundColor = "#ffffff";

    canvas.renderAll();

    const currentState = JSON.stringify(
      canvas.toJSON()
    );

    history.current.push(currentState);

    historyIndex.current++;
  };

  const saveImage = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: "png",
    });

    const link = document.createElement("a");

    link.href = dataURL;

    link.download = `whiteboard-${Date.now()}.png`;

    link.click();
  };

  const savePDF = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const imageData = canvas.toDataURL({
      format: "png",
    });

    const pdf = new jsPDF("landscape");

    pdf.addImage(
      imageData,
      "PNG",
      10,
      10,
      270,
      150
    );

    pdf.save(
      `whiteboard-${Date.now()}.pdf`
    );
  };

  useEffect(() => {
    socket.connect();

    socket.emit(
      "join-room",
      sessionId || "default"
    );

    socket.on(
      "cursor-move",
      (cursor: Cursor) => {
        setCursors((prev) => {
          const filtered = prev.filter(
            (c) =>
              c.userId !== cursor.userId
          );

          return [...filtered, cursor];
        });
      }
    );

    return () => {
      socket.off("cursor-move");
      socket.disconnect();
    };
  }, [sessionId]);

  useEffect(() => {
    const handleMouseMove = (
      e: MouseEvent
    ) => {
      socket.emit("cursor-move", {
        roomId:
          sessionId || "default",
        cursor: {
          x: e.clientX,
          y: e.clientY,
          userId:
            socket.id || "unknown",
        },
      });
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, [sessionId]);

  return (
    <div className="app-page">
      <UserNavbar />

      <Toolbar
        color={color}
        setColor={setColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        undo={undo}
        redo={redo}
        clearCanvas={clearCanvas}
        saveImage={saveImage}
        savePDF={savePDF}
      />

      <main className="container-fluid px-3 px-md-4 py-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
          <div>
            <h1 className="h5 mb-1">Whiteboard</h1>
            <div className="text-muted small">Session: {sessionId}</div>
          </div>
        </div>

        <section className="whiteboard-canvas-area bg-white border rounded shadow-sm p-2">
          <Canvas
            color={color}
            brushSize={brushSize}
            sessionId={
              sessionId || "default"
            }
            setCanvasInstance={
              setCanvasInstance
            }
          />
        </section>
      </main>
    </div>
  );
};

export default Whiteboard;

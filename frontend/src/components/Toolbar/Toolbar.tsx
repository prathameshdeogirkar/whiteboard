type ToolbarProps = {
  color: string;
  setColor: (color: string) => void;

  brushSize: number;
  setBrushSize: (size: number) => void;

  undo: () => void;
  redo: () => void;
  clearCanvas: () => void;

  saveImage: () => void;
  savePDF: () => void;
};

const Toolbar = ({
  color,
  setColor,
  brushSize,
  setBrushSize,
  undo,
  redo,
  clearCanvas,
  saveImage,
  savePDF,
}: ToolbarProps) => {
  return (
    <div className="toolbar bg-white border-bottom px-3 px-md-4 py-3">
      <div className="d-flex flex-wrap align-items-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <label className="form-label small text-muted mb-0" htmlFor="brush-color">
            Color
          </label>

          <input
            id="brush-color"
            className="form-control form-control-color"
            type="color"
            value={color}
            title="Choose brush color"
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="brush-control d-flex align-items-center gap-2">
          <label className="form-label small text-muted mb-0" htmlFor="brush-size">
            Brush
          </label>

          <input
            id="brush-size"
            className="form-range"
            type="range"
            min="1"
            max="30"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
          />

          <span className="small text-muted toolbar-value">{brushSize}px</span>
        </div>

        <div className="vr d-none d-lg-block" />

        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={undo}>
            Undo
          </button>

          <button className="btn btn-outline-secondary btn-sm" onClick={redo}>
            Redo
          </button>

          <button className="btn btn-outline-danger btn-sm" onClick={clearCanvas}>
            Clear
          </button>
        </div>

        <div className="d-flex flex-wrap gap-2 ms-lg-auto">
          <button className="btn btn-primary btn-sm" onClick={saveImage}>
            Save PNG
          </button>

          <button className="btn btn-outline-primary btn-sm" onClick={savePDF}>
            Save PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;

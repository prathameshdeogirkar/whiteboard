import type { Cursor } from "../../types/cursor";
type Props = {
  cursors: Cursor[];
};

const CursorLayer = ({
  cursors,
}: Props) => {
  return (
    <>
      {cursors.map((cursor) => (
        <div
          key={cursor.userId}
          style={{
            position: "fixed",
            left: cursor.x,
            top: cursor.y,
            pointerEvents: "none",
            zIndex: 9999,
            fontSize: "24px",
          }}
        >
          🖱️
        </div>
      ))}
    </>
  );
};

export default CursorLayer;
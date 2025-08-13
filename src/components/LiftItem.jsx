import { useState } from "react";
import LiftDrawer from "./LiftModal"; 

export default function LiftItem({ lift, refetchLifts }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="lift">
        <div className="meta">
          <p className="name">{lift.name}</p>
          <p className="lbl">Elevation Gain</p>
          <p className="val">{lift.elevationGain} m</p>
        </div>

        <div className="stat">
          <div className="lbl">Status</div>
          <div className="val">{lift.status}</div>
        </div>

        <button
          className="icon-btn"
          onClick={() => setOpen(true)}
          aria-label="Open form">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
        </button>
      </div>

      {open && (
        <LiftDrawer
          lift={lift}
          onClose={() => setOpen(false)}
          onUpdate={refetchLifts}
        />
      )}
    </>
  );
}

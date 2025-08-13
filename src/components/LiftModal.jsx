import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SET_LIFT_STATUS } from "../graphql/mutations";

export default function LiftModal({ lift, onClose, onUpdate }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { status: lift.status },
  });
  const [setStatus, { loading, error }] = useMutation(SET_LIFT_STATUS);

  const onSubmit = async (data) => {
    await setStatus({ variables: { id: lift.id, status: data.status } });
    onUpdate();
    onClose();
  };

  return (
    <div className="drawer" onClick={onClose}>
      {/* panel nie zamyka się po kliknięciu w niego */}
      <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h4 className="drawer-title">{lift.name}</h4>
          <div className="drawer-sub">
            Elevation Gain: {lift.elevationGain} m
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="drawer-body">
          <div className="field">
            <label className="label">Update Status</label>
            <select {...register("status")} className="select-wide">
              <option value="OPEN">OPEN</option>
              <option value="CLOSED">CLOSED</option>
              <option value="HOLD">HOLD</option>
            </select>
          </div>

          <div className="field">
            <label className="label">Trail Access List</label>
            <div className="trails">
              {lift.trailAccess?.length ? (
                lift.trailAccess.map((t) => (
                  <div key={t.id} className="trow">
                    <span className="tname">{t.name}</span>
                    <span className="tstatus">{t.status ?? ""}</span>
                  </div>
                ))
              ) : (
                <div className="trow">
                  <span className="tname">No trails listed</span>
                  <span />
                </div>
              )}
            </div>
          </div>

          {error && (
            <p style={{ color: "#ef4444", fontSize: 13 }}>
              Failed to update status.
            </p>
          )}
          {loading && (
            <p style={{ color: "#6b7280", fontSize: 13 }}>Saving...</p>
          )}
        </form>

        <div className="drawer-actions">
          <button type="button" className="btn btn-cancel" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" form="__noop" style={{ display: "none" }} />
          <button
            onClick={() =>
              document.querySelector(".drawer-body form")?.requestSubmit?.()
            }
            className="btn btn-save"
            disabled={loading}>
            SAVE
          </button>
        </div>
      </aside>
    </div>
  );
}

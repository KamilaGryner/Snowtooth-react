import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SET_LIFT_STATUS } from "../graphql/mutations";
import { GET_LIFTS } from "../graphql/queries"; // (opcjonalnie do refetchQueries)

export default function LiftModal({ lift, onClose, onUpdate }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { status: lift.status },
  });

  const [setStatus, { loading, error }] = useMutation(SET_LIFT_STATUS, {
    // to zapewni odświeżenie listy nawet bez onUpdate:
    refetchQueries: [{ query: GET_LIFTS }],
    awaitRefetchQueries: true,
  });

  const onSubmit = async (data) => {
    try {
      await setStatus({ variables: { id: lift.id, status: data.status } });
      onUpdate?.(); // jeśli przekazujesz refetch z listy
      onClose();
    } catch {}
  };

  return (
    <div className="drawer" onClick={onClose}>
      <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h4 className="drawer-title">{lift.name}</h4>
          <div className="drawer-sub">
            Elevation Gain: {lift.elevationGain} m
          </div>
        </div>

        {/* PRZENOSIMY ACTIONS DO FORM */}
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

          {/* <<< TERAZ W ŚRODKU FORM >>> */}
          <div className="drawer-actions">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              CANCEL
            </button>
            <button type="submit" className="btn btn-save" disabled={loading}>
              {loading ? "SAVING..." : "SAVE"}
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}

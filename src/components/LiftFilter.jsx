export default function LiftFilter({ onChange }) {
  return (
    <select className="select" onChange={(e) => onChange(e.target.value)}>
      <option value="ALL">ALL</option>
      <option value="OPEN">OPEN</option>
      <option value="CLOSED">CLOSED</option>
      <option value="HOLD">HOLD</option>
    </select>
  );
}

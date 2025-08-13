import { useQuery } from "@apollo/client";
import { GET_LIFTS } from "../graphql/queries";
import LiftItem from "./LiftItem";
import LiftFilter from "./LiftFilter";
import { useState } from "react";

export default function LiftList() {
  const { loading, error, data, refetch } = useQuery(GET_LIFTS);
  const [statusFilter, setStatusFilter] = useState("ALL");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const filtered = data.allLifts.filter((l) =>
    statusFilter === "ALL" ? true : l.status === statusFilter
  );

  return (
    <div className="layout">
      <div className="panel">
        <div className="topbar">
          <div />
          <h3 className="heading">LIFTS LIST</h3>
          <div /> 
        </div>
        <div className="list-wrap">
          <div className="list">
            {filtered.map((lift) => (
              <LiftItem key={lift.id} lift={lift} refetchLifts={refetch} />
            ))}
          </div>
        </div>
      </div>

      <aside className="sidebar">
        <div className="sidebar-card">
          <div className="sidebar-title">Filter per Status</div>
          <LiftFilter onChange={setStatusFilter} />
        </div>
      </aside>
    </div>
  );
}

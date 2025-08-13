import { gql } from "@apollo/client";

export const SET_LIFT_STATUS = gql`
  mutation SetLiftStatus($id: ID!, $status: LiftStatus!) {
    setLiftStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;
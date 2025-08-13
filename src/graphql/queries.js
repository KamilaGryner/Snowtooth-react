import { gql } from "@apollo/client";

export const GET_LIFTS = gql`
  query GetLifts {
    allLifts {
      id
      name
      elevationGain
      status
      trailAccess {
        id
        name
      }
    }
  }
`;
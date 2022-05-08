import gql from "graphql-tag";
import { useQuery } from "react-query";
import { useSignUpMutation } from "generated/generates";
// const useGet: MutationSignInArgs = {
//   user: {},
// };

// gql`
//   query Posts {
//     posts {
//       id
//       title
//       author {
//         id
//         firstName
//         lastName
//       }
//     }
//   }
// `;

const Posts = () => {
  const {} = useSignUpMutation({ endpoint: "", fetchParams: {} }, {});
  // const { data } = MutationSignInArgs();
  // `data` is typed!
  // ...
};

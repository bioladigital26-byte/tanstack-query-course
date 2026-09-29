import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi, type User } from "../../api/usersApi";
import { USERS_QUERY_KEY } from "./usersQuery";

// export function useCreateUserMutation() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: usersApi.createUser,
//     onSuccess: (data) => {
//       //   queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
//       // не забываем про иммутабельность! Данные менять нельзя, только возвращать новые
//       queryClient.setQueryData(USERS_QUERY_KEY, (oldData: User[]) => [
//         data,
//         ...oldData,
//       ]);
//     },
//     onError: () => {
//       console.log("User creation failed");
//     },
//     onSettled: () => {
//       // вызывается всегда в конце
//       console.log("User creation settled");
//     },
//   });
// }

// Optimistic update
export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.createUser,
    mutationKey: ["createUser"],
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });
      const previousUsers = queryClient.getQueryData<User[]>(USERS_QUERY_KEY);
     
      queryClient.setQueryData(USERS_QUERY_KEY, (oldData: User[]) => [
        data,
        ...oldData,
      ]);

      return { previousUsers };
    },
    onSuccess: (data, _, context) => {
      queryClient.setQueryData(USERS_QUERY_KEY, [data, ...(context?.previousUsers || [])] );
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(USERS_QUERY_KEY, context?.previousUsers);
    },
    onSettled: () => {
      // вызывается всегда в конце
      console.log("User creation settled");
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.deleteUser,
    onSuccess: (_, idParam) => {
      queryClient.setQueryData(USERS_QUERY_KEY, (oldData: User[]) =>
        oldData.filter((user) => user.id !== idParam)
      );
    },
    onError: () => {
      console.log("User deletion failed");
    },
    onSettled: () => {
      console.log("User deletion settled");
    },
  });
}

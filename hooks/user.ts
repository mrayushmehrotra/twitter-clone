"use client";
import { graphQLClient } from "@/app/clients/api";
import { getCurrentUserQuery, getUserByIdQuery } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: () => graphQLClient.request(getCurrentUserQuery),
  });

  return { ...query, user: query.data?.getCurrentUser };
};

export const useGetUserById = (id?: string) => {
  const query = useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      id
        ? graphQLClient.request(getUserByIdQuery, { getUserByIdId: id })
        : Promise.reject("No ID provided"),
    enabled: Boolean(id), // Only run query if ID exists
  });

  return { ...query, user: query.data?.getUserById };
};

import { graphQLClient } from "@/app/clients/api";
import { CreateTweetData } from "@/gql/graphql";
import { createTweetMutation } from "@/graphql/mutation/tweet";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  try {
    const mutation = useMutation({
      mutationFn: (payload: CreateTweetData) =>
        graphQLClient.request(createTweetMutation, { payload }),

      onMutate: () => toast.loading("Creating tweet ", { id: "1" }),
      // TODO: Fix this typeScript Error
      onError: (error) => console.log(error),

      onSuccess: async () => {
        //@ts-except-error
        await queryClient.invalidateQueries(["all-tweets"]);
        toast.success("Created Success", { id: "1" });
      },
    });
    return mutation;
  } catch (error) {
    console.log(error);
  }
};

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ["all-tweets"],
    queryFn: () => graphQLClient.request(getAllTweetsQuery),
  });
  return { ...query, tweets: query.data?.getAllTweets };
};

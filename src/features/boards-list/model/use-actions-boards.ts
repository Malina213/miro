import { rqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { useQueryClient } from "@tanstack/react-query";
import { startTransition, useOptimistic } from "react";
import { href, useNavigate } from "react-router-dom";

export const useActionsBoards = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useOptimistic<Record<string, boolean>>({});

  const createBoardMutation = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards"),
      );
    },
    onSuccess: (data) => {
      navigate(href(ROUTES.BOARD, { boardId: data.id }));
    },
  });

  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards"),
        );
      },
    },
  );

  const updateFavoriteMutation = rqClient.useMutation(
    "put",
    "/boards/{boardId}/favorite",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards"),
        );
      },
    },
  );

  return {
    create: {
      createBoard: () => createBoardMutation.mutate({}),
      isPending: createBoardMutation.isPending,
    },
    delete: {
      deleteBoard: (boardId: string) =>
        deleteBoardMutation.mutate({
          params: { path: { boardId } },
        }),
      isPending: (boardId: string) =>
        deleteBoardMutation.isPending &&
        deleteBoardMutation.variables?.params?.path?.boardId === boardId,
    },
    updateFavorite: {
      handleToggle: (board: { id: string; isFavorite: boolean }) => {
        startTransition(async () => {
          setFavorite((prev) => ({
            ...prev,
            [board.id]: !board.isFavorite,
          }));
          await updateFavoriteMutation.mutateAsync({
            params: { path: { boardId: board.id } },
            body: { isFavorite: !board.isFavorite },
          });
        });
      },
      isOptimisticFavorite: (board: { id: string; isFavorite: boolean }) =>
        favorite[board.id] ?? board.isFavorite,
    },
  };
};

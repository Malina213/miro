import { ApiSchemas } from "@/shared/api/schema";
import { BoardsListCard } from "./board-list-card";
import { Button } from "@/shared/ui/kit/button";
import { useActionsBoards } from "../model/use-actions-boards";
import { BoardsFavoriteToggle } from "./board-favorite-toggle";
import { BoardListItem } from "./board-list-item";

type BoardsListProps = {
  boards: ApiSchemas["Board"][];
  viewMode: "grid" | "list";
};
const list = 'flex flex-col gap-2';
const grid = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
export const BoardsList = ({ boards, viewMode }: BoardsListProps) => {
   const {updateFavorite, delete: deleteActions } = useActionsBoards();
  return (
    <ul className={viewMode === 'grid' ? grid : list}>
      {boards.map((board) => (
        <li key={board.id}>
          {viewMode === 'list' ? (
            <BoardsListCard board={board} 
              rightActions={
                <BoardsFavoriteToggle
                  onToggle={() => updateFavorite.handleToggle(board)}
                  isFavorite={updateFavorite.isOptimisticFavorite(board)}
                  className="top-1 right-20"
                />
            }
              menuActions={
              <Button
                variant="destructive"
                className="w-full"
                disabled={deleteActions.isPending(board.id)}
                onClick={() => deleteActions.deleteBoard(board.id)}
              >
                Удалить
              </Button>
              } 
            />
            
          ) : (
           <BoardListItem
              board={board}
              showFavorite
              isFavorite={updateFavorite.isOptimisticFavorite(board)}
              onToggleFavorite={() => updateFavorite.handleToggle(board)}
              onDelete={() => deleteActions.deleteBoard(board.id)}
              deleteDisabled={deleteActions.isPending(board.id)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

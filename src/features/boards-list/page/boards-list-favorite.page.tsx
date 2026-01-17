import { useBoardsList } from "../model/use-boards-list";
import { useActionsBoards } from "../model/use-actions-boards";
import {
  BoardListContent,
  BoardsListLayout,
  BoardsListLayoutHeader,
} from "../ui/boards-list-layout";
import { ViewModeToggle } from "../ui/view-mode-toggle";
import { BoardsListCard } from "../ui/board-list-card";
import { BoardsFavoriteToggle } from "../ui/board-favorite-toggle";
import { Button } from "@/shared/ui/kit/button";
import { BoardListItem } from "../ui/board-list-item";
import { BoardsSidebar } from "../ui/board-list-sidebar";
import { useViewMode } from "@/shared/lib/hooks";

function BoardsListFavoritePage() {
  const {updateFavorite, delete: deleteActions } = useActionsBoards();
  const {changeViewMode, viewMode} = useViewMode()
  const {isPending, isFetchingNextPage, cursorRef, boards, hasNextPage } =
    useBoardsList({
      isFavorite: true,
    });

  return (
    <BoardsListLayout
      sidebar={<BoardsSidebar/>}
      header={
        <BoardsListLayoutHeader
          title={"Любимые доски"}
          description="Посмотри на то, что любишь"
          actions={
             <ViewModeToggle
              value={viewMode}
              onChange={(value) => changeViewMode(value)}
            />
          }
        />
      }
    >
       <BoardListContent
        isEmpty={boards.length === 0}
        isPending={isPending}
        isFetchingNextPage={isFetchingNextPage}
        cursorRef={cursorRef}
        hasNextPage={hasNextPage}
        mode={viewMode}
        renderList={() =>
          boards.map((board) => (
             <BoardsListCard 
              key={board.id} 
              board={board}   
              rightActions={
                <BoardsFavoriteToggle
                  onToggle={() => updateFavorite.handleToggle(board)}
                  isFavorite={updateFavorite.isOptimisticFavorite(board)}
                  className="top-1 right-20"
                />}
                menuActions={
                <Button
                  variant="destructive"
                  className="w-full"
                  disabled={deleteActions.isPending(board.id)}
                  onClick={() => deleteActions.deleteBoard(board.id)}
                >
                  Удалить
                </Button>} />
          ))
        }
        renderGrid={() =>
          boards.map((board) => (
            <BoardListItem 
              key={board.id} board={board} 
              isFavorite={updateFavorite.isOptimisticFavorite(board)}
              onToggleFavorite={() => updateFavorite.handleToggle(board)}
              onDelete={() => deleteActions.deleteBoard(board.id)}
              deleteDisabled={deleteActions.isPending(board.id)} 
            />
            
          ))
        }
      />
    </BoardsListLayout>
  );
}

export const Component = BoardsListFavoritePage;

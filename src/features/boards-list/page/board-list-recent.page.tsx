
import { useBoardsList } from "../model/use-boards-list";
import { useActionsBoards } from "../model/use-actions-boards";
import {
  BoardListContent,
  BoardsLayoutContentGroups,
  BoardsListLayout,
  BoardsListLayoutCards,
  BoardsListLayoutHeader,
  BoardsListLayoutList,
} from "../ui/boards-list-layout";
import { ViewModeToggle } from "../ui/view-mode-toggle";
import { BoardsListCard } from "../ui/board-list-card";
import { BoardsFavoriteToggle } from "../ui/board-favorite-toggle";
import { Button } from "@/shared/ui/kit/button";
import { BoardListItem } from "../ui/board-list-item";
import { useRecentGroups } from "../model/use-recent-groups";
import { ApiSchemas } from "@/shared/api/schema";
import { BoardsSidebar } from "../ui/board-list-sidebar";
import { useViewMode } from "@/shared/lib/hooks";

function BoardsListRecentPage() {
  const {changeViewMode, viewMode} = useViewMode()
  const {updateFavorite, delete: deleteActions } = useActionsBoards();
  const {isPending, isFetchingNextPage, cursorRef, boards, hasNextPage} = useBoardsList({sort:'lastOpenedAt'});
  const recentsGroups = useRecentGroups(boards);
    
  const renderCard = (board: ApiSchemas["Board"]) => {
    return (
      <li key={board.id}>
        <BoardsListCard
          board={board}
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
      </li> 
    );
  }
  const renderItem = (board: ApiSchemas["Board"]) => {
    return (
    <li key={board.id}>
      <BoardListItem
        key={board.id}
        board={board}
        isFavorite={updateFavorite.isOptimisticFavorite(board)}
        onToggleFavorite={() => updateFavorite.handleToggle(board)}
        onDelete={() => deleteActions.deleteBoard(board.id)}
        deleteDisabled={deleteActions.isPending(board.id)}
      />
    </li>
    );
  }

  const renderGroup = () => {
    if(viewMode === 'list'){
      return (<BoardsListLayoutList children={boards.map(renderCard)}></BoardsListLayoutList>)
    } 
    return (<BoardsListLayoutCards children={boards.map(renderItem)}></BoardsListLayoutCards>)
  }

  return (
    <BoardsListLayout
      sidebar={<BoardsSidebar/>}
      header={
        <BoardsListLayoutHeader
          title={"Недавние доски"}
          description="Посмотри, что делал на днях"
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
        mode={viewMode}>
        <BoardsLayoutContentGroups
            groups={recentsGroups.map((group) => ({
              title: group.title,
              items: renderGroup(), 
            }))}
        />
      </BoardListContent>
       

    </BoardsListLayout>
  );
}

export const Component = BoardsListRecentPage;

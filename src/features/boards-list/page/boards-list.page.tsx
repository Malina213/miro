import { Button } from "@/shared/ui/kit/button";
import { useBoardsList } from "../model/use-boards-list";
import { useBoardsFilters } from "../model/use-boards-filters";
import { useAppDispatch, useDebounceValue, useViewMode } from "@/shared/lib/hooks";
import { useActionsBoards } from "../model/use-actions-boards";
import {
  BoardListContent,
  BoardsListLayout,
  BoardsListLayoutFilters,
  BoardsListLayoutHeader,
} from "../ui/boards-list-layout";
import { ViewMode, ViewModeToggle } from "../ui/view-mode-toggle";
import { BoardsSortSelect } from "../ui/board-sort-select";
import { BoardsSearchInput } from "../ui/board-search-input";
import { BoardsListCard } from "../ui/board-list-card";
import { BoardListItem } from "../ui/board-list-item";
import { BoardsFavoriteToggle } from "../ui/board-favorite-toggle";
import { BoardsSidebar } from "../ui/board-list-sidebar";
import { TemplatesGallery, TemplatesModal } from "@/features/boards-templates/index";
import { openTemplatesModal } from "@/shared/model/slices/templatesModalSlice";

function BoardsListPage() {
  const boardsFilters = useBoardsFilters();
  const boardActions = useActionsBoards();
  const {changeViewMode, viewMode} = useViewMode()

  const {updateFavorite, delete: deleteActions } = useActionsBoards();
  const {isPending, isFetchingNextPage, cursorRef, boards, hasNextPage } =
    useBoardsList({
      sort: boardsFilters.sort,
      search: useDebounceValue(boardsFilters.search, 700),
    });
  const dispatch = useAppDispatch()
 
  return (
    <>
      <TemplatesModal/>
      <BoardsListLayout
        templates={<TemplatesGallery/>}
        sidebar={<BoardsSidebar/>}
        header={
        <BoardsListLayoutHeader
          title={"Доски"}
          description="Здесь вы можете просмотривать и управлять своими досками"
          actions={
            <>
             <Button
              variant={"outline"}
              onClick={() => dispatch(openTemplatesModal())}
            >
              Добавить шаблон
            </Button>
             <Button
              disabled={boardActions.create.isPending}
              onClick={boardActions.create.createBoard}
            >
              Создать доску
            </Button>
            </>
           
          }
        />
      }
      filters={
        <BoardsListLayoutFilters
          sort={
            <BoardsSortSelect
              value={boardsFilters.sort}
              onValueChange={(value) => boardsFilters.setSort(value)}
            />
          }
          search={
            <BoardsSearchInput
              value={boardsFilters.search}
              onChange={(value) => boardsFilters.setSearch(value)}
            />
          }
          actions={
            <ViewModeToggle
              value={viewMode}
              onChange={(value) => {
                changeViewMode(value);
              }}
            />
          }
        ></BoardsListLayoutFilters>
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
    </>
  );
}

export const Component = BoardsListPage;

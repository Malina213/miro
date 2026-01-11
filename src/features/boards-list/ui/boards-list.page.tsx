import { Button } from "@/shared/ui/kit/button";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/kit/tabs";
import { useBoardsList } from "../model/use-boards-list";
import { useBoardsFilters } from "../model/use-boards-filters";
import { useDebounceValue } from "@/shared/lib/hooks";
import { useActionsBoards } from "../model/use-actions-boards";
import {
  BoardListContent,
  BoardsListLayout,
  BoardsListLayoutFilters,
  BoardsListLayoutHeader,
} from "./boards-list-layout";
import { ViewMode, ViewModeToggle } from "./view-mode-toggle";
import { useState } from "react";
import { BoardsSortSelect } from "./board-sort-select";
import { BoardsSearchInput } from "./board-search-input";
import { BoardsList } from "./board-list-list";
import { BoardCreateForm } from "./board-list-create-form";

function BoardsListPage() {
  const boardsFilters = useBoardsFilters();
  const boardActions = useActionsBoards();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const { isPending, isFetchingNextPage, cursorRef, boards, hasNextPage } =
    useBoardsList({
      sort: boardsFilters.sort,
      search: useDebounceValue(boardsFilters.search, 700),
    });

  return (
    <BoardsListLayout
      header={
        <BoardsListLayoutHeader
          title={"Доски"}
          description="Здесь вы можете просмотривать и управлять своими досками"
          actions={
            <Button
              disabled={boardActions.create.isPending}
              onClick={boardActions.create.createBoard}
            >
              Создать доску
            </Button>
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
          filters={
            <BoardsSearchInput
              value={boardsFilters.search}
              onChange={(value) => boardsFilters.setSearch(value)}
            />
          }
          actions={
            <ViewModeToggle
              value={viewMode}
              onChange={(value) => setViewMode(value)}
            />
          }
        ></BoardsListLayoutFilters>
      }
    >
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Все доски</TabsTrigger>
          <TabsTrigger value="favorites">Избранные</TabsTrigger>
        </TabsList>
      </Tabs>
      <BoardCreateForm />
      <BoardListContent
        isPending={isPending}
        isFetchingNextPage={isFetchingNextPage}
        cursorRef={cursorRef}
        hasNextPage={hasNextPage}
      >
        <BoardsList boards={boards} />
      </BoardListContent>
    </BoardsListLayout>
  );
}

export const Component = BoardsListPage;

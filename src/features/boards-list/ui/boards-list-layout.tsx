import React from "react";
import { ViewMode } from "./view-mode-toggle";

export function BoardsListLayout({
  header,
  children,
  filters,
  sidebar,
  templates,
}: {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children?: React.ReactNode;
  filters?: React.ReactNode;
  templates?: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-6">
      <div className="flex gap-4">
         {sidebar}
      <div className="flex-1">
        {templates && 
          <div className="mb-4 rounded-md bg-gray-100 p-4">{templates}</div>
        }
        {header}
        {filters}
        {children}
      </div>
      </div>
    </div>
  );
}

export function BoardsListLayoutHeader({
  title,
  actions,
  description,
}: {
  title: string;
  actions?: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-gray-500">{description}</p>}
      </div>
      <div className="flex gap-2">{actions}</div>
    </div>
  );
}
export function BoardsListLayoutFilters({
  actions,
  sort,
  search,
}: {
  actions?: React.ReactNode;
  sort?: React.ReactNode;
  search?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      {search && (
        <div className="flex items-center gap-2">
          <span className="w-[100px]"> Search by</span> {search}
        </div>
      )}
      {sort && (
        <div className="flex items-center gap-2">
          <span className="w-[100px]"> Sort by</span> {sort}
        </div>
      )}
      {actions && <div className="ml-auto">{actions}</div>}
    </div>
  );
}

export const BoardListContent = ({
  isEmpty,
  isPending,
  cursorRef,
  hasNextPage,
  isFetchingNextPage,
  mode,
  renderList,
  renderGrid,
  children,
}: {
  isEmpty?: boolean;
  isPending?: boolean;
  children?: React.ReactNode;
  cursorRef?: React.RefCallback<HTMLDivElement>;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  mode: ViewMode;
  renderList?: () => React.ReactNode;
  renderGrid?: () => React.ReactNode;
}) => {
  return (
    <div>
      {isPending && <div className="text-center py-10">Загрузка...</div>}

      {mode === "list" && renderList && (
        <BoardsListLayoutList>{renderList?.()}</BoardsListLayoutList>
      )}
      {mode === "grid" && renderGrid && (
        <BoardsListLayoutCards>{renderGrid?.()}</BoardsListLayoutCards>
      )}
      {!isPending && children}

      {isEmpty && isPending && (
        <div className="text-center py-10">Доски не найдены</div>
      )}

      {hasNextPage && (
        <div ref={cursorRef} className="text-center py-8">
          {isFetchingNextPage && "Загрузка дополнительных досок..."}
        </div>
      )}
    </div>
  );
};

export function BoardsListLayoutCards({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </ul>
  );
}
export function BoardsListLayoutList({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ul className="flex flex-col gap-2">{children}</ul>;
}
export function BoardsLayoutContentGroups({
  groups,
}: {
  groups: {
    title: string;
    items: React.ReactNode;
  }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {groups.map((group) => (
        <div key={group.title}>
          <div className="text-lg font-bold mb-2">{group.title}</div>
          {group.items}
        </div>
      ))}
    </div>
  );
}
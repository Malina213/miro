import React from "react";

export function BoardsListLayout({
  header,
  children,
  filters,
}: {
  header: React.ReactNode;
  children?: React.ReactNode;
  filters?: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-6">
      {header}
      {filters}
      {children}
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
      {actions}
    </div>
  );
}
export function BoardsListLayoutFilters({
  actions,
  sort,
  filters,
}: {
  actions?: React.ReactNode;
  sort?: React.ReactNode;
  filters?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      {filters && (
        <div className="flex items-center gap-2">
          <span> Filter by</span> {filters}
        </div>
      )}
      {sort && (
        <div className="flex items-center gap-2">
          <span> Sort by</span> {sort}
        </div>
      )}
      {actions && <div className="ml-auto">{actions}</div>}
    </div>
  );
}

export const BoardListContent = ({
  children,
  isEmpty,
  isPending,
  cursorRef,
  hasNextPage,
  isFetchingNextPage,
}: {
  children: React.ReactNode;
  isEmpty?: boolean;
  isPending?: boolean;
  cursorRef?: React.RefCallback<HTMLDivElement>;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}) => {
  return (
    <div>
      {isPending && <div className="text-center py-10">Загрузка...</div>}

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

import { ApiSchemas } from "@/shared/api/schema";
import { BoardItem } from "./board-list-item";

type BoardsListProps = {
  boards: ApiSchemas["Board"][];
};

export const BoardsList = ({ boards }: BoardsListProps) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {boards.map((board) => (
        <li key={board.id}>
          <BoardItem board={board} />
        </li>
      ))}
    </ul>
  );
};

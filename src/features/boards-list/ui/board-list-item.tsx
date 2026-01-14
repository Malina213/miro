import { ROUTES } from "@/shared/model/routes";
import { generatePath, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/ui/kit/card";
import { Button } from "@/shared/ui/kit/button";
import { ApiSchemas } from "@/shared/api/schema";
import { BoardsFavoriteToggle } from "./board-favorite-toggle";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

export const BoardListItem = ({
  board,
  showFavorite = true,
  isFavorite,
  onToggleFavorite,
  onDelete,
  deleteDisabled,
}: {
  board: ApiSchemas["Board"];
  showFavorite?: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onDelete: () => void;
  deleteDisabled: boolean;
}) => {
  return (
    <Card className="relative">
      {showFavorite && (
        <BoardsFavoriteToggle
          onToggle={onToggleFavorite}
          isFavorite={isFavorite}
        />
      )}
      <CardHeader>
        <div className="flex flex-col gap-2">
          <Button asChild variant="link" className="text-left justify-start h-auto p-0">
            <Link to={generatePath(ROUTES.BOARD, { boardId: board.id })}>
              <h2 className="text-xl font-medium truncate">{board.name}</h2>
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-500">
          Создано: {formatDate(board.createdAt)}
        </div>
        <div className="text-sm text-gray-500">
          Последнее открытие: {formatDate(board.lastOpenedAt)}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="destructive"
          disabled={deleteDisabled}
          onClick={onDelete}
        >
          Удалить
        </Button>
      </CardFooter>
    </Card>
  );
};

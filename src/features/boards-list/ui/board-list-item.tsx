import { ROUTES } from "@/shared/model/routes";
import { generatePath, Link } from "react-router-dom";
import { useActionsBoards } from "../model/use-actions-boards";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/ui/kit/card";
import { Switch } from "@/shared/ui/kit/switch";
import { Button } from "@/shared/ui/kit/button";
import { ApiSchemas } from "@/shared/api/schema";

function formatDate(item: string) {
  return new Date(item).toLocaleDateString();
}

export const BoardItem = ({
  board,
  showFavorite = true,
}: {
  board: ApiSchemas["Board"];
  showFavorite?: boolean;
}) => {
  const { updateFavorite, delete: deleteActions } = useActionsBoards();

  return (
    <Card className="relative overflow-visible">
      {showFavorite && (
        <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
          <Switch
            checked={updateFavorite.isOptimisticFavorite(board)}
            onCheckedChange={() => updateFavorite.handleToggle(board)}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex flex-col gap-2">
          <Button asChild variant="link" className="text-left h-auto p-0">
            <Link to={generatePath(ROUTES.BOARD, { boardId: board.id })}>
              <h2 className="text-xl font-medium">{board.name}</h2>
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
          disabled={deleteActions.isPending(board.id)}
          onClick={() => deleteActions.deleteBoard(board.id)}
        >
          Удалить
        </Button>
      </CardFooter>
    </Card>
  );
};

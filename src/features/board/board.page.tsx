import { PathParams, ROUTES } from "@/shared/model/routes";
import { useParams } from "react-router-dom";

function BoardPage() {
  const { boardId } = useParams<PathParams[typeof ROUTES.BOARD]>();
  return <div>{boardId}</div>;
}

export const Component = BoardPage;

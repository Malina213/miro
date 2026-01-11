import { Label } from "@radix-ui/react-label";
import { useActionsBoards } from "../model/use-actions-boards";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";
import { useId } from "react";

export const BoardCreateForm = () => {
  const { create } = useActionsBoards();
  const id = useId();

  return (
    <div className="mb-8">
      <form
        className="flex gap-4 items-end"
        onSubmit={(e) => {
          e.preventDefault();
          create.createBoard();
          e.currentTarget.reset();
        }}
      >
        <div className="flex-grow">
          <Label htmlFor={id}>Название новой доски</Label>
          <Input id={id} name="name" placeholder="Введите название..." />
        </div>
        <Button type="submit" disabled={create.isPending}>
          {create.isPending ? "Создание..." : "Создать доску"}
        </Button>
      </form>
    </div>
  );
};

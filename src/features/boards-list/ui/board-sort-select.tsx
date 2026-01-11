import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select";

export type BoardsSortOption =
  | "createdAt"
  | "updatedAt"
  | "lastOpenedAt"
  | "name";

interface BoardsSortSelectProps {
  value: BoardsSortOption;
  onValueChange: (value: BoardsSortOption) => void;
}
const sortLabels: Record<BoardsSortOption, string> = {
  lastOpenedAt: "По дате открытия",
  createdAt: "По дате создания",
  updatedAt: "По дате обновления",
  name: "По имени",
};
export function BoardsSortSelect({
  value,
  onValueChange,
}: BoardsSortSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id="sort" className="w-full">
        <SelectValue placeholder="Сортировка" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(sortLabels).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

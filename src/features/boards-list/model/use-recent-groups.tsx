import { ApiSchemas } from "@/shared/api/schema";

type BoardsGroup = {
  title: string;
  items: ApiSchemas["Board"][];
};

export function useRecentGroups(boards: ApiSchemas["Board"][]): BoardsGroup[] {
  const getLocalDateStr = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const dayBeforeYesterday = new Date(today);
  dayBeforeYesterday.setDate(today.getDate() - 2);

  const todayStr = getLocalDateStr(today);
  const yesterdayStr = getLocalDateStr(yesterday);
  const dayBeforeYesterdayStr = getLocalDateStr(dayBeforeYesterday);

  const filterBoards = (dateStr: string) =>
    boards.filter(
      (board) => getLocalDateStr(new Date(board.lastOpenedAt)) === dateStr,
    );

  const olderBoards = boards.filter(
    (board) =>
      getLocalDateStr(new Date(board.lastOpenedAt)) < dayBeforeYesterdayStr,
  );

  const todayBoards = filterBoards(todayStr);
  const yesterdayBoards = filterBoards(yesterdayStr);
  const dayBeforeYesterdayBoards = filterBoards(dayBeforeYesterdayStr);

  const sortBoards = (boards: ApiSchemas["Board"][]) =>
    boards.sort(
      (a, b) =>
        new Date(b.lastOpenedAt).getTime() - new Date(a.lastOpenedAt).getTime(),
    );

  const result: BoardsGroup[] = [];

  if (todayBoards.length > 0)
    result.push({ title: "Сегодня", items: sortBoards(todayBoards) });
  if (yesterdayBoards.length > 0)
    result.push({ title: "Вчера", items: sortBoards(yesterdayBoards) });
  if (dayBeforeYesterdayBoards.length > 0)
    result.push({
      title: "Позавчера",
      items: sortBoards(dayBeforeYesterdayBoards),
    });
  if (olderBoards.length > 0)
    result.push({ title: "Ранее", items: sortBoards(olderBoards) });

  return result;
}

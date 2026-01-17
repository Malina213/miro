import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/kit/dialog";
import { TemplatesGallery } from "./templates-gallery";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { closeTemplatesModal } from "@/shared/model/slices/templatesModalSlice";

export function TemplatesModal() {
  const isOpen = useAppSelector(state => state.templatesModal.isOpen)
  const dispatch = useAppDispatch()
  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(closeTemplatesModal())}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Выберите шаблон</DialogTitle>
          <DialogDescription>
            Выберите шаблон для создания новой доски
          </DialogDescription>
        </DialogHeader>

        <TemplatesGallery className="h-[60vh] pr-4" />
      </DialogContent>
    </Dialog>
  );
}
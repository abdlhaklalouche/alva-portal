import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CustomCellEditorProps } from "ag-grid-react";
import { MoreHorizontal } from "lucide-react";

export type GridActionProps = {
  name: string;
  handleOnClick: (props: CustomCellEditorProps) => void;
};

export default function GridActions({
  props,
  actions,
}: {
  props: CustomCellEditorProps;
  actions: GridActionProps[];
}) {
  if (actions.length === 0) return null;

  return (
    <div className="flex h-full justify-end items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted flex-shrink-0"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {actions.map((action, index) => (
            <DropdownMenuItem
              key={index}
              className="cursor-pointer"
              onClick={() => action.handleOnClick(props)}
            >
              {action.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

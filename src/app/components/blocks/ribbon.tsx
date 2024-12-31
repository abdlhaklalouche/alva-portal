"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, LucideIcon, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingButton from "../other/loading-button";

export type RibbonActionItem =
  | {
      type: "link";
      name: string;
      icon?: LucideIcon;
      href: string;
      loading?: boolean;
      disabled?: boolean;
    }
  | {
      type: "button";
      name: string;
      icon?: LucideIcon;
      onClick: () => void;
      loading?: boolean;
      disabled?: boolean;
    };

export default function Ribbon({
  actions = [],
}: {
  actions?: RibbonActionItem[];
}) {
  const router = useRouter();

  const handleActionClick = (action: RibbonActionItem) => {
    if (action.type === "link") {
      router.push(action.href);
      return;
    }

    if (action.type === "button") {
      action.onClick();
      return;
    }
  };

  return (
    <div className="flex justify-between items-center gap-2 w-full px-4 h-12 bg-white border-b">
      <div className="flex items-center gap-2">
        <div>
          <Button
            variant="ghost"
            className="w-7 h-7 px-0"
            onClick={() => router.back()}
          >
            <ChevronLeft size={16} />
          </Button>
        </div>
        <div>
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>
        <div className="flex items-center gap-1">
          {actions.map((action, index) => (
            <LoadingButton
              key={index}
              variant="ghost"
              className="h-7 px-2 text-xs"
              loading={action.loading}
              disabled={action.disabled}
              onClick={() => handleActionClick(action)}
            >
              {action.icon && <action.icon size={15} />}
              <span>{action.name}</span>
            </LoadingButton>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>
        <Button
          variant="ghost"
          className="w-8 h-8 px-0 rounded-full"
          onClick={() => router.refresh()}
        >
          <RotateCcw size={16} />
        </Button>
      </div>
    </div>
  );
}

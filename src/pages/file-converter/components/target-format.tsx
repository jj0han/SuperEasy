import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon, Check } from "lucide-react";
import { Fragment, useState } from "react";
import { motion } from "motion/react";
import type { FileFormat } from "../types";

type Props = {
  formatOptions: FileFormat[];
  selectedFormat: string;
  setSelectedFormat: React.Dispatch<React.SetStateAction<string>>;
};

export default function TargetFormat({
  formatOptions,
  selectedFormat,
  setSelectedFormat,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div layout className="space-y-2 w-full">
      <Label htmlFor="format-select" className="font-semibold">
        Format To:
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="format-select"
            variant="outline"
            aria-expanded={open}
            className="w-full justify-between bg-background px-3 font-normal hover:bg-background"
          >
            {selectedFormat ? (
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate">{selectedFormat}</span>
              </span>
            ) : (
              <span className="text-muted-foreground">Select format</span>
            )}
            <ChevronsUpDownIcon
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          className="w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search format..." />
            <CommandList>
              <CommandEmpty>No format found.</CommandEmpty>
              {formatOptions.map((group) => (
                <Fragment key={group.value}>
                  <CommandGroup heading={group.format}>
                    {group.items.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          setSelectedFormat(currentValue);
                          setOpen(false);
                        }}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            selectedFormat === item.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Fragment>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </motion.div>
  );
}

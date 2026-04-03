import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Separator } from '@/Components/ui/separator';
import { ScrollArea } from '@/Components/ui/scroll-area';

const DialogScrollable = ({
  open,
  onOpenChange,
  title,
  description,
  size = 'md',
  children,
  actions = [],
  hideSeparator = false,
  hideFooterSeparator = false,
}) => {
  const sizeClass = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-2xl',
  }[size] ?? 'sm:max-w-md';

  const bodyContent = children ?? null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${sizeClass} bg-background text-foreground border shadow-lg`}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        {!hideSeparator && (title || description) && bodyContent && (
          <Separator />
        )}

        <ScrollArea className="max-h-72 pr-3">
          {bodyContent}
        </ScrollArea>

        {actions.length > 0 && (
          <>
            {!hideFooterSeparator && <Separator />}
            <DialogFooter className="gap-2">
              {actions.map((action, i) => (
                <Button
                  key={i}
                  variant={action.variant ?? 'default'}
                  onClick={action.onClick}
                  disabled={action.disabled || action.loading}
                >
                  {action.loading && (
                    <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
                  )}
                  {action.label}
                </Button>
              ))}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogScrollable;


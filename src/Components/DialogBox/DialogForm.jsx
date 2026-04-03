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
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Separator } from '@/Components/ui/separator';

const DialogForm = ({
  open,
  onOpenChange,
  title,
  description,
  size = 'md',
  fields = [],
  formValues = {},
  onFormChange,
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

  const bodyContent = (
    <div className="flex flex-col gap-4">
      {fields.map(field => (
        <div key={field.name} className="flex flex-col gap-1.5">
          <Label htmlFor={`dialog-${field.name}`}>
            {field.label}
            {field.required && <span className="text-destructive ml-0.5">*</span>}
          </Label>
          {field.type === 'textarea' ? (
            <Textarea
              id={`dialog-${field.name}`}
              placeholder={field.placeholder}
              value={formValues[field.name] ?? ''}
              onChange={e => onFormChange?.({ name: field.name, value: e.target.value })}
              rows={4}
            />
          ) : (
            <Input
              id={`dialog-${field.name}`}
              type={field.type ?? 'text'}
              placeholder={field.placeholder}
              value={formValues[field.name] ?? ''}
              onChange={e => onFormChange?.({ name: field.name, value: e.target.value })}
            />
          )}
        </div>
      ))}
    </div>
  );

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

        <div className="py-1">{bodyContent}</div>

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

export default DialogForm;


import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/Components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
    } from '@/Components/ui/alert-dialog';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Separator } from '@/Components/ui/separator';
import { ScrollArea } from '@/Components/ui/scroll-area';

// ─── AppDialog ────────────────────────────────────────────────────────────────
/**
 * AppDialog — fully dynamic, reusable dialog component.
 *
 * Props:
 * @param {boolean}  open                  - Controlled open state
 * @param {Function} onOpenChange          - Called when dialog open state changes
 * @param {string}  [title]                - Dialog title
 * @param {string}  [description]          - Dialog description / subtext
 * @param {string}  [variant]              - 'default' | 'alert' | 'form' | 'scrollable' (default: 'default')
 * @param {string}  [size]                 - 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
 * @param {ReactNode}[children]            - Custom body content (overrides fields)
 * @param {Array}   [fields]               - Form fields for variant='form' (see below)
 * @param {Object}  [formValues]           - Controlled form values { [name]: value }
 * @param {Function}[onFormChange]         - Called on field change: ({ name, value }) => void
 * @param {Array}   [actions]              - Footer buttons (see below)
 * @param {boolean} [hideSeparator]        - Hide the separator between header and body
 * @param {boolean} [hideFooterSeparator]  - Hide the separator between body and footer
 *
 * Field shape (for variant='form'):
 * {
 *   name: string,
 *   label: string,
 *   type?: 'text' | 'email' | 'password' | 'textarea' | 'number',
 *   placeholder?: string,
 *   required?: boolean,
 * }
 *
 * Action shape:
 * {
 *   label: string,
 *   variant?: 'default' | 'outline' | 'destructive' | 'ghost' | 'secondary',
 *   onClick?: () => void,
 *   disabled?: boolean,
 *   loading?: boolean,
 * }
 */
const AppDialog = ({
  open,
  onOpenChange,
  title,
  description,
  variant = 'default',
  size = 'md',
  children,
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

  // ── Alert variant (uses AlertDialog for accessibility) ─────────────────────
  if (variant === 'alert') {
    const cancelAction  = actions.find(a => a.role === 'cancel');
    const confirmAction = actions.find(a => a.role === 'confirm') ?? actions[actions.length - 1];

    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className={`${sizeClass} bg-background text-foreground border shadow-lg`}>
          <AlertDialogHeader>
            {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
            {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
          </AlertDialogHeader>
          {children && <div className="py-2">{children}</div>}
          <AlertDialogFooter>
            {cancelAction && (
              <AlertDialogCancel onClick={cancelAction.onClick}>
                {cancelAction.label}
              </AlertDialogCancel>
            )}
            {confirmAction && (
              <AlertDialogAction
                onClick={confirmAction.onClick}
                className={confirmAction.variant === 'destructive'
                  ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  : ''}
              >
                {confirmAction.label}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // ── Form fields renderer ───────────────────────────────────────────────────
  const renderFields = () => (
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

  // ── Body content ───────────────────────────────────────────────────────────
  const bodyContent = children
    ? children
    : fields.length > 0
      ? renderFields()
      : null;

  // ── Default / Form / Scrollable variants ───────────────────────────────────
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${sizeClass} bg-background text-foreground border shadow-lg`}>

        {/* Header */}
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        {!hideSeparator && (title || description) && bodyContent && (
          <Separator />
        )}

        {/* Body */}
        {variant === 'scrollable' ? (
          <ScrollArea className="max-h-72 pr-3">
            {bodyContent}
          </ScrollArea>
        ) : (
          <div className="py-1">{bodyContent}</div>
        )}

        {/* Footer */}
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

export default AppDialog;
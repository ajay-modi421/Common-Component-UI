import React from 'react';
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

const DialogAlert = ({
  open,
  onOpenChange,
  title,
  description,
  size = 'md',
  children,
  actions = [],
}) => {
  const sizeClass = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-2xl',
  }[size] ?? 'sm:max-w-md';

  const cancelAction = actions.find(a => a.role === 'cancel');
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
};

export default DialogAlert;


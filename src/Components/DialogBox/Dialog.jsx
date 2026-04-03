import React from 'react';
import DialogAlert from './DialogAlert';
import DialogDefault from './DialogDefault';
import DialogForm from './DialogForm';
import DialogScrollable from './DialogScrollable';

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
  if (variant === 'alert') {
    return (
      <DialogAlert
        open={open}
        onOpenChange={onOpenChange}
        title={title}
        description={description}
        size={size}
        actions={actions}
      >
        {children}
      </DialogAlert>
    );
  }

  if (variant === 'form') {
    return (
      <DialogForm
        open={open}
        onOpenChange={onOpenChange}
        title={title}
        description={description}
        size={size}
        fields={fields}
        formValues={formValues}
        onFormChange={onFormChange}
        actions={actions}
        hideSeparator={hideSeparator}
        hideFooterSeparator={hideFooterSeparator}
      />
    );
  }

  if (variant === 'scrollable') {
    return (
      <DialogScrollable
        open={open}
        onOpenChange={onOpenChange}
        title={title}
        description={description}
        size={size}
        actions={actions}
        hideSeparator={hideSeparator}
        hideFooterSeparator={hideFooterSeparator}
      >
        {children}
      </DialogScrollable>
    );
  }

  return (
    <DialogDefault
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size={size}
      actions={actions}
      hideSeparator={hideSeparator}
      hideFooterSeparator={hideFooterSeparator}
    >
      {children}
    </DialogDefault>
  );
};

export default AppDialog;
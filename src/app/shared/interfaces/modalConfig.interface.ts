export interface IModalConfig
{
  modalTitle: string;
  dismissButtonLabel?: string;
  closeButtonLabel?: string;
  shouldClose?(): Promise<boolean> | boolean;
  shouldDismiss?(): Promise<boolean> | boolean;
  onClose?(): Promise<void> | void;
  onDismiss?(): Promise<void> | void;
  disableCloseButton?: boolean;
  disableDismissButton?: boolean;
  hideCloseButton?: boolean;
  hideDismissButton?: boolean;
  showFooter?:boolean;
}
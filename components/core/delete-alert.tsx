import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '../ui/button'

interface IProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title: string
  description?: string
  confirmLabel?: string
}

export function DeleteAlert({ onConfirm, onOpenChange, open, title, description, confirmLabel }: IProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || 'This action cannot be undone. This will permanently delete your data from our servers.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={onConfirm} variant="destructive">
            {!!confirmLabel && confirmLabel.length > 10 ? `${confirmLabel.slice(0, 35)}..."` : confirmLabel}
            {!confirmLabel && 'Yes, Confirm'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

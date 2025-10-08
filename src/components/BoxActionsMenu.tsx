import React, { useState } from 'react';
import { KebabMenu, KebabMenuItem } from './ui/kebab-menu';
import { ConfirmDialog } from './ui/confirm-dialog';
import { Edit, Copy, Move, Trash2 } from 'lucide-react';

export interface BoxActionsMenuProps {
  boxId: number;
  boxName?: string;
  childBoxesCount?: number;
  onEdit?: (boxId: number) => void;
  onCopy?: (boxId: number) => void;
  onMove?: (boxId: number) => void;
  onDelete?: (boxId: number) => void;
}

export const BoxActionsMenu: React.FC<BoxActionsMenuProps> = ({
  boxId,
  boxName,
  childBoxesCount = 0,
  onEdit,
  onCopy,
  onMove,
  onDelete,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(boxId);
    }
    setIsDeleteDialogOpen(false);
  };

  const menuItems: KebabMenuItem[] = [
    ...(onEdit
      ? [
          {
            id: 'edit',
            label: 'Edit Box',
            icon: <Edit className="h-4 w-4" />,
            onClick: () => onEdit(boxId),
          },
        ]
      : []),
    ...(onCopy
      ? [
          {
            id: 'copy',
            label: 'Copy Box',
            icon: <Copy className="h-4 w-4" />,
            onClick: () => onCopy(boxId),
          },
        ]
      : []),
    ...(onMove
      ? [
          {
            id: 'move',
            label: 'Move Box',
            icon: <Move className="h-4 w-4" />,
            onClick: () => onMove(boxId),
          },
        ]
      : []),
    ...(onDelete
      ? [
          {
            id: 'delete',
            label:
              childBoxesCount > 0
                ? `Delete Box (${childBoxesCount} child boxes)`
                : 'Delete Box',
            icon: <Trash2 className="h-4 w-4" />,
            onClick: () => setIsDeleteDialogOpen(true),
            variant: 'destructive' as const,
            disabled: childBoxesCount > 0,
          },
        ]
      : []),
  ];

  return (
    <>
      <KebabMenu items={menuItems} />
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Box"
        description={
          childBoxesCount > 0
            ? `Cannot delete the box "${boxName || 'this box'}" because it contains ${childBoxesCount} child box${childBoxesCount !== 1 ? 'es' : ''}. Please delete or move the child boxes first.`
            : `Are you sure you want to delete the box "${boxName || 'this box'}"? This action cannot be undone.`
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
};

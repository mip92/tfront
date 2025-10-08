import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { MoreVertical } from 'lucide-react';

export interface KebabMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
}

export interface KebabMenuProps {
  items: KebabMenuItem[];
  trigger?: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

export const KebabMenu: React.FC<KebabMenuProps> = ({
  items,
  trigger,
  align = 'end',
  className = '',
  onOpenChange,
}) => {
  const defaultTrigger = (
    <button
      onClick={e => e.stopPropagation()}
      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
    >
      <MoreVertical className="h-4 w-4 text-gray-500" />
    </button>
  );

  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        {trigger || defaultTrigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={`w-48 ${className}`}>
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <DropdownMenuItem
              onClick={e => {
                e.stopPropagation();
                if (!item.disabled) {
                  item.onClick();
                }
              }}
              disabled={item.disabled}
              className={
                item.variant === 'destructive'
                  ? 'text-red-600 focus:text-red-600 focus:bg-red-50'
                  : ''
              }
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </DropdownMenuItem>
            {index < items.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


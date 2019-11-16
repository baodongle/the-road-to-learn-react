import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
import { Button } from '../Button';

interface SortProps {
  sortKey: string;
  activeSortKey: string;
  onSort: (sortKey: string) => void;
  children: ReactNode;
}

export const Sort: FC<SortProps> = ({ sortKey, activeSortKey, onSort, children }: SortProps) => {
  const sortClass = classNames('button-inline', { 'button-active': sortKey === activeSortKey });

  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass}>
      {children}
    </Button>
  );
};

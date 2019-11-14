import React, { FC } from 'react';
import { Hit } from '../../interfaces/hit';
import { Button } from '../Button';

const largeColumn = {
  width: '40%',
};

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
};

interface TableProps {
  list: Hit[];
  onDismiss?: (id?: string) => void;
}

export const Table: FC<TableProps> = ({ list, onDismiss }: TableProps) => (
  <div className="table">
    {list.map((item: Hit) => (
      <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>{item.author}</span>
        <span style={smallColumn}>{item.num_comments}</span>
        <span style={smallColumn}>{item.points}</span>
        <span style={smallColumn}>
          <Button
            onClick={() => {
              if (onDismiss) {
                onDismiss(item.objectID);
              }
            }}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);

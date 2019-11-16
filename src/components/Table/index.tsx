import PropTypes from 'prop-types';
import React, { FC } from 'react';
import { SORTS } from '../../constants';
import { Hit } from '../../interfaces/hit';
import { Button } from '../Button';
import { Sort } from '../Sort';
import './Table.scss';

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
  sortKey: string;
  isSortReverse: boolean;
  onSort: (sortKey: string) => void;
  onDismiss: (id?: string) => void;
}

export const Table: FC<TableProps> = ({ list, sortKey, isSortReverse, onSort, onDismiss }: TableProps) => {
  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

  return (
    <div className="table">
      <div className="table-header">
        <span style={largeColumn}>
          <Sort sortKey={'TITLE'} onSort={onSort} activeSortKey={sortKey}>
            Title
          </Sort>
        </span>
        <span style={midColumn}>
          <Sort sortKey={'AUTHOR'} onSort={onSort} activeSortKey={sortKey}>
            Author
          </Sort>
        </span>
        <span style={smallColumn}>
          <Sort sortKey={'COMMENTS'} onSort={onSort} activeSortKey={sortKey}>
            Comments
          </Sort>
        </span>
        <span style={smallColumn}>
          <Sort sortKey={'POINTS'} onSort={onSort} activeSortKey={sortKey}>
            Points
          </Sort>
        </span>
        <span style={smallColumn}>Archive</span>
      </div>
      {reverseSortedList.map((item: Hit) => (
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
};

Table.propTypes = {
  list: PropTypes.array.isRequired,
  sortKey: PropTypes.string.isRequired,
  isSortReverse: PropTypes.bool.isRequired,
  onSort: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import React, { Component, ReactNode } from 'react';
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
  onDismiss: (id?: string) => void;
}

interface TableState {
  sortKey: string;
  isSortReverse: boolean;
}

class Table extends Component<TableProps, TableState> {
  constructor(props: Readonly<TableProps>) {
    super(props);
    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey: string): void {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  static propTypes = {
    list: PropTypes.array.isRequired,
    onDismiss: PropTypes.func.isRequired,
  };

  public render(): ReactNode {
    const { list, onDismiss } = this.props;
    const { sortKey, isSortReverse } = this.state;
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <div className="table">
        <div className="table-header">
          <span style={largeColumn}>
            <Sort sortKey={'TITLE'} onSort={this.onSort} activeSortKey={sortKey}>
              Title
            </Sort>
          </span>
          <span style={midColumn}>
            <Sort sortKey={'AUTHOR'} onSort={this.onSort} activeSortKey={sortKey}>
              Author
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort sortKey={'COMMENTS'} onSort={this.onSort} activeSortKey={sortKey}>
              Comments
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort sortKey={'POINTS'} onSort={this.onSort} activeSortKey={sortKey}>
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
  }
}

export default Table;

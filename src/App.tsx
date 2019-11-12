import React, { ChangeEvent, Component, FC, ReactNode } from 'react';
import './App.scss';

interface Item {
  title: string;
  url: string;
  author: string;
  numComments: number;
  points: number;
  objectID: number;
}

interface AppStates {
  list: Item[];
  searchTerm: string;
}

const list: Item[] = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    numComments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    numComments: 2,
    points: 5,
    objectID: 1,
  },
];

const isSearched = (searchTerm: string) => (item: Item) => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component<{}, AppStates> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id: number): void {
    const updatedList = this.state.list.filter((item: Item) => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  public render(): ReactNode {
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange}>
          Search
        </Search>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

interface SearchProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}

const Search: FC<SearchProps> = ({ value, onChange, children }: SearchProps) => (
  <form>
    {children} <input type="text" value={value} onChange={onChange} />
  </form>
);

interface TableProps {
  list: Item[];
  pattern: string;
  onDismiss: (id: number) => void;
}

const Table: FC<TableProps> = ({ list, pattern, onDismiss }: TableProps) => (
  <div>
    {list.filter(isSearched(pattern)).map((item: Item) => (
      <div key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.numComments}</span>
        <span>{item.points}</span>
        <span>
          <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
        </span>
      </div>
    ))}
  </div>
);

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ onClick, className = '', children }: ButtonProps) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

export default App;

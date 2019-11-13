import React, { ChangeEvent, Component, FC, ReactNode } from 'react';
import './App.scss';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

interface Hit {
  title: string;
  url: string;
  author: string;
  points: number;
  num_comments: number;
  objectID: number;
}

interface Data {
  hits: Hit[];
}

interface AppStates {
  result: Data | null;
  searchTerm: string;
}

const largeColumn = {
  width: '40%',
};

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
};

const isSearched = (searchTerm: string) => (item: Item) => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component<{}, AppStates> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories(result: Data): void {
    this.setState({ result });
  }

  public componentDidMount(): void {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  onSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id: number): void {
    const updatedList = this.state.list.filter((item: Item) => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  public render(): ReactNode {
    const { searchTerm, result } = this.state;

    if (!result) {
      return null;
    }

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss} />
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
  <div className="table">
    {list.filter(isSearched(pattern)).map((item: Item) => (
      <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>{item.author}</span>
        <span style={smallColumn}>{item.numComments}</span>
        <span style={smallColumn}>{item.points}</span>
        <span style={smallColumn}>
          <Button onClick={() => onDismiss(item.objectID)} className="button-inline">
            Dismiss
          </Button>
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

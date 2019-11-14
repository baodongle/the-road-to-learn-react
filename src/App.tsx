import React, { ChangeEvent, Component, FC, FormEvent, ReactNode } from 'react';
import './App.scss';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

interface Hit {
  title: string;
  url: string;
  author: string;
  points: number;
  num_comments: number;
  objectID: number;
}

interface Result {
  hits: Hit[];
  page: number;
}

interface AppStates {
  result?: Result;
  searchTerm: string;
  page?: number;
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

class App extends Component<{}, AppStates> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories(result: Result): void {
    const { hits, page } = result;
    const oldHits = page !== 0 && this.state.result ? this.state.result.hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({ result: { hits: updatedHits, page } });
  }

  fetchSearchTopStories(searchTerm: string, page = 0): void {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  public componentDidMount(): void {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event: FormEvent<HTMLFormElement>): void {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  onDismiss(id: number): void {
    if (this.state.result) {
      const isNotId = (item: Hit) => item.objectID !== id;
      const updatedHits = this.state.result.hits.filter(isNotId);
      this.setState({
        result: { ...this.state.result, hits: updatedHits },
      });
    }
  }

  public render(): ReactNode {
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
            Search
          </Search>
        </div>
        {result && <Table list={result.hits} onDismiss={this.onDismiss} />}
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>More</Button>
        </div>
      </div>
    );
  }
}

interface SearchProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const Search: FC<SearchProps> = ({ value, onChange, onSubmit, children }: SearchProps) => (
  <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={onChange} />
    <button>{children}</button>
  </form>
);

interface TableProps {
  list: Hit[];
  onDismiss: (id: number) => void;
}

const Table: FC<TableProps> = ({ list, onDismiss }: TableProps) => (
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

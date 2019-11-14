import axios from 'axios';
import React, { ChangeEvent, Component, FormEvent, ReactNode } from 'react';
import {
  DEFAULT_HPP,
  DEFAULT_QUERY,
  PARAM_HPP,
  PARAM_PAGE,
  PARAM_SEARCH,
  PATH_BASE,
  PATH_SEARCH,
} from '../../constants';
import { Hit } from '../../interfaces/hit';
import { Result } from '../../interfaces/result';
import { ButtonWithLoading } from '../Button';
import { Search } from '../Search';
import { Table } from '../Table';
import './App.scss';

interface AppStates {
  results?: {
    [searchKey: string]: Result;
  };
  searchKey: string;
  searchTerm: string;
  error?: Error;
  page?: number;
  isLoading: boolean;
}

class App extends Component<{}, AppStates> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  needsToSearchTopStories(searchTerm: string): boolean {
    return !(this.state.results && this.state.results[searchTerm]);
  }

  setSearchTopStories(result: Result): void {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({ results: { ...results, [searchKey]: { hits: updatedHits, page } }, isLoading: false });
  }

  fetchSearchTopStories(searchTerm: string, page = 0): void {
    this.setState({ isLoading: true });

    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this.setSearchTopStories(result.data))
      .catch(error => this.setState({ error }));
  }

  public componentDidMount(): void {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event: FormEvent<HTMLFormElement>): void {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  onDismiss(id?: string): void {
    const { searchKey, results } = this.state;
    if (results) {
      const { hits, page } = results[searchKey];
      const isNotId = (item: Hit) => item.objectID !== id;
      const updatedHits = hits.filter(isNotId);
      this.setState({
        results: { ...results, [searchKey]: { hits: updatedHits, page } },
      });
    }
  }

  public render(): ReactNode {
    const { searchTerm, results, searchKey, error, isLoading } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
            Search
          </Search>
        </div>
        {error ? (
          <div className="interactions">
            <p>Something went wrong.</p>
          </div>
        ) : (
          <Table list={list} onDismiss={this.onDismiss} />
        )}
        <div className="interactions">
          <ButtonWithLoading isLoading={isLoading} onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;

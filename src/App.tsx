import React, {Component, ReactNode} from 'react';
import './App.scss';

interface Item {
  title: string;
  url: string;
  author: string;
  numComments: number;
  points: number;
  objectID: number;
}

interface States {
  list: Item[];
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

class App extends Component<{}, States> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      list,
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss(id: number): void {
    const updatedList = this.state.list.filter((item: Item) => item.objectID !== id);
    this.setState({list: updatedList});
  }

  render(): ReactNode {
    return (
      <div className="App">
        {this.state.list.map((item: Item) => (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.numComments}</span>
            <span>{item.points}</span>
            <span>
              <button onClick={() => this.onDismiss(item.objectID)} type="button">
                Dismiss
              </button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;

import React, { ChangeEvent, Component, FormEvent, ReactNode } from 'react';

interface SearchProps {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export class Search extends Component<SearchProps> {
  private input?: HTMLInputElement | null;

  componentDidMount(): void {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { value, onChange, onSubmit, children } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange} ref={el => (this.input = el)} />
        <button>{children}</button>
      </form>
    );
  }
}

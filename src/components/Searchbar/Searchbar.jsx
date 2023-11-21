import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import css from './searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={query}
          />

          <button type="submit" className={css.button}>
            <span className={css.button_label}>
              Search <ImSearch />
            </span>
          </button>
        </form>
      </header>
    );
  }
}

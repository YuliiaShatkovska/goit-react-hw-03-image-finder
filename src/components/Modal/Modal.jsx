import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  backdropClose = e => {
    e.currentTarget === e.target && this.props.onClose();
  };

  handleEscClose = e => {
    e.code === 'Escape' && this.props.onClose();
  };

  componentDidMount = () => {
    document.addEventListener('keydown', this.handleEscClose);
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleEscClose);
  };

  render() {
    const {
      selectedImage: { largeImageURL, tags },
    } = this.props;

    return (
      <div className={css.overlay} onClick={this.backdropClose}>
        <div className={css.modal}>
          <img className={css.images} src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    const {
      info: { webformatURL, tags },
      onClick,
    } = this.props;

    return (
      <li className={css.gallery_item} onClick={() => onClick(this.props.info)}>
        <img src={webformatURL} alt={tags} />
      </li>
    );
  }
}

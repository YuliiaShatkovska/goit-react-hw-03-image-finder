import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ data, openModal }) => {
  return (
    <ul className={css.gallery}>
      {data.map(el => (
        <ImageGalleryItem info={el} key={el.id} onClick={openModal} />
      ))}
    </ul>
  );
};

import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loader_container}>
      <ThreeDots color="#575757" />
    </div>
  );
};

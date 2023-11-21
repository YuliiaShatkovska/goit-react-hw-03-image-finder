import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { getImages } from './helpers/api';
import { Notify } from 'notiflix';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    query: '',
    page: 1,
    loadMore: false,
    perPage: 12,
    isShowModal: false,
  };

  componentDidUpdate = (_, prevState) => {
    const { query, page } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      this.getImagesFromApi();
    }
  };

  getImagesFromApi = async () => {
    const { query, page, perPage } = this.state;
    try {
      this.setState({ isLoading: true });
      const { hits, total } = await getImages(query, page, perPage);

      if (total === 0) {
        Notify.failure(`Nothing was found for your request ${query}`);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: page < Math.ceil(total / perPage),
      }));
    } catch (error) {
      Notify.failure(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleFormSubmit = query => {
    if (query === '') {
      Notify.warning('Please enter something');

      this.setState({
        images: [],
        loadMore: false,
      });

      return;
    }

    this.setState({
      query: query.trim(),
      page: 1,
      images: [],
      loadMore: false,
      selectedImages: '',
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleOpenModal = selectedImages => {
    this.setState({
      isShowModal: true,
      selectedImages,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isShowModal: false,
      selectedImages: '',
    });
  };

  render() {
    const { isLoading, images, loadMore, isShowModal, selectedImages } =
      this.state;

    return (
      <div className="container">
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery data={images} openModal={this.handleOpenModal} />
        {loadMore && <Button onLoadMore={this.onLoadMore} />}
        {isShowModal && (
          <Modal
            onClose={this.handleCloseModal}
            selectedImage={selectedImages}
          />
        )}
      </div>
    );
  }
}

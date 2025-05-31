import { useState, useCallback } from 'react';

const useEntityModal = () => {
  const [modalData, setModalData] = useState({
    show: false,
    entity: null,
    initialValues: {},
  });

  const openModal = useCallback((entity, initialValues = {}) => {
    setModalData({
      show: true,
      entity,
      initialValues,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalData((prev) => ({ ...prev, show: false }));
  }, []);

  return {
    modalData,
    openModal,
    closeModal,
  };
};

export default useEntityModal;

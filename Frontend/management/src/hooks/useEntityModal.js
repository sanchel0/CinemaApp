import { useState, useCallback } from 'react';

const useEntityModal = () => {
  const [modalData, setModalData] = useState({
    show: false,
    entity: null,
    initialValues: {},
    callback: null,
  });

  const openModal = useCallback((entity, initialValues = {}, callback = null) => {
    setModalData({
      show: true,
      entity,
      initialValues,
      callback,
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

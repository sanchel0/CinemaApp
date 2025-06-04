import CountryModal from './CountryModal';
import StateModal from './StateModal';
import CityModal from './CityModal';

const EntityModalRenderer = ({ modalData, onClose, onSubmit }) => {
  const { show, entity, initialValues, callback } = modalData;

  if (!show) return null;

  const sharedProps = {
    show: true,
    onClose,
    initialValues,
    onSubmit: (data) => {
      onSubmit(entity, data)
        .then(() => {
          if (typeof callback === 'function') {
            callback(); // Solo si no falló
          }
          onClose();
        })
        .catch(() => {
          // No cerrar modal, ni hacer refresh si hubo error
        });
    }
  };

  switch (entity) {
    case 'country':
      return <CountryModal {...sharedProps} />;
    case 'state':
      return <StateModal {...sharedProps} />;
    case 'city':
      return <CityModal {...sharedProps} />;
    default:
      return null;
  }
};

export default EntityModalRenderer;
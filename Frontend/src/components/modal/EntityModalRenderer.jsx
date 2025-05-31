import CountryModal from './CountryModal';
import StateModal from './StateModal';
//import CityModal from './CityModal';

const EntityModalRenderer = ({ modalData, onClose, onSubmit }) => {
  const { show, entity, initialValues } = modalData;

  if (!show) return null;

  const sharedProps = {
    show: true,
    onClose,
    initialValues,
    onSubmit: (data) => {
      onSubmit(entity, data);
      onClose();
    }
  };

  switch (entity) {
    case 'country':
      return <CountryModal {...sharedProps} />;
    case 'state':
      return <StateModal {...sharedProps} />;
    /*case 'city':
      return <CityModal {...sharedProps} />;*/
    default:
      return null;
  }
};

export default EntityModalRenderer;
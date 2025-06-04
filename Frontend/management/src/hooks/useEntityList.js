import { useState, useEffect } from 'react';

const useEntityList = ({ fetchList, deleteItem, fetchId = null }) => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const result = fetchId !== null ? fetchList(fetchId) : fetchList();

    result
      .then(setItems)
      .catch(console.error);
    setSelected(null);
  }, [refreshKey, fetchList, fetchId]);

  const refresh = () => setRefreshKey(k => k + 1);

  const handleDelete = async (item) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${item.name}"?`);
    if (!confirmed) return;

    try {
      await deleteItem(item.id);
      alert('Deleted');
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return { items, selected, setSelected, refresh, handleDelete };
};

export default useEntityList;

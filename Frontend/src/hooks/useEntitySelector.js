import { useState, useRef, useEffect } from 'react';

export default function useEntitySelector() {
  const [value, setValue] = useState('');//input value
  const [items, setItems] = useState([]);//items from the list that have the added items
  const [addedItems, setAddedItems] = useState([]);//items que se asociaran a la movie
  const [leavingItems, setLeavingItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);//El item seleccionado de la lista
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (isAdding) {
      setIsAdding(false);
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    }
  }, [items, isAdding]);

  const handleAdd = () => {
    let itemToAdd = null;

    if (selectedSuggestion) {
      itemToAdd = selectedSuggestion;
    } else return;

    const alreadyExists = items.some(existing =>
      existing.id
        ? existing.id === itemToAdd?.id
        : existing.name.toLowerCase() === itemToAdd.name.toLowerCase()
    );

    if (!alreadyExists) {
      setIsAdding(true);
      setItems(prev => [...prev, itemToAdd]);
      setAddedItems(prev => [...prev, itemToAdd]);

      setTimeout(() => {
        setAddedItems(prev => prev.filter(i =>
          i.id ? i.id !== itemToAdd.id : i.name !== itemToAdd.name
        ));
      }, 300);
    }

    setValue('');
    setSelectedSuggestion(null);
    setSelectedItem(null);
  }

  const handleRemove = () => {
    if (selectedItem !== null) {
      setLeavingItems(prev => [...prev, selectedItem]);

      setTimeout(() => {
        setItems(prev => prev.filter(item => item !== selectedItem));
        setLeavingItems(prev => prev.filter(item => item !== selectedItem));
        setSelectedItem(null);
      }, 300);
    }
  };

  return {
    value,
    setValue,
    items,
    setItems,
    addedItems,
    leavingItems,
    selectedItem,
    setSelectedItem,
    selectedSuggestion,
    setSelectedSuggestion,
    listRef,
    handleAdd,
    handleRemove
  };
}

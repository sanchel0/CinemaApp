import { useState, useEffect } from 'react';

function EntitySelector({
    title,
    placeholder,
    value,
    setValue,
    handleAdd,
    handleRemove,
    items,
    selectedItem,
    setSelectedItem,
    selectedSuggestion,
    setSelectedSuggestion,
    addedItems = [],
    leavingItems = [],
    listRef,
    getByName,
    createNew
    }) {

    const [collapsed, setCollapsed] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchFilteredData = async () => {
        if (!value.trim()) {
            setFilteredItems([]); // Si no hay texto, limpiamos las opciones
            return;
        }

        setIsLoading(true);

        try {
            // Llamada a la API para obtener los actores que coinciden con la búsqueda
            const results = await getByName(value);  // fetchData debe ser pasado como prop
            setFilteredItems(results); // Tomamos solo los primeros 4 resultados
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
        };

        fetchFilteredData();
    }, [value]);

    /*useEffect(() => {
        handleAdd()
    }, [selectedSuggestion, handleAdd])*/

    return (
        <section className="selector-block">
        <h3 onClick={() => setCollapsed(prev => !prev)} style={{ cursor: 'pointer' }}>
        {title} {collapsed ? '▶' : '▼'}
        </h3>

        {!collapsed && (
        <>
            <label htmlFor={`${title}-input`}>Name:</label>
            <input
                id={`${title}-input`}
                type="text"
                value={value}
                onChange={e => {console.log(value) 
                    setValue(e.target.value)}}
                placeholder={placeholder}
            />

            {filteredItems.length > 0 && (
                <ul className="autocomplete-list">
                {filteredItems.map(item => (
                    <li
                    key={item.id}
                    onClick={() => {
                        setSelectedSuggestion(item);
                        setValue(item.name);
                    }}
                    className={`item ${item === selectedSuggestion ? 'active' : ''}`}
                    >
                    {item.name} - {item.id}
                    </li>
                ))}
                </ul>
            )}

            {!isLoading && value.trim() && filteredItems.length === 0 && (
            <button
                type="button"
                className="create"
                onClick={async () => {
                try {
                    console.log(value.trim())
                    const created = await createNew({name: value.trim()});
                    setFilteredItems([created]); 
                    setSelectedSuggestion(created);
                    setValue(created.name);
                } catch (err) {
                    console.error('Error creando entidad:', err);
                }
                }}
            >
                Create "{value}"
            </button>
            )}

            {isLoading && <p>Loading...</p>}

            <div className="button-group">
                <button className="add" type="button" onClick={handleAdd}>Add</button>
                <button
                className={`remove ${selectedItem ? 'activeBtn' : ''}`}
                type="button"
                onClick={handleRemove}
                disabled={!selectedItem}
                >
                Remove
                </button>
            </div>

            {items.length > 0 && (
                <div className="items-container">
                    <p className="items-title">Added {title.toLowerCase()}:</p>
                    <ul ref={listRef} className="items">
                        {items.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={`item ${item === selectedItem ? 'active' : 'inactive'} ${addedItems.includes(item) ? 'added' : ''} ${leavingItems.includes(item) ? 'leaving' : ''}`}
                        >
                            {
                                item.id ? `${item.name} - ${item.id}` : `${item.name}`
                            }
                        </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
        )}
        </section>
    );
}

export default EntitySelector;

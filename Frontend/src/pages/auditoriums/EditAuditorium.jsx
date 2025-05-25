import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetails, edit } from '../../services/auditoriums';
import { getAll } from '../../services/cinemas';
import EntityLayout from '../../components/layouts/EntityLayout';

export default function EditAuditorium() {
    const { id } = useParams();
    const formRef = useRef(null);
    const navigate = useNavigate();

    const [inputRows, setInputRows] = useState(0);
    const [inputSeatsPerRow, setInputSeatsPerRow] = useState(0);
    const [rows, setRows] = useState(0);
    const [seatsPerRow, setSeatsPerRow] = useState(0);

    const [existingSeatData, setExistingSeatData] = useState({});

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [displayedLabels, setDisplayedLabels] = useState({});

    const [expanded, setExpanded] = useState(false);

    const [cinemas, setCinemas] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [itemData, setItemData] = useState(null);

    useEffect(() => {
        async function getCinemas() {
            try {
                const cinemas = await getAll();
                setCinemas(cinemas);
            } catch (error) {
                console.error('Error cargando cinemas:', error);
            }
        }
        getCinemas();
    }, []);
    
    const clearSelection = () => {
        setSelectedSeats([]);
    };
    
    const clearGrid = () => {
        setRows(0);
        setSeatsPerRow(0);
        setSelectedSeats([]);
    }
    
    useEffect(()=>{
        const normalized = normalizeSelectedSeats(selectedSeats);
        setDisplayedLabels(normalized);
        console.log(displayedLabels)
    },[selectedSeats])
    
    const toggleSeat = (key) => {
        console.log(key)
        setSelectedSeats(prev =>
            prev.some(s => s === key)
                ? prev.filter(s => s !== key)
                : [...prev, key]
                );
    };
    
    const generateGrid = () => {
        setRows(inputRows);
        setSeatsPerRow(inputSeatsPerRow);
    };
    
    function normalizeSelectedSeats(selectedSeats) {
        //
        const sortedSeats = [...selectedSeats].sort((a, b) => {
          const [rowA, numA] = a.split('-');
          const [rowB, numB] = b.split('-');
    
          if (rowA < rowB) return -1;
          if (rowA > rowB) return 1;
    
          return Number(numA) - Number(numB);
        });
    
        //
        const newSeats = {};
        let currentRow = '';
        let counter = 1;
    
        for (const seat of sortedSeats) {
          const [row, _] = seat.split('-');
    
          if (row !== currentRow) {
            currentRow = row;
            counter = 1;
          }
    
          newSeats[seat] = `${row}-${counter}`;
          counter++;
        }
    
        return newSeats;
    }

    function calculateRowsAndSeatsPerRow(seats) {
        const rowSet = new Set();
        let maxSeatNumber = 0;
        const initialSeats = {};

        for (const seat of seats) {
            rowSet.add(seat.row);
            if (seat.number > maxSeatNumber) {
            maxSeatNumber = seat.number;
            }
            const key = `${seat.row}-${seat.number}`;
            toggleSeat(key);
            initialSeats[key] = { ...seat }
        }

        setInputRows(rowSet.size);
        setInputSeatsPerRow(maxSeatNumber);
        setRows(rowSet.size);
        setSeatsPerRow(maxSeatNumber);
        setExistingSeatData(initialSeats);
    };

    useEffect(() => {
        getDetails(id)
          .then(data => {
            setItemData(data);
            calculateRowsAndSeatsPerRow(data.seats);
            setLoading(false);
          })
          .catch(err => {
            setError('Error cargando: ' + err);
            setLoading(false);
          }
        );
    }, [id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const form = formRef.current;
    
        if (form.checkValidity()) {
    
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const cinemaId = parseInt(data.cinemaId);

            /*const selectedExistingSeats = [...new Set(Object.keys(displayedLabels))];
            const a = selectedExistingSeats.map(value => {
                const [row, number] = value.split('-');
                const existing = existingSeatData[value];
                return {
                    id: existing?.id || 0,
                    row,
                    number: parseInt(number)
                };
            })*/
                
            const selectedSeatValues = [...new Set(Object.values(displayedLabels))];

            console.log('Datos válidos:');
            alert('Formulario enviándose...');
            const updated = {
                id: 6,
                name: form.name.value,
                capacity: selectedSeatValues.length,
                cinemaId: cinemaId,
                seats: selectedSeatValues.map(value => {
                const [row, number] = value.split('-');
                const existing = existingSeatData[value];
                return {
                    id: existing?.id || 0,
                    row,
                    number: parseInt(number)
                };//esta bien esto.  Xq si se quitan algunos asinetos de algunas filas, entonces se rehutilizan los registros ya existentes. No se va a crear otro nuevo, xq tendrian el valor repetido en row y number, x eso usar el mismo id si ya existe. Pero si se agregan más seats, ahí si se crean nuevos seats, ya que irán con id en 0.
                })
            };
            try {
                await edit(id, updated);
                alert('Actualizado correctamente');
                navigate('/auditoriums');
            } catch (error) {
                alert('Error al actualizar: ' + (error.message || error));
            }
        } 
        else {
            alert('Por favor, complete todos los campos correctamente');
            form.reportValidity();
        }
    }
    
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return(
        <EntityLayout entityName='auditoriums'>
            <h2>Create Auditorium</h2>
        
            <form ref={formRef} onSubmit={handleSubmit} className='form-auditorium'>
            <label>Name:</label>
            <input name="name" type="text" defaultValue={itemData.name} required />
            
            <label>Cinema:</label>
            <select name="cinemaId" required>
            <option value="" disabled>Seleccione un cinema</option>
            {cinemas.map(cinema => (
            <option key={cinema.id} value={cinema.id} defaultValue={itemData.cinemaId}>
                {cinema.name}
            </option>
            ))}
            </select>

            <h3>Configurar sala</h3>

            <label>Filas: </label>
            <input
            type="number"
            value={inputRows}
            min="1"
            onChange={(e) => setInputRows(parseInt(e.target.value))}
            />

            <label>Asientos por fila: </label>
            <input
            type="number"
            value={inputSeatsPerRow}
            min="1"
            onChange={(e) => setInputSeatsPerRow(parseInt(e.target.value))}
            />

            <div className='buttons-grid'>
            <button type="button" onClick={generateGrid}>Generar Grilla</button>
            <button type="button" onClick={clearGrid}>Limpiar Grilla</button>
            <button type="button" onClick={clearSelection}>Limpiar Selección</button>
            <button type="button" onClick={() => setExpanded(true)}>Expandir Asientos</button>
            </div>
            {rows != 0 && (
            <div className={`grid ${expanded ? "grid-seats-wrapper" : ""}`}>
            
            
            {expanded && (
                <>
                    <div className="overlay" onClick={() => setExpanded(false)} />
                    <button type="button" className="close-button" onClick={() => setExpanded(false)}>✖</button>
                </>
                )}

            <div className={`grid-seats ${expanded ? "expanded" : ""}`}>
            <div className="seat-wrapper">
                {Array.from({ length: rows }).map((_, rowIndex) => {
                const rowLabel = String.fromCharCode(65 + rowIndex);
                return (
                    <div key={rowLabel} className='row'>
                    {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                        const seatKey = `${rowLabel}-${seatIndex + 1}`;
                        const isSelected = selectedSeats.includes(seatKey);
                        
                        const displayLabel = displayedLabels[seatKey] || "";
                        return (
                        <button
                            type="button"
                            key={seatKey}
                            onClick={() => toggleSeat(seatKey)}
                            className={`seat ${isSelected ? "selected" : ""}`}
                        >
                            {isSelected ? displayLabel : ""}
                        </button>
                        );
                    })}
                    </div>
                );
                })}
                </div>
            </div>
            </div>
            )}
            
            <button type="submit">Save</button>
            </form>
        </EntityLayout>
    )
}
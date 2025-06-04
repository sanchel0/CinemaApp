import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from '../../services/auditoriums';
import { getAll } from '../../services/cinemas';
import EntityLayout from '../../components/layouts/EntityLayout';

function CreateAuditorium() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const [inputRows, setInputRows] = useState(0);
  const [inputSeatsPerRow, setInputSeatsPerRow] = useState(0);
  const [rows, setRows] = useState(0);
  const [seatsPerRow, setSeatsPerRow] = useState(0);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [displayedLabels, setDisplayedLabels] = useState({});

  const [expanded, setExpanded] = useState(false);

  const [cinemas, setCinemas] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;

    if (form.checkValidity()) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const cinemaId = parseInt(data.cinemaId);

      const selectedSeatValues = [...new Set(Object.values(displayedLabels))];

      const auditoriumData = {
        name: data.name,
        capacity: selectedSeatValues.length,
        cinemaId: cinemaId,
        seats: selectedSeatValues.map(value => {
        const [row, number] = value.split('-');
          return {
            row,
            number: parseInt(number)
          };
        })
      };
      console.log('submit')
      console.log(auditoriumData)
      try {
        const created = await create(auditoriumData);
        alert(`Auditorio creado con ID: ${created.id}`);
        navigate('/auditoriums');
      } catch (error) {
        alert('Error creando auditorio: ' + error.message);
      } 
    }
      else {
      alert('Todos los campos son obligatorios');
      form.reportValidity();
    }
  }

  return(
    <EntityLayout entityName='auditoriums'>
        <h2>Create Auditorium</h2>
        
        <form ref={formRef} onSubmit={handleSubmit} className='form-auditorium'>
        <label>Name:</label>
        <input name="name" type="text" required />
        
        <label>Cinema:</label>
        <select  name="cinemaId" required>
        <option value="" disabled>Seleccione un cinema</option>
        {cinemas.map(cinema => (
          <option key={cinema.id} value={cinema.id}>
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
        
        <button type="submit">Create</button>
        </form>
    </EntityLayout>
  );
}

export default CreateAuditorium;

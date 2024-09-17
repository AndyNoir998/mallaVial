// src/pages/index.js
import MyLayout from '../components/Layout'; // Asegúrate de que esta ruta es correcta
import SegmentTable from '../components/SegmentTable';
import CalzadaTable from '../components/CalzadaTable';
import BordilloTable from '../components/BordilloTable';
import React, { useEffect, useState } from 'react';

const IndexPage = () => {
  const [segments, setSegments] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [calzadas, setCalzadas] = useState([]);
  const [bordillos, setBordillos] = useState([]);

  useEffect(() => {
    // Fetch all segments on component mount
    const fetchSegments = async () => {
      try {
        const response = await fetch('/api/segmentos');
        if (!response.ok) throw new Error('La respuesta de la red no es correcta');
        const data = await response.json();
        setSegments(data);
      } catch (error) {
        console.error('Error al recuperar segmentos:', error);
      }
    };
    fetchSegments();
  }, []);

  const handleRowClick = async (record) => {
    setSelectedSegment(record);

    try {
      // Fetch calzadas associated with the selected segment
      const calzadasResponse = await fetch(`/api/calzadas?segmentoId=${record.id}`);
      if (!calzadasResponse.ok) throw new Error('La respuesta de la red no era correcta');
      const calzadasData = await calzadasResponse.json();
      setCalzadas(calzadasData);

      // Fetch bordillos associated with the selected segment
      const bordillosResponse = await fetch(`/api/bordillos?segmentoId=${record.id}`);
      if (!bordillosResponse.ok) throw new Error('Network response was not ok');
      const bordillosData = await bordillosResponse.json();
      setBordillos(bordillosData);
    } catch (error) {
      console.error('Error buscando calzadas o bordillos:', error);
    }
  };

  return (
    <MyLayout>
      <h1>Bienvenido a la Administración de la Malla Vial</h1>
      <p>Desde aquí puedes gestionar los segmentos, calzadas y bordillos de la malla vial de Medellín.</p>
      
      <h2>Segmentos</h2>
      <SegmentTable data={segments} onRowClick={handleRowClick} />
      
      {selectedSegment && (
        <>
          <h2>Calzadas de Segmento {selectedSegment.numeroSegmento}</h2>
          <CalzadaTable data={calzadas} />
          
          <h2>Bordillos de Segmento {selectedSegment.numeroSegmento}</h2>
          <BordilloTable data={bordillos} />
        </>
      )}
    </MyLayout>
  );
};

export default IndexPage;

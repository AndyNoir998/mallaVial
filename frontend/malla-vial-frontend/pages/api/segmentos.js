export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const response = await fetch(`http://localhost:9000/segmentos${id ? `/${id}` : ''}`);
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      }
      break;
    case 'POST':
      try {
        const response = await fetch('http://localhost:9000/segmentos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req.body),
        });
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        const data = await response.json();
        res.status(201).json(data);
      } catch (error) {
        console.error('Error al crear los datos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      }
      break;
    case 'PUT':
      try {
        const response = await fetch(`http://localhost:9000/segmentos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req.body),
        });
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        console.error('Error al actualizar los datos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      }
      break;
    case 'DELETE':
      try {
        const response = await fetch(`http://localhost:9000/segmentos/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        res.status(204).end();
      } catch (error) {
        console.error('Error al eliminar los datos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${req.method} no permitido`);
  }
}

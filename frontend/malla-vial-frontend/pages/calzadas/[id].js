import MyLayout from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, Modal, Select } from 'antd';

const CalzadaPage = () => {
  const [calzada, setCalzada] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [segmentos, setSegmentos] = useState([]); // Estado para guardar los segmentos
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchCalzada = async () => {
        try {
          const response = await fetch(`/api/calzadas/${id}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setCalzada(data);
          form.setFieldsValue(data);
        } catch (error) {
          console.error('Error fetching calzada:', error);
        }
      };

      // Función para obtener los segmentos disponibles
      const fetchSegmentos = async () => {
        try {
          const response = await fetch('/api/segmentos'); // Asegúrate de que esta ruta sea correcta
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setSegmentos(data); // Guardar los segmentos en el estado
        } catch (error) {
          console.error('Error fetching segmentos:', error);
        }
      };

      fetchCalzada();
      fetchSegmentos(); // Llamar a la función para obtener los segmentos
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch(`/api/calzadas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const updatedCalzada = await response.json();
      setCalzada(updatedCalzada);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating calzada:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/calzadas/${id}`, { method: 'DELETE' });
      router.push('/calzadas');
    } catch (error) {
      console.error('Error deleting calzada:', error);
    }
  };

  return (
    <MyLayout>
      <h1>Calzada {calzada?.tipoPavimento}</h1>
      {calzada && (
        <>
          <Form form={form} layout="vertical" initialValues={calzada}>
            <Form.Item name="tipoPavimento" label="Tipo de Pavimento">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item name="ancho" label="Ancho">
              <Input type="number" disabled={!isEditing} />
            </Form.Item>
            <Form.Item name="segmentoId" label="Segmento">
              <Select disabled={!isEditing} placeholder="Selecciona un segmento">
                {segmentos.map(seg => (
                  <Select.Option key={seg.id} value={seg.id}>
                    {seg.numeroSegmento} 
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {isEditing ? (
              <>
                <Button type="primary" onClick={handleSave}>Guardar</Button>
                <Button onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>Cancelar</Button>
              </>
            ) : (
              <Button type="primary" onClick={handleEdit}>Editar</Button>
            )}
          </Form>
          <Button type="danger" onClick={() => {
            Modal.confirm({
              title: 'Eliminar Calzada',
              content: '¿Estás seguro de que quieres eliminar esta calzada?',
              onOk: handleDelete,
            });
          }}>Eliminar</Button>
        </>
      )}
    </MyLayout>
  );
};

export default CalzadaPage;

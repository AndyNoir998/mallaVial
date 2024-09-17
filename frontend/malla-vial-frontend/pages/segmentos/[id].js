import MyLayout from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, Modal } from 'antd';

const SegmentoPage = () => {
  const [segment, setSegment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchSegment = async () => {
        try {
          const response = await fetch(`/api/segmentos/${id}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setSegment(data);
          form.setFieldsValue(data);
        } catch (error) {
          console.error('Error fetching segment:', error);
        }
      };
      fetchSegment();
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch(`/api/segmentos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const updatedSegment = await response.json();
      setSegment(updatedSegment);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating segment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/segmentos/${id}`, { method: 'DELETE' });
      router.push('/segmentos');
    } catch (error) {
      console.error('Error deleting segment:', error);
    }
  };

  return (
    <MyLayout>
      <h1>Segmento {segment?.numeroSegmento}</h1>
      {segment && (
        <>
          <Form form={form} layout="vertical" initialValues={segment}>
            <Form.Item name="numeroSegmento" label="Número de Segmento">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item name="direccion" label="Dirección">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item name="longitud" label="Longitud">
              <Input type="number" disabled={!isEditing} />
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
              title: 'Eliminar Segmento',
              content: '¿Estás seguro de que quieres eliminar este segmento?',
              onOk: handleDelete,
            });
          }}>Eliminar</Button>
        </>
      )}
    </MyLayout>
  );
};

export default SegmentoPage;

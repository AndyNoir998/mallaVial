import MyLayout from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, Modal, Select } from 'antd';

const BordilloPage = () => {
  const [bordillo, setBordillo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [segmentos, setSegmentos] = useState([]); 
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Fetch Bordillo details
      const fetchBordillo = async () => {
        try {
          const response = await fetch(`/api/bordillos/${id}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setBordillo(data);
          form.setFieldsValue({
            altura: data.altura,
            material: data.material,
            segmentoId: data.segmento ? data.segmento.id : null,
          });
        } catch (error) {
          console.error('Error fetching bordillo:', error);
        }
      };

      // Fetch available Segmentos
      const fetchSegmentos = async () => {
        try {
          const response = await fetch('/api/segmentos'); // Asegúrate de que esta URL sea correcta
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setSegmentos(data);
        } catch (error) {
          console.error('Error fetching segmentos:', error);
        }
      };

      fetchBordillo();
      fetchSegmentos();
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch(`/api/bordillos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const updatedBordillo = await response.json();
      setBordillo(updatedBordillo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating bordillo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/bordillos/${id}`, { method: 'DELETE' });
      router.push('/bordillos');
    } catch (error) {
      console.error('Error deleting bordillo:', error);
    }
  };

  return (
    <MyLayout>
      <h1>Bordillo {bordillo?.material}</h1>
      {bordillo && (
        <>
          <Form form={form} layout="vertical">
            <Form.Item
              name="altura"
              label="Altura"
              rules={[{ required: true, message: 'Por favor ingresa la altura' }]}
            >
              <Input type="number" disabled={!isEditing} />
            </Form.Item>
            <Form.Item
              name="material"
              label="Material"
              rules={[{ required: true, message: 'Por favor ingresa el material' }]}
            >
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item
              name="segmentoId"
              label="Segmento"
              rules={[{ required: true, message: 'Por favor selecciona un segmento' }]}
            >
              <Select disabled={!isEditing} placeholder="Selecciona un segmento">
                {segmentos.map(seg => (
                  <Select.Option key={seg.id} value={seg.id}>
                    {seg.numeroSegmento} {/* Asume que `numeroSegmento` es el nombre del segmento */}
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
              title: 'Eliminar Bordillo',
              content: '¿Estás seguro de que quieres eliminar este bordillo?',
              onOk: handleDelete,
            });
          }}>Eliminar</Button>
        </>
      )}
    </MyLayout>
  );
};

export default BordilloPage;

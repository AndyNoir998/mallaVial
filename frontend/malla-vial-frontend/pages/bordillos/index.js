import MyLayout from '../../components/Layout';
import BordilloTable from '../../components/BordilloTable'; // Necesitas crear un componente similar a CalzadaTable
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';

const BordilloPage = () => {
  const [bordillos, setBordillos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [segmentos, setSegmentos] = useState([]);

  useEffect(() => {
    // Cargar bordillos y segmentos
    const fetchBordillos = async () => {
      try {
        const response = await fetch('/api/bordillos');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setBordillos(data);
      } catch (error) {
        console.error('Error fetching bordillos:', error);
      }
    };

    const fetchSegmentos = async () => {
      try {
        const response = await fetch('/api/segmentos');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setSegmentos(data);
      } catch (error) {
        console.error('Error fetching segmentos:', error);
      }
    };

    fetchBordillos();
    fetchSegmentos();
  }, []);

  const showCreateModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch('/api/bordillos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const newBordillo = await response.json();
      setBordillos([...bordillos, newBordillo]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error creating bordillo:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <MyLayout>
      <h1>Bordillos</h1>
      <Button type="primary" onClick={showCreateModal}>Crear Bordillo</Button>
      <BordilloTable data={bordillos} /> {/* Componente para mostrar la tabla de bordillos */}
      <Modal title="Crear Bordillo" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="altura" label="Altura" rules={[{ required: true, message: 'Por favor ingrese la altura!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="material" label="Material" rules={[{ required: true, message: 'Por favor ingrese el material!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="segmentoId" label="Segmento" rules={[{ required: true, message: 'Por favor seleccione un segmento!' }]}>
            <Select>
              {segmentos.map(seg => (
                <Select.Option key={seg.id} value={seg.id}>
                  {seg.numeroSegmento}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </MyLayout>
  );
};

export default BordilloPage;

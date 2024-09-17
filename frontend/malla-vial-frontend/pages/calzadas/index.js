import MyLayout from '../../components/Layout';
import CalzadaTable from '../../components/CalzadaTable';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';

const CalzadasPage = () => {
  const [calzadas, setCalzadas] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCalzadas = async () => {
      try {
        const response = await fetch('/api/calzadas');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCalzadas(data);
      } catch (error) {
        console.error('Error fetching calzadas:', error);
      }
    };
    fetchCalzadas();
  }, []);

  const showCreateModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch('/api/calzadas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const newCalzada = await response.json();
      setCalzadas([...calzadas, newCalzada]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error creating calzada:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <MyLayout>
      <h1>Calzadas</h1>
      <Button type="primary" onClick={showCreateModal}>Crear Calzada</Button>
      <CalzadaTable data={calzadas} />
      <Modal title="Crear Calzada" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="tipoPavimento" label="Tipo de Pavimento" rules={[{ required: true, message: 'Por favor ingrese el tipo de pavimento!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="ancho" label="Ancho" rules={[{ required: true, message: 'Por favor ingrese el ancho!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="segmentoId" label="Segmento" rules={[{ required: true, message: 'Por favor seleccione un segmento!' }]}>
            <Select>
              {/* Cargar los segmentos disponibles aquí */}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </MyLayout>
  );
};

export default CalzadasPage;

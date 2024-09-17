import MyLayout from '../../components/Layout';
import SegmentTable from '../../components/SegmentTable';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Float } from 'antd';

const SegmentosPage = () => {
  const [segments, setSegments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const response = await fetch('/api/segmentos');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setSegments(data);
      } catch (error) {
        console.error('Error fetching segments:', error);
      }
    };
    fetchSegments();
  }, []);

  const showCreateModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch('/api/segmentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const newSegment = await response.json();
      setSegments([...segments, newSegment]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error creating segment:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <MyLayout>
      <h1>Segmentos</h1>
      <Button type="primary" onClick={showCreateModal}>Crear Segmento</Button>
      <SegmentTable data={segments} />
      <Modal title="Crear Segmento" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="numeroSegmento" label="Número de Segmento" rules={[{ required: true, message: 'Por favor ingrese el número de segmento!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="direccion" label="Dirección" rules={[{ required: true, message: 'Por favor ingrese la dirección!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="longitud" label="Longitud" rules={[{ required: true, message: 'Por favor ingrese la longitud!' }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </MyLayout>
  );
};

export default SegmentosPage;

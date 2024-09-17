import { Table, Button } from 'antd';
import React from 'react';

const SegmentTable = ({ data, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Número de Segmento',
      dataIndex: 'numeroSegmento',
      key: 'numeroSegmento',
    },
    {
      title: 'Dirección',
      dataIndex: 'direccion',
      key: 'direccion',
    },
    {
      title: 'Longitud',
      dataIndex: 'longitud',
      key: 'longitud',
    },
    {
      title: 'Número de Calzadas',
      render: (text, record) => record.calzadas ? record.calzadas.length : 0,
      key: 'calzadas',
    },
    {
      title: 'Número de Bordillos',
      render: (text, record) => record.bordillos ? record.bordillos.length : 0,
      key: 'bordillos',
    },
    {
      title: 'Acciones',
      render: (text, record) => (
        <span>
          <Button onClick={() => onEdit(record.id)}>Editar</Button>
          <Button onClick={() => onDelete(record.id)} type="danger">Eliminar</Button>
        </span>
      ),
      key: 'actions',
    }
  ];

  return <Table dataSource={data} columns={columns} rowKey="id" />;
};

export default SegmentTable;

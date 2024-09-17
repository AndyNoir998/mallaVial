
import { Table } from 'antd';
import React from 'react';

const CalzadaTable = ({ data }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tipo de Pavimento',
      dataIndex: 'tipoPavimento',
      key: 'tipoPavimento',
    },
    {
      title: 'Ancho',
      dataIndex: 'ancho',
      key: 'ancho',
    },
    {
      title: 'Segmento ID',
      dataIndex: ['segmento', 'id'], // Usando acceso anidado si el segmento es un objeto
      key: 'segmentoId',
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default CalzadaTable;

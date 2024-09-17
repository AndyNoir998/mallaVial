
import { Table } from 'antd';
import React from 'react';

const BordilloTable = ({ data }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Altura',
      dataIndex: 'altura',
      key: 'altura',
    },
    {
      title: 'Material',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: 'Segmento ID',
      dataIndex: ['segmento', 'id'], // Usando acceso anidado si el segmento es un objeto
      key: 'segmentoId',
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default BordilloTable;

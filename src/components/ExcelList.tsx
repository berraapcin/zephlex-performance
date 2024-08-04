import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { Table } from 'antd';

interface ExcelListProps {
 
}

interface ExcelListData {
  entryDate: string;
  stockName: string;
  exitDate: string;
}

const ExcelList: React.FC<ExcelListProps> = () => {
  const [excelDetail, setExcelDetail] = useState<ExcelListData[]>([]);
  const { stockName } = useParams(); 

  useEffect(() => {
  
    fetch(`/excel_verileri/${stockName}`) 
      .then((response) => response.json())
      .then((data) => {
        setExcelDetail(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [stockName]);

  const columns = [
    {
      title: 'Giriş Tarihi',
      dataIndex: 'entryDate',
      key: 'entryDate',
    },
    {
      title: 'Hisse Adı',
      dataIndex: 'stockName',
      key: 'stockName',
    },
    {
      title: 'Çıkış Tarihi',
      dataIndex: 'exitDate',
      key: 'exitDate',
    },
  ];

  const data = excelDetail.map((entry, index) => ({
    key: index,
    entryDate: entry.entryDate,
    stockName: entry.stockName,
    exitDate: entry.exitDate,
  }));

  return (
    <div>
      <h1>{stockName} Excel Dosyası Detaylar </h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ExcelList;
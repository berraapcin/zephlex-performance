// UploadExcel.tsx
import React, { useState } from 'react';
import { Button, Upload, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const UploadExcel: React.FC = () => {
  const [category, setCategory] = useState('Bülten Performansı');

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleUpload = async (info: any) => {
    if (info.file.status === 'done') {
      if (info.file.response && info.file.response.message) {
        message.success(info.file.response.message);

        try {
          const formData = new FormData();
          formData.append('entryDate', info.file.response.entryDate);
          formData.append('stockName', info.file.response.stockName);
          formData.append('exitDate', info.file.response.exitDate);
          formData.append('category', info.file.response.category);
          formData.append('excelFile', info.file.originFileObj);

          const response = await fetch('http://localhost:3001/upload-excel', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data);
          } else {
            console.error('API\'ye bilgi iletilirken bir hata oluştu.');
          }
        } catch (error) {
          console.error('API\'ye istek yapılırken bir hata oluştu:', error);
        }
      } else {
        message.success('Excel dosyası başarıyla yüklendi');
      }
    } else if (info.file.status === 'error') {
      message.error('Excel dosyası yüklenirken bir hata oluştu');
    }
  };

  return (
    <div>
      <h1>Excel Dosyası Yükle ve Kategori Seç</h1>

      <div style={{ marginBottom: '8px' }}>
        <Select value={category} style={{ width: 200 }} onChange={handleCategoryChange}>
          <Option value="Bülten Performansı">Bülten Performansı</Option>
        </Select>
      </div>

      <div>
        <Upload
          showUploadList={false}
          customRequest={() => {}} 
          onChange={handleUpload}
        >
          <Button icon={<UploadOutlined />}>Excel Dosyası Yükle</Button>
        </Upload>
      </div>
    </div>
  );
};

export default UploadExcel;

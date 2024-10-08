'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '../../lib/common/Button';
import { postRaffleItem } from '../../api/raffle/adminApi';
import useAuthStore from '../../lib/store/useAuthStore';

type FormData = {
  itemName: string;
  itemCategory: string;
  itemDescription: string;
  itemImage: string;
};

export default function AdminDashboard() {
  const [formData, setFormData] = useState<FormData>({
    itemName: '',
    itemCategory: '',
    itemDescription: '',
    itemImage: '',
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const adminToken = useAuthStore<string>((state) => state.userToken);

  const handleChange = (event: any) => {
    const { name, value, type, files } = event.target;
    if (type === 'file') {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = new FormData();
    data.append('name', formData.itemName);
    data.append('category', formData.itemCategory);
    data.append('description', formData.itemDescription);
    data.append('image', formData.itemImage);

    try {
      const response = await postRaffleItem(adminToken, data);
      console.log('Response:', response);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error posting item:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  return (
    <section className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[70%] bg-blue-50 border-solid border-[2px] border-primary rounded flex flex-col gap-4 p-8"
      >
        <label htmlFor="itemName" className="flex flex-col gap-2">
          물건 이름
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            placeholder="물건 이름을 입력 해주세요"
            className="p-4 rounded-lg border-solid border-[1px]"
          />
        </label>
        <label htmlFor="itemCategory" className="flex flex-col gap-2">
          카테고리
          <input
            type="number"
            name="itemCategory"
            value={formData.itemCategory}
            onChange={handleChange}
            placeholder="카테고리 수를 입력해주세요."
            className="p-4 rounded-lg border-solid border-[1px]"
          />
        </label>
        <label htmlFor="itemDescription" className="flex flex-col gap-2">
          설명
          <input
            type="text"
            name="itemDescription"
            value={formData.itemDescription}
            onChange={handleChange}
            placeholder="아이템 설명을 입력해주세요."
            className="p-4 rounded-lg border-solid border-[1px]"
          />
        </label>
        <label htmlFor="itemImage" className="flex flex-col gap-2">
          이미지 : 물건의 이미지를 올려주세요
          <input
            type="file"
            name="itemImage"
            onChange={handleChange}
            accept="image/*"
            className="p-4 rounded-lg border-solid border-[1px]"
          />
        </label>
        {previewImage && (
          <Image src={previewImage} alt="업로드 할 이미지" width="100" height="100" />
        )}
        <Button
          type="submit"
          label="올리기"
          width="full"
          fontSize=""
          className="font-bold text-white bg-primary hover:bg-blue-500"
        />
      </form>
    </section>
  );
}

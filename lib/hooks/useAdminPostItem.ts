import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import { postRaffleItem } from '../../api/raffle/adminApi';

interface AdminRegFormData {
  itemName: string;
  itemCategory: number;
  itemDescription: string;
  itemImage: File | null;
}

export default function useAdminPostItem() {
  const userToken = useAuthStore((state) => state.userToken);
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<AdminRegFormData>({
    itemName: '',
    itemCategory: 0,
    itemDescription: '',
    itemImage: null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null); // 미리보기 이미지 상태

  const mutation = useMutation({
    mutationKey: ['postAdminItem'],
    mutationFn: (data: FormData) => postRaffleItem(userToken, data), // FormData 전송
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['raffleItems'] });
      alert('아이템 등록에 성공했습니다');
    },
    onError: (error: Error) => {
      alert('아이템 등록 실패');
      console.error('아이템 등록 실패', error);
    },
  });

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = event.target;
    if (type === 'file' && files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, itemImage: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRegisterAdminItem = () => {
    const data = new FormData();

    if (formData.itemImage) {
      data.append('image', formData.itemImage);
    }

    const createItemDto = {
      name: formData.itemName,
      category: formData.itemCategory,
      description: formData.itemDescription,
    };

    data.append(
      'createItemDto',
      new Blob([JSON.stringify(createItemDto)], { type: 'application/json' }),
    );

    mutation.mutate(data);
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleRegisterAdminItem,
    previewImage,
  };
}

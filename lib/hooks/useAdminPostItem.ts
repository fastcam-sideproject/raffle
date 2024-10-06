import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import { postRaffleItem } from '../../api/raffle/adminApi';

interface AdminRegFormData {
  itemName: string;
  itemCategory: number;
  itemDescription: string;
  itemImage: File | null; // 파일 타입으로 변경
}

export default function useAdminPostItem() {
  const userToken = useAuthStore((state) => state.userToken);
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<AdminRegFormData>({
    itemName: '',
    itemCategory: 0,
    itemDescription: '',
    itemImage: null, // 기본값을 null로 설정
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
      console.log(formData);
      console.error('아이템 등록 실패', error);
    },
  });

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = event.target;
    if (type === 'file' && files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, itemImage: file });
      setPreviewImage(URL.createObjectURL(file)); // 미리보기 URL 설정
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRegisterAdminItem = () => {
    const data = new FormData();

    // 이미지 파일 추가
    if (formData.itemImage) {
      data.append('image', formData.itemImage); // FormData에 파일 추가
    }

    // createItemDto 내부의 각 속성을 FormData에 추가
    data.append('name', formData.itemName); // 아이템 이름 추가
    data.append('category', String(formData.itemCategory)); // 카테고리 추가 (숫자 -> 문자열 변환)
    data.append('description', formData.itemDescription); // 설명 추가

    console.log(data); // FormData 확인용
    mutation.mutate(data); // FormData를 전송
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleRegisterAdminItem,
    previewImage,
  };
}

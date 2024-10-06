'use client';

import Image from 'next/image';
import Button from '../../lib/common/Button';
import useAdminPostItem from '../../lib/hooks/useAdminPostItem'; // 커스텀 훅 사용

export default function AdminItemRegForm() {
  const { formData, handleChange, handleRegisterAdminItem, previewImage } = useAdminPostItem();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleRegisterAdminItem();
      }}
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
      {previewImage && <Image src={previewImage} alt="업로드 할 이미지" width={100} height={100} />}
      <Button
        type="submit"
        label="올리기"
        width="full"
        fontSize=""
        className="font-bold text-white bg-primary hover:bg-blue-500"
      />
    </form>
  );
}

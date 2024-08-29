'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendContactEmail } from '../../app/api/contact';
import Button from '../../lib/common/Button';
import EmailPopUp from './EmailPopUp';
import useOrdererInfo from '../../lib/hooks/useOrdererInfo';
import NoUserToken from '../ErrorPages/NoUserToken';

const initialContact = {
  from: '',
  title: '',
  content: '',
  inquiryType: 'one_on_one',
};

export default function EmailForm() {
  const { data, isLoading, userToken } = useOrdererInfo();
  const [contact, setContact] = useState(initialContact);
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  const [popUpMessage, setPopUpMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (data?.email) {
      setContact((prev) => ({
        ...prev,
        from: data.email,
      }));
    }
  }, [data]);

  if (!userToken) {
    return <NoUserToken />;
  }

  if (isLoading) {
    return <p>이메일을 불러오고 있습니다</p>;
  }

  const openPopUp = (message: string) => {
    setPopUpMessage(message);
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
    router.push('/');
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { value, name } = event.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await sendContactEmail(contact);
      openPopUp('메일이 성공적으로 발송되었습니다.');
    } catch (error) {
      openPopUp('메일 전송에 실패했습니다. 다시 시도해주세요.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-11/12 lg:w-1/2 my-8 p-8 border-primary border-solid border-[1px] rounded-xl gap-4 bg-blue-50"
    >
      <label htmlFor="inquiry-select">문의 메뉴</label>
      <select
        className="w-1/3 h-10 rounded"
        name="inquiryType"
        id="inquiry-select"
        onChange={handleChange}
        value={contact.inquiryType}
      >
        <option value="one_on_one">1대1 문의</option>
        <option value="account_deletion">계정 삭제 문의</option>
      </select>
      <label htmlFor="from" className="flex flex-col gap-4">
        이메일
        <input
          type="email"
          name="from"
          id="from"
          placeholder="이메일을 입력해주세요"
          className="p-4 rounded-lg border-solid border-[1px] ring-primary"
          onChange={handleChange}
          value={contact.from}
          required
        />
        {data?.email ? '' : <span className="text-red-500">이메일 정보를 불러올 수 없습니다.</span>}
      </label>
      <label htmlFor="title" className="flex flex-col gap-4">
        제목
        <input
          type="text"
          name="title"
          id="title"
          placeholder="제목을 입력해주세요"
          className="p-4 rounded-lg border-solid border-[1px]"
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="content" className="flex flex-col gap-4">
        문의내용
        <textarea
          name="content"
          id="content"
          rows={5}
          placeholder="내용을 입력해주세요"
          className="p-4 rounded-lg border-solid border-[1px] resize-none"
          onChange={handleChange}
          required
        />
      </label>
      <Button
        disabled={loading}
        type="submit"
        label={loading ? '잠시만 기다려주세요' : '메일 보내기'}
        ariaLabel={loading ? '잠시만 기다려주세요' : '메일 보내기'}
        fontSize="lg"
        width="full"
        className={`bg-primary ${loading ? 'cursor-not-allowed bg-gray-500' : 'hover:bg-blue-500'}`}
      />
      {isPopUpOpen && <EmailPopUp onClose={closePopUp}>{popUpMessage}</EmailPopUp>}
    </form>
  );
}

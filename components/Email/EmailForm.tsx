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
    <>
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
          {data?.email ? (
            ''
          ) : (
            <span className="text-red-500">이메일 정보를 불러올 수 없습니다.</span>
          )}
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
          width="auto"
          className={`text-white font-bold bg-primary ${loading ? 'cursor-not-allowed bg-gray-500' : 'hover:bg-blue-500'}`}
        />
        {isPopUpOpen && <EmailPopUp onClose={closePopUp}>{popUpMessage}</EmailPopUp>}
      </form>
      <div className="flex flex-col w-11/12 lg:w-1/2 my-8 p-8 border-primary border-solid border-[1px] rounded-xl gap-4 bg-blue-50">
        <h2 className="shadow-custom-light w-full bg-primary p-4 text-lg text-center font-bold rounded-lg text-shadow-white-shadow">
          개인정보 삭제 방침
        </h2>
        <p className="p-4 bg-white rounded leading-loose">
          사용자가 계정 삭제를 요청하기 위해 따라야 할 단계는 다음과 같습니다:
          <br /> 계정 삭제 요청 메뉴 를 선택하고 메일을 작성하여 보내시면 됩니다.
          <br /> 메일에는 반드시 <b>계정 정보</b>와 <b>삭제 요청 사유</b>를 포함해야 합니다.
        </p>
      </div>
    </>
  );
}

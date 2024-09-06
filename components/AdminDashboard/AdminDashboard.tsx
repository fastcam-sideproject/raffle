import Button from '../../lib/common/Button';

export default function AdminDashboard() {
  return (
    <>
      <section className="flex justify-center">
        <form
          action=""
          className="w-[70%] bg-blue-50 border-solid border-[2px] border-primary rounded flex flex-col gap-4 p-8"
        >
          <label htmlFor="itemName" className="flex flex-col gap-2">
            물건 이름
            <input
              type="text"
              name="itemName"
              placeholder="물건 이름을 입력 해주세요"
              className="p-4 rounded-lg border-solid border-[1px]"
            />
          </label>
          <label htmlFor="itemMaxTickt" className="flex flex-col gap-2">
            티켓수
            <input
              type="text"
              name="itemMaxTickt"
              placeholder="티켓 수 를 입력 해주세요."
              className="p-4 rounded-lg border-solid border-[1px]"
            />
          </label>
          <label htmlFor="itemMaxTickt" className="flex flex-col gap-2">
            이미지
            <input
              type="file"
              name="itemImage"
              placeholder="이미지를 올려주세요"
              accept="image/*"
              className="flex flex-col gap-2"
            />
          </label>
          <Button
            type={'button'}
            label={'올리기'}
            width={'full'}
            fontSize={''}
            className="font-bold text-white bg-primary hover:bg-blue-500"
          />
        </form>
      </section>
    </>
  );
}

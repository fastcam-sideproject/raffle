export default function NoUserToken() {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-10 my-8">
      <h2 className="bg-primary lg:w-3/12 text-center px-4 py-2 text-2xl font-semibold text-white border-solid border-2 border-blue-500 rounded-xl w-11/12">
        로그인 해주세요
      </h2>
      <p className=" lg:w-2/4 text-center text-lg p-2 w-11/12">상단 오른쪽에서 로그인 해주세요!</p>
    </section>
  );
}

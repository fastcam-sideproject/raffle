// import { useQuery } from '@tanstack/react-query';
// import { postRaffleItem } from '../../api/raffle/adminApi';
// import useAuthStore from '../../lib/store/useAuthStore';

// export default function PostItem() {
//   const adminToken = useAuthStore((state) => state.userToken);

//   const { data } = useQuery({
//     queryKey: ['PostRaffleItem'],
//     queryFn: () => postRaffleItem(adminToken),
//     staleTime: 60 * 3,
//     enabled: !!adminToken,
//   });

//   console.log(data);
//   return <></>;
// }

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purchase',
};

export default function PuchaseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

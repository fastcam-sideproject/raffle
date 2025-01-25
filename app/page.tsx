import AuthHandler from '@/components/AuthHandler';
import HomeMain from '@/components/Home/HomeMain';
import HeaderNav from '@/components/Header/HeaderNav';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <>
      <HeaderNav />
      <HomeMain />
      <AuthHandler />
      <Button variant="default" size="default" enabled={true}>
        Enabled Button
      </Button>
      <Button variant="default" size="default" enabled={false}>
        Disabled Button
      </Button>
    </>
  );
}

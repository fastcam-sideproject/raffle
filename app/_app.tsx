import Script from 'next/script';

export default function HeaderScript() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2820184336962070"
      crossOrigin="anonymous"
    />
  );
}

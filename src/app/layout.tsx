export const metadata = {
  title: "Lynixi",
  description: "Cybersecurity Talent Marketplace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

type FilterLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function NotesFilterLayout({ children, sidebar }: FilterLayoutProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 24,
        padding: '24px',
        maxWidth: 1100,
        margin: '0 auto',
        alignItems: 'flex-start',
      }}
    >
      <aside style={{ width: 220, flexShrink: 0 }}>{sidebar}</aside>
      <section style={{ flex: 1, minWidth: 0 }}>{children}</section>
    </div>
  );
}

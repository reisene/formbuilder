interface DocsPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const path = slug.join('/');

  return (
    <article className="container py-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/docs">Docs</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {path}
          </li>
        </ol>
      </nav>
      <h1>Dokumentacja: {path}</h1>
      <p>
        Treść dokumentacji dla ścieżki <code>/docs/{path}</code> nie została jeszcze przygotowana.
      </p>
    </article>
  );
}

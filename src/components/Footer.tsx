import Image from 'next/image';
import Link from 'next/link';
import type { IconType } from 'react-icons';

export default function Footer({
  author,
}: {
  author: { name: string; url: string; ico: string | IconType };
}) {
  const Icon = typeof author.ico === 'string' ? undefined : author.ico;

  return (
    <footer
      className="text-center text-lg-start mt-auto border-top"
      style={{ backgroundColor: 'var(--content-background)', color: 'var(--foreground)' }}
    >
      <div className="text-center p-3">
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            flexWrap: 'wrap',
          }}
        >
          <span>Copyright &copy; {new Date().getFullYear()}</span>
          <Link
            href={author.url}
            className="text-decoration-none text-reset fw-bolder font-monospace"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            {typeof author.ico === 'string' ? (
              <Image
                src={author.ico}
                alt={author.name}
                width={25}
                height={25}
                style={{
                  borderRadius: '50%',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
            ) : Icon ? (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  lineHeight: 0,
                }}
              >
                <Icon size={20} />
              </span>
            ) : null}
            {author.name}
          </Link>
          <span className="mx-2 d-none d-sm-inline">|</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

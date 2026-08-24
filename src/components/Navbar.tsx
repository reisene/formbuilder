'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';

import { Noto_Sans_Mono } from 'next/font/google';

const notoMono = Noto_Sans_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const navlinks = [
  { href: '/', label: 'Home' },
  { href: '/editor', label: 'Editor' },
  { href: '/docs', label: 'Docs' },
  { href: '/about', label: 'About', disabled: true },
];

import { BsGithub } from 'react-icons/bs';
import site from '@/config/site';

const RepoLink = () => {
  return (
    <Link
      href={site.repo}
      target="_blank"
      rel="noopener noreferrer"
      className="text-decoration-none text-reset"
      title="View source code on GitHub"
      aria-label="View source code on GitHub"
    >
      <span className="visually-hidden">View source code on GitHub</span>
      <BsGithub size={24} />
    </Link>
  );
};

function AppNavbar() {
  const pathname = usePathname();

  const navRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const updateIndicator = useCallback(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }
    const activeLink = nav.querySelector<HTMLAnchorElement>('.nav-link.active');
    if (!activeLink) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    setIndicator({
      left: activeLink.offsetLeft,
      top: activeLink.offsetTop,
      width: activeLink.offsetWidth,
      height: activeLink.offsetHeight,
      visible: true,
    });
  }, []);

  useEffect(() => {
    updateIndicator();
  }, [pathname, updateIndicator]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    document.addEventListener('shown.bs.offcanvas', updateIndicator);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        updateIndicator();
      });
    }
    return () => {
      window.removeEventListener('resize', updateIndicator);
      document.removeEventListener('shown.bs.offcanvas', updateIndicator);
    };
  }, [updateIndicator]);

  return (
    <Navbar expand="lg" sticky="top" className={notoMono.className}>
      <Container>
        <Navbar.Brand as={Link} href="/" className="d-inline-flex align-items-center gap-2">
          <img alt="Form Builder Logo" src="/formbuilder.svg" width="50" height="50" />
          Form Builder
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />

        <Navbar.Offcanvas
          className={notoMono.className}
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id="offcanvasNavbarLabel-expand-lg"
              className="d-inline-flex align-items-center gap-2"
            >
              <img alt="Form Builder Logo" src="formbuilder.svg" width="50" height="50" />
              Form Builder
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav
              ref={navRef}
              className="nav-active-container justify-content-end flex-grow-1 align-items-center"
            >
              <span
                className="nav-active-indicator"
                style={{
                  left: indicator.left,
                  top: indicator.top,
                  width: indicator.width,
                  height: indicator.height,
                  opacity: indicator.visible ? 1 : 0,
                }}
                aria-hidden="true"
              />
              {navlinks.map((link) => (
                <Nav.Link
                  key={link.href}
                  as={Link}
                  href={link.disabled ? '#' : link.href}
                  active={!link.disabled && isLinkActive(link.href)}
                  aria-disabled={link.disabled || undefined}
                  tabIndex={link.disabled ? -1 : undefined}
                  onClick={link.disabled ? (e) => e.preventDefault() : undefined}
                >
                  {link.label}
                </Nav.Link>
              ))}
              <ThemeToggle />
              <RepoLink />
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;

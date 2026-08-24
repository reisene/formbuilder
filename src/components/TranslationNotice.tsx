'use client';

import { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import {
  closeTranslationNotice,
  getPreferredLanguage,
  hasClosedTranslationNotice,
} from '@/config/lang';

import site from '@/config/site';

const ignoredLanguages = new Set(['en']);

export default function TranslationNotice() {
  const [show, setShow] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const preferredLanguage = getPreferredLanguage();

    if (ignoredLanguages.has(preferredLanguage)) return;
    if (hasClosedTranslationNotice()) return;

    setLanguage(preferredLanguage);
    setShow(true);
  }, []);

  const handleClose = () => {
    closeTranslationNotice();
    setShow(false);
  };

  if (!show) return null;

  return (
    <Alert variant="info" dismissible onClose={handleClose} className="mb-0 rounded-0 text-center">
      <div className="vstack gap-2 align-items-center">
        <p className="mb-0">
          Your browser language is <strong>{language}</strong>. The site is currently available only
          in English. Want to help translate it?
        </p>
        <div className="hstack gap-2 justify-content-center">
          <Button href={site.repo} variant="info" size="sm">
            Contribute on Github
          </Button>
          <a
            href={`mailto:${site.author.mail}?subject=Translation help for Form Builder`}
            className="alert-link"
          >
            or contact me
          </a>
        </div>
      </div>
    </Alert>
  );
}

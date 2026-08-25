import * as Sentry from '@sentry/nextjs';

interface CopyOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  formatTag?: 'json' | 'html' | 'react'; // Opcjonalny tag dla Sentry
}

export async function handleCopyText(text: string, options?: CopyOptions): Promise<void> {
  try {
    if (typeof window === 'undefined') return;

    await navigator.clipboard.writeText(text);

    if (options?.onSuccess) {
      options.onSuccess();
    }
  } catch (err) {
    console.error('Failed to copy the code:', err);
    Sentry.captureException(err, {
      tags: {
        mechanism: 'copy-to-clipboard',
        export_format: options?.formatTag || 'unknown',
      },
    });

    if (options?.onError) {
      options.onError(err);
    }

    throw err;
  }
}

interface DownloadOptions {
  onError?: (error: unknown) => void;
}

async function downloadJsonFile(content: string, defaultFileName: string) {
  if (typeof window !== 'undefined' && 'showSaveFilePicker' in window) {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: defaultFileName,
        types: [
          {
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          },
        ],
      });

      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        throw err;
      }
    }
  } else {
    if (typeof window === 'undefined') return;

    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = defaultFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
}

export const handleDownloadJson = async (
  code: string,
  options?: DownloadOptions,
): Promise<void> => {
  try {
    const fileName = `form-schema-${new Date().toISOString().slice(0, 10)}.json`;
    await downloadJsonFile(code, fileName);
  } catch (err) {
    console.error('Error while downloading file:', err);

    if (options?.onError) {
      options.onError(err);
    }

    throw err;
  }
};

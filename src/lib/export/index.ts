export { handleDownloadJson } from './fileDownload';
export { handleCopyText } from './copyCode';

export type ExportFormat = 'json' | 'html' | 'react';

export interface ExportModalProps {
  show: boolean;
  onHide: () => void;
}

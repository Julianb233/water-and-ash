'use client';

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Printer, QrCode, Link2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QRGeneratorProps {
  defaultUrl?: string;
  title?: string;
  description?: string;
}

const presetUrls = [
  { label: 'Homepage', path: '/' },
  { label: 'Contact / Schedule', path: '/contact' },
  { label: 'The Osprey', path: '/services/osprey' },
  { label: 'White Nights', path: '/services/white-nights' },
  { label: 'Relentless', path: '/services/relentless' },
  { label: 'At-Home Memorial', path: '/services/at-home' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Funeral Homes', path: '/funeral-homes' },
  { label: 'Links Page', path: '/links' },
];

const BASE_URL = 'https://waterandashburials.org';

export function QRGenerator({
  defaultUrl = '',
  title = 'QR Code Generator',
  description = 'Generate QR codes for your print materials — brochures, business cards, flyers, and partnership materials.',
}: QRGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [url, setUrl] = useState(defaultUrl || `${BASE_URL}/contact`);
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generateQR = async (targetUrl: string) => {
    if (!canvasRef.current) return;
    try {
      await QRCode.toCanvas(canvasRef.current, targetUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#0a1628', // navy
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      });
      setGenerated(true);
    } catch {
      console.error('Failed to generate QR code');
    }
  };

  useEffect(() => {
    generateQR(url);
  }, [url]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `water-and-ash-qr-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !canvasRef.current) return;
    const imgData = canvasRef.current.toDataURL('image/png');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head><title>QR Code — Water & Ash</title></head>
        <body style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin:0;font-family:serif;">
          <img src="${imgData}" style="width:300px;height:300px;" />
          <p style="margin-top:16px;color:#666;font-size:14px;">${url}</p>
          <p style="color:#999;font-size:12px;">Water & Ash Burials — San Diego</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Preset pages */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-foreground mb-3">
          Select a page
        </label>
        <div className="flex flex-wrap gap-2">
          {presetUrls.map((preset) => {
            const fullUrl = `${BASE_URL}${preset.path}`;
            const isActive = url === fullUrl;
            return (
              <button
                key={preset.path}
                onClick={() => setUrl(fullUrl)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'btn-gold text-navy border-0'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom URL input */}
      <div className="mb-8">
        <label
          htmlFor="qr-url"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Or enter a custom URL
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="qr-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://waterandashburials.org/..."
              className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            className="h-12 w-12 rounded-xl shrink-0"
            title="Copy URL"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* QR Code display */}
      <div className="card-premium rounded-2xl p-8 text-center">
        <canvas ref={canvasRef} className="mx-auto" />

        {generated && (
          <>
            <p className="mt-4 text-sm text-muted-foreground break-all">
              {url}
            </p>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                onClick={handleDownload}
                className="btn-gold border-0 rounded-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PNG
              </Button>
              <Button
                onClick={handlePrint}
                variant="outline"
                className="rounded-full"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Usage tips */}
      <div className="mt-8 rounded-2xl bg-secondary/50 p-6">
        <h3 className="font-serif font-semibold text-foreground mb-3">
          Print Material Tips
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <QrCode className="h-4 w-4 text-gold mt-0.5 shrink-0" />
            <span>
              Download the PNG at high resolution for brochures and flyers
            </span>
          </li>
          <li className="flex gap-2">
            <QrCode className="h-4 w-4 text-gold mt-0.5 shrink-0" />
            <span>
              For business cards, the QR code should be at least 1 inch (2.5 cm)
              square
            </span>
          </li>
          <li className="flex gap-2">
            <QrCode className="h-4 w-4 text-gold mt-0.5 shrink-0" />
            <span>
              Use the /links page QR code for a single code that links to everything
            </span>
          </li>
          <li className="flex gap-2">
            <QrCode className="h-4 w-4 text-gold mt-0.5 shrink-0" />
            <span>
              QR codes use high error correction so they scan reliably even on textured paper
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

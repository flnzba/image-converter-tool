import { NextResponse } from 'next/server';
import sharp from 'sharp';
import jsPDF from 'jspdf';

// Define allowed formats type
type ImageFormat = 'jpg' | 'png' | 'webp';

// Helper function to validate format
function isValidImageFormat(format: string): format is ImageFormat {
  return ['jpg', 'png', 'webp'].includes(format);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const format = formData.get('format') as string;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // First convert input to buffer, regardless of input format
    const processedBuffer = buffer;

    // If output format is PDF
    if (format === 'pdf') {
      // Convert any input format to PNG first
      const pngBuffer = await sharp(processedBuffer).png().toBuffer();

      // Get image dimensions
      const metadata = await sharp(pngBuffer).metadata();
      const { width = 595, height = 842 } = metadata;

      // Create PDF with image dimensions
      const doc = new jsPDF({
        orientation: width > height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [width, height],
      });

      // Convert to base64 and add to PDF
      const imageData = `data:image/png;base64,${pngBuffer.toString('base64')}`;
      doc.addImage(imageData, 'PNG', 0, 0, width, height);

      // Get PDF as buffer
      const outputBuffer = Buffer.from(doc.output('arraybuffer'));

      return new NextResponse(outputBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="converted.pdf"',
        },
      });
    }

    // For image format outputs
    if (!isValidImageFormat(format)) {
      return new NextResponse('Invalid format', { status: 400 });
    }

    // Convert to requested format
    const sharpInstance = sharp(processedBuffer);
    const outputBuffer = await (format === 'jpg'
      ? sharpInstance.jpeg()
      : format === 'png'
      ? sharpInstance.png()
      : sharpInstance.webp()
    ).toBuffer();

    return new NextResponse(outputBuffer, {
      headers: {
        'Content-Type': `image/${format}`,
        'Content-Disposition': `attachment; filename="converted.${format}"`,
      },
    });
  } catch (error) {
    console.error('Conversion error:', error);
    return new NextResponse('Conversion failed', { status: 500 });
  }
}

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const targetDir = formData.get('dir') as string | null; // e.g. "team/2025" or "events"

    if (!file || !targetDir) {
      return NextResponse.json({ error: 'Missing file or dir parameter' }, { status: 400 });
    }

    // Sanitize directory — only allow specific patterns
    const dirPattern = /^(team\/\d{4}|events)$/;
    if (!dirPattern.test(targetDir)) {
      return NextResponse.json({ error: 'Invalid directory' }, { status: 400 });
    }

    // Validate file type
    const ext = extname(file.name).toLowerCase();
    const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    if (!allowedExts.includes(ext)) {
      return NextResponse.json({ error: 'Invalid file type. Allowed: jpg, png, webp, gif' }, { status: 400 });
    }

    // Sanitize filename
    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.\-_]/g, '-')
      .replace(/-+/g, '-');

    // Ensure directory exists
    const dirPath = join(process.cwd(), 'public', targetDir);
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = join(dirPath, safeName);
    writeFileSync(filePath, buffer);

    const publicPath = `/${targetDir}/${safeName}`;
    return NextResponse.json({ success: true, path: publicPath });
  } catch (err) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_FILES = ['teams', 'events', 'projects', 'domains', 'timeline', 'site'];

function getFilePath(file: string) {
  return join(process.cwd(), 'src', 'data', file + '.json');
}

export async function GET(req: NextRequest) {
  try {
    const file = req.nextUrl.searchParams.get('file');
    if (!file || !ALLOWED_FILES.includes(file)) {
      return NextResponse.json({ error: 'Invalid file parameter' }, { status: 400 });
    }

    const filePath = getFilePath(file);
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const data = readFileSync(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const file = req.nextUrl.searchParams.get('file');
    if (!file || !ALLOWED_FILES.includes(file)) {
      return NextResponse.json({ error: 'Invalid file parameter' }, { status: 400 });
    }

    const body = await req.json();
    const filePath = getFilePath(file);
    writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to write file' }, { status: 500 });
  }
}

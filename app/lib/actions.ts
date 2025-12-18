import { promises as fs } from 'fs';
import path from 'path';

export async function uploadFile(
  file: File,
  option?: { filepath?: string; filename?: string },
): Promise<string> {
  if (file.size === 0) {
    throw new Error('No file provided');
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File size exceeds the 5MB limit');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = option?.filepath ?? 'uploads';
  const filename =
    option?.filename ?? `${Date.now()}-${file.name.replaceAll(' ', '_')}`;
  const dir = path.join(process.cwd(), 'public', filePath);

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), buffer);

  return `/${filePath}/${filename}`;
}

import crypto from 'crypto';
import { ReadStream } from 'fs';
import memoize from 'nano-memoize';
import { FILE_TAG } from './enum';
import base64url from 'base64-url';
import { Request } from 'express';
import mimetypeSniffer from 'stream-mmmagic';

const getRandomBytes = (size: number) =>
  crypto.randomBytes(size).toString('hex');

const getQuaterFromMonth = memoize((month: number) => {
  if (!month || typeof month !== 'number' || month < 0 || month > 11)
    throw new Error('MonthFormatInvalid');
  return Math.floor(month / 3) + 1;
});
// | 1 | 2 | 3 | 4
const getFirstMonthOfQuater = memoize((quater: number) => {
  if (!quater || typeof quater !== 'number' || quater < 1 || quater > 4)
    throw new Error('QuaterFormatInvalid');
  return (quater - 1) * 3;
});

const streamToBuffer = (
  stream: NodeJS.ReadStream | ReadStream,
  maxByteLength: number,
) => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => {
      if (chunks.length + chunk.length > maxByteLength) {
        return stream.destroy(new Error('ExccedSizeLimit'));
      }
      chunks.push(chunk);
    });
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
};

const decryptObject = memoize((data: any, secret: any) => {
  const resizedIV = Buffer.allocUnsafe(16),
    iv = crypto
      .createHash('sha256')
      .update(process.env.DIRECT_IMG_URL_HASH)
      .digest();
  iv.copy(resizedIV);
  const key = crypto.createHash('sha256').update(secret).digest(),
    decipher = crypto.createDecipheriv('aes256', key, resizedIV),
    decrypted = [];

  decrypted.push(decipher.update(data, 'hex', 'binary'));

  decrypted.push(decipher.final('binary'));
  return JSON.parse(decrypted.join(''));
});

const encryptObject = memoize((data: any, secret: any) => {
  let dataToEncypt: string;
  if (typeof data === 'object') {
    dataToEncypt = JSON.stringify(sortObjectProperty(data));
  }
  const resizedIV = Buffer.allocUnsafe(16),
    iv = crypto
      .createHash('sha256')
      .update(process.env.DIRECT_IMG_URL_HASH)
      .digest();
  iv.copy(resizedIV);
  const key = crypto.createHash('sha256').update(secret).digest(),
    cipher = crypto.createCipheriv('aes256', key, resizedIV),
    encrypted = [];

  encrypted.push(cipher.update(dataToEncypt, 'binary', 'hex'));

  encrypted.push(cipher.final('hex'));
  return encrypted.join('');
});

const sortObjectProperty = memoize((unsortedObj: any) => {
  return Object.keys(unsortedObj)
    .sort()
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: unsortedObj[key],
      }),
      {},
    );
});

const objectToHash = memoize((obj: any) => {
  return base64url.encode(JSON.stringify(obj));
});

const hashToObject = memoize(<T = any>(hash: string) => {
  return JSON.parse(base64url.decode(hash)) as T;
});

const getUserIpFromRequest = (req: Request) => {
  return (
    ((req.headers['x-forwarded-for'] as string) || '')
      .split(',')
      .pop()
      .trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress
  );
};

const sniffMimetype = async (
  stream: NodeJS.WriteStream,
): Promise<{
  mime: { type: string; encoding: string };
  outputStream: NodeJS.WriteStream;
}> => {
  const [mime, output] = await mimetypeSniffer.promise(stream);
  return { mime, outputStream: output };
};
const mimetypeToFileTag = memoize((mimetype: string): number => {
  mimetype = mimetype?.toLowerCase();

  if (
    mimetype ===
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ) {
    return FILE_TAG.PRESENTATION;
  }
  if (
    [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.oasis.opendocument.spreadsheet',
    ].includes(mimetype)
  ) {
    return FILE_TAG.SPREADSHEET;
  }
  if (
    [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.oasis.opendocument.text',
    ].includes(mimetype)
  ) {
    return FILE_TAG.DOCUMENT;
  }
  if (mimetype.startsWith('image/')) {
    return FILE_TAG.IMAGE;
  }
  if (mimetype.startsWith('video/')) {
    return FILE_TAG.VIDEO;
  }
  if (mimetype.startsWith('application/pdf')) {
    return FILE_TAG.PDF;
  }
  if (mimetype.startsWith('audio/')) {
    return FILE_TAG.AUDIO;
  }
  if (mimetype.startsWith('text/')) {
    return FILE_TAG.TEXT;
  }
  if (mimetype.startsWith('font/')) {
    return FILE_TAG.FONT;
  }
  if (
    [
      'application/x-archive',
      'application/x-cpio',
      'application/x-shar',
      'application/x-iso9660-image',
      'application/x-sbx',
      'application/x-tar',
      'application/x-bzip2',
      'application/gzip',
      'application/x-lzip',
      'application/x-lzma',
      'application/x-lzop',
      'application/x-snappy-framed',
      'application/x-xz',
      'application/x-compress',
      'application/x-compress',
      'application/zstd',
      'application/x-7z-compressed',
      'application/x-7z-compressed',
      'application/x-ace-compressed',
      'application/x-astrotite-afa',
      'application/x-alz-compressed',
      'application/vnd.android.package-archive',
      'application/x-freearc',
      'application/vnd.ms-cab-compressed',
      'application/x-apple-diskimage',
      'application/java-archive',
      'application/x-rar-compressed',
      'application/x-gtar',
      'application/zip',
    ].includes(mimetype)
  ) {
    return FILE_TAG.ARCHIVE;
  }
  return FILE_TAG.UNKNOWN;
});

const getHalfHoursOfDay = memoize(() => {
  const nowDate = new Date();
  if (nowDate.getHours() >= 0 && nowDate.getHours() <= 11) {
    nowDate.setHours(11, 59, 59);
  } else {
    nowDate.setHours(23, 0, 0);
  }
  return nowDate;
});
export {
  getRandomBytes,
  getQuaterFromMonth,
  getFirstMonthOfQuater,
  streamToBuffer,
  mimetypeToFileTag,
  objectToHash,
  hashToObject,
  sortObjectProperty,
  decryptObject,
  encryptObject,
  getUserIpFromRequest,
  sniffMimetype,
  getHalfHoursOfDay,
};

import { supabaseAdmin } from "./supabase-admin";

export async function uploadPublicFile(
  bucket: string,
  file: File,
  fileName: string
) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    throw error;
  }

  const { data } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function uploadPrivateFile(
  bucket: string,
  file: File,
  fileName: string
) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    throw error;
  }

  return fileName;
}

export async function createSignedUrl(
  bucket: string,
  fileName: string,
  expiresIn = 300
) {
  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .createSignedUrl(fileName, expiresIn);

  if (error) {
    throw error;
  }

  return data.signedUrl;
}
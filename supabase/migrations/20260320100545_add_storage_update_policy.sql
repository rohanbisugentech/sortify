CREATE POLICY "Users can update their own files" ON storage.objects FOR UPDATE USING (bucket_id = 'files' AND auth.uid()::text = (storage.foldername(name))[1]);

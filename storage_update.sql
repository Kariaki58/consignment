-- 1. Add image_url column to existing shipments table
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 2. Storage bucket setup
INSERT INTO storage.buckets (id, name, public) VALUES ('shipments', 'shipments', true) ON CONFLICT DO NOTHING;

-- 3. Storage policies
CREATE POLICY "Anyone can view shipment images" ON storage.objects
  FOR SELECT USING (bucket_id = 'shipments');

CREATE POLICY "Authenticated users can upload shipment images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'shipments' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update their shipment images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'shipments' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete their shipment images" ON storage.objects
  FOR DELETE USING (bucket_id = 'shipments' AND auth.role() = 'authenticated');

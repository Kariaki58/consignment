-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Shipments Table
CREATE TABLE shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(100) NOT NULL,
  estimated_delivery DATE,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  weight VARCHAR(50) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tracking Updates Table
CREATE TABLE tracking_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipment_id UUID REFERENCES shipments(id) ON DELETE CASCADE,
  status VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  time TIMESTAMP WITH TIME ZONE NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  icon VARCHAR(50) DEFAULT 'Package',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)

-- Shipments policies
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;

-- Anyone can read a shipment by tracking number
CREATE POLICY "Public can view shipments" ON shipments
  FOR SELECT USING (true);

-- Only authenticated users can insert their own shipments
CREATE POLICY "Users can create their own shipments" ON shipments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Only authenticated users can update their own shipments
CREATE POLICY "Users can update their own shipments" ON shipments
  FOR UPDATE USING (auth.uid() = user_id);

-- Only authenticated users can delete their own shipments
CREATE POLICY "Users can delete their own shipments" ON shipments
  FOR DELETE USING (auth.uid() = user_id);


-- Tracking updates policies
ALTER TABLE tracking_updates ENABLE ROW LEVEL SECURITY;

-- Anyone can read tracking updates
CREATE POLICY "Public can view tracking updates" ON tracking_updates
  FOR SELECT USING (true);

-- Only authenticated users who own the shipment can insert updates
CREATE POLICY "Users can insert tracking updates for their shipments" ON tracking_updates
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM shipments
      WHERE shipments.id = tracking_updates.shipment_id
      AND shipments.user_id = auth.uid()
    )
  );

-- Only authenticated users who own the shipment can update updates
CREATE POLICY "Users can update tracking updates for their shipments" ON tracking_updates
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM shipments
      WHERE shipments.id = tracking_updates.shipment_id
      AND shipments.user_id = auth.uid()
    )
  );

-- Only authenticated users who own the shipment can delete updates
CREATE POLICY "Users can delete tracking updates for their shipments" ON tracking_updates
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM shipments
      WHERE shipments.id = tracking_updates.shipment_id
      AND shipments.user_id = auth.uid()
    )
  );

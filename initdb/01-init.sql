-- Create replication user + demo table
CREATE ROLE repl WITH REPLICATION LOGIN PASSWORD 'repl';

CREATE TABLE IF NOT EXISTS public.test_data (
  id serial PRIMARY KEY,
  txt text,
  changed_at timestamptz DEFAULT now()
);

-- Logical replication setup
CREATE PUBLICATION demo_pub FOR TABLE public.test_data;

-- Seed data
INSERT INTO public.test_data (txt) VALUES ('hello'), ('world');

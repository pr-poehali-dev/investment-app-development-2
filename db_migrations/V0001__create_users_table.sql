CREATE TABLE t_p19168925_investment_app_devel.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  usdt_wallet VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);
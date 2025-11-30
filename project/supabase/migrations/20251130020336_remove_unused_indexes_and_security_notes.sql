/*
  # Remove Unused Indexes and Security Improvements
  
  ## Changes Made
  
  1. **Drop Unused Indexes**
     - Remove `idx_products_category` - category filtering is done client-side, not in SQL queries
     - This index slows down INSERT/UPDATE operations without providing query benefits
  
  2. **Indexes Kept (Currently Reported as Unused)**
     The following indexes are reported as "unused" but are actually essential for production:
     - `idx_products_featured` - Used on home page to filter featured products
     - `idx_cart_items_product_id` - Foreign key index for cart-product joins
     - `idx_order_items_order_id` - Foreign key index used in RLS policies
     - `idx_order_items_product_id` - Foreign key index for order-product joins
     - `idx_reviews_user_id` - Used in RLS policies and user review queries
     - `idx_orders_user` - Used in RLS policies for order ownership checks
     
     These indexes appear "unused" because the database has minimal data (0-12 rows per table).
     PostgreSQL performs full table scans on tiny datasets, which is faster than using indexes.
     As the application scales, these indexes will be critical for query performance.
  
  3. **Password Leak Protection**
     Note: Leaked password protection must be enabled in Supabase Dashboard:
     - Go to Authentication > Settings
     - Enable "Check for leaked passwords using HaveIBeenPwned"
     - This cannot be configured via SQL migration
  
  ## Security Notes
  - All RLS policies remain active and secure
  - Foreign key indexes ensure referential integrity and join performance
  - Removing unused indexes improves write performance
*/

-- Drop the category index since filtering is done client-side in the app
DROP INDEX IF EXISTS idx_products_category;

-- Note: If you plan to move category filtering to server-side SQL queries in the future,
-- you should recreate this index with: CREATE INDEX idx_products_category ON products(category);

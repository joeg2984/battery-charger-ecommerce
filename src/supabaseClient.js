// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://blvxgymjyhhumyakdytd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsdnhneW1qeWhodW15YWtkeXRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwNzg3OTIsImV4cCI6MjA0NTY1NDc5Mn0.6klW8VvqH1O5KKdeMchWASrIjgYoIf8qYcyoSvZ6I84';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


//const supabaseUrl = "postgresql://postgres.dgljibinkbkdctyaqxqa:[bojruj-rytfov-2Mencu]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
//const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnbGppYmlua2JrZGN0eWFxeHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzMTU4NzksImV4cCI6MjA0NTg5MTg3OX0.HZPxU0Jl98ZsTSQ_fv0jpEPxL6dCHpiYt76MGzqQRtM"
///const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnbGppYmlua2JrZGN0eWFxeHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzMTU4NzksImV4cCI6MjA0NTg5MTg3OX0.HZPxU0Jl98ZsTSQ_fv0jpEPxL6dCHpiYt76MGzqQRtM"
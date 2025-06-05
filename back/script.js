import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabase = createClient < Database > (
    process.env.SUPABASE_URL = 'https://xlzzltwiqbxfpgkvjxhl.supabase.co',
    process.env.SUPABASE_ANON_KEY 
);





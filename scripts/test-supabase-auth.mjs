import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in env');
  process.exit(2);
}

const supabase = createClient(url, anonKey);

async function run() {
  try {
    const timestamp = Date.now();
    const email = `test+${timestamp}@example.com`;
    const password = `TempPass!${Math.floor(Math.random()*9000)+1000}`;

    console.log('Attempting signUp for:', email);
    const res = await supabase.auth.signUp({ email, password });

    if (res.error) {
      console.error('SignUp error:', res.error.message);
      process.exitCode = 1;
    } else {
      console.log('SignUp result: ', {
        status: res.data?.user ? 'success' : 'ok',
        user_id: res.data?.user?.id ?? null,
        // Do not print tokens or secrets
      });

      // Clean up: attempt to delete the test user via admin API is not available with anon key.
      // We will output a reminder to remove the user manually from Supabase if needed.
      console.log('Note: test user was created. Remove manually from Supabase dashboard if desired.');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exitCode = 2;
  }
}

run();

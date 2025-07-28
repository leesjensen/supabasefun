import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vzitkpjhlgnabernixkl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6aXRrcGpobGduYWJlcm5peGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MjYzNjgsImV4cCI6MjA2OTMwMjM2OH0.z6yi8hJqkx56UNHJjYqo97BAi6TdlpafqwCWhG3e2xQ';

const supabase = await createClient(supabaseUrl, supabaseKey);

const [, , email, password] = process.argv;
if (!email || !password) {
  throw new Error('Usage: node supabase.js <email> <password>');
}
const r = await supabase.auth.signInWithPassword({
  email,
  password,
});

const user = r.data.user;
if (!user) {
  throw new Error('Authentication failed');
}

const foodTypes = ['fruit', 'vegetable', 'meat', 'seafood', 'grain', 'dairy', 'snack'];
const foodNames = {
  fruit: ['apple', 'banana', 'orange', 'grape', 'pear'],
  vegetable: ['carrot', 'broccoli', 'spinach', 'pepper', 'onion'],
  meat: ['chicken', 'beef', 'pork', 'lamb', 'duck'],
  seafood: ['salmon', 'shrimp', 'tuna', 'crab', 'lobster'],
  grain: ['rice', 'wheat', 'oats', 'barley', 'quinoa'],
  dairy: ['milk', 'cheese', 'yogurt', 'butter', 'cream'],
  snack: ['chips', 'cookies', 'popcorn', 'nuts', 'pretzels'],
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const randomType = getRandomItem(foodTypes);
const randomName = getRandomItem(foodNames[randomType]);
const { data: insertedFood, error } = await supabase
  .from('food')
  .insert([{ type: randomType, name: randomName }])
  .select();

if (error) {
  console.error('Insert error:', error);
} else {
  console.log('Inserted row:', insertedFood);
}

const { data: food } = await supabase.from('food').select();
console.log(JSON.stringify(food, null, 2));

export default supabase;

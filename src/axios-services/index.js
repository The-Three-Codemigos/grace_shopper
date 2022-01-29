import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// through AJAX calls to your React UI

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:
/* 

  export async function getUsers(){
    try{
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }

*/

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    console.error(err);
  }
}

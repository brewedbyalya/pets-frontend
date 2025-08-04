import * as petService from './services/petService'
import { useEffect, useState } from 'react'
import PetList from './components/PetList/PetList';

const App = () => {
  const [pets, setPets] = useState([]);

  useEffect(()=> {
   const fetchPets = async () => {
    try {
      const fetchedPets = await petService.index();
      setPets(fetchedPets); 
    } catch (err) { console.log(err) }
    }
    fetchPets(); 

  },[]);

  return (
    <>
    <PetList pets ={pets}/>
    </>
  );
};

export default App;

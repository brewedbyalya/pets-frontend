import * as petService from './services/petService'
import { useEffect, useState } from 'react'
import PetList from './components/PetList/PetList';
import PetDetail from './components/PetDetail/PetDetail';
import PetForm from './components/PetForm/PetForm';

const App = () => {
  const [pets, setPets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(()=> {
   const fetchPets = async () => {
    try {
      const fetchedPets = await petService.index();
      setPets(fetchedPets); 
    } catch (err) { console.log(err) }
    }
    fetchPets(); 

  },[]);

  const handleSelect = (pet) => {
    setSelected(pet);
    setIsFormOpen(false);
  }

const handleAddPet = async (formData) => {
  await petService.create(formData)
}

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <>
    <PetList pets ={pets} handleSelect = {handleSelect} handleFormView={handleFormView} isFormOpen={isFormOpen}/>
    <hr/>
    <PetForm handleAddPet={handleAddPet}/>
    <PetDetail selected={selected}/>
    </>
  );
};

export default App;

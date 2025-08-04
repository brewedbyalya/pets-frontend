import * as petService from './services/petService'
import { useEffect, useState } from 'react'
import PetList from './components/PetList/PetList';
import PetDetail from './components/PetDetail/PetDetail';
import PetForm from './components/PetForm/PetForm';

import './App.css';

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
  const newPet = await petService.create(formData)
  setPets([newPet, ...pets])
}

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petService.update(formData, petId);

    const updatedPetList = pets.map((pet) => (
      pet._id !== updatedPet._id ? pet : updatedPet
    ));
    setPets(updatedPetList);
    setSelected(updatedPet);
    setIsFormOpen(false);
    }
    catch(err) {console.log(err)}
  }

  
  const handleDeletePet = async (petId) => {
    try {
      const deletedPet = await petService.deletePet(petId);

      if (deletedPet.err) {
        throw new Error(deletedPet.err);
      }

      setPets(pets.filter((pet) => pet._id !== deletedPet._id));
      setSelected(null);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <PetList pets ={pets} handleSelect = {handleSelect} handleFormView={handleFormView} isFormOpen={isFormOpen}/>
    <hr/>
    <PetForm selected={selected} handleAddPet={handleAddPet} handleUpdatePet={handleUpdatePet}/>
    <PetDetail selected={selected} handleDeletePet={handleDeletePet}/>
    </>
  );
};

export default App;

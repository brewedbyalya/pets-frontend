const PetList = (props) =>
{
    return (
        <>
        <h1>Pet List</h1>
        <div>
        </div>
        <div>
        if {
        props.pets.length ?
    (        
        <ul>
        {props.pets.map((pet)=>
        <li key={pet._id}>
            {pet.name}
        </li>
        
        )}
        </ul> ):(
            <h2>No pets yet.</h2>
        ) }
        </div>
        </>
    );
}

export default PetList
import React, { useState, useEffect } from 'react'; //importing necessary modules from react
import { DndProvider } from 'react-dnd'; //importing DndProvider for drag and drop functionality
import { HTML5Backend } from 'react-dnd-html5-backend'; //Importing HTML5Backend for drag and drop functionality
import PropertyList from './PropertyList'; //Importing PropertyList component
import FavoritesList from './FavoritesList'; //importing FavoriesList component
import propertiesData from './properties.json'; //importing data from properties.json file
import './styles.css'; //importing CSS styles
import PropertyModal from './PropertyModal'; //importing PropertyModal component
import ShowHide from './ShowHide'; //importing ShowHide component

//functional component app
const App = () => {
  //state vriables using useState hook
 const [properties, setProperties] = useState(propertiesData); //state for properties
 const [favorites, setFavorites] = useState([]); //state for favorite properties
 const [selectedProperty, setSelectedProperty ] = useState(null); //state for selected property
 const [isModalOpen, setIsModalOpen] = useState(false); //state for modal open/close

 //function to open a modal
 const openModal = (property) => {
  setSelectedProperty(property); //set selected property
  setIsModalOpen(true); //open modal
 };

 //function to handle search and filter properties
 const handleSearch = (filteredProperties) => {
  setProperties(filteredProperties); //set filtered properties
};


//function to close the modal
 const closeModal = () => {
  setSelectedProperty(null); //reset selected property
  setIsModalOpen(false); //close modal
 };
 
 //function to add a property to favorites list
 const addToFavorites = (property) => {
    const isPropertyInFavorites = favorites.some((favProperty) => favProperty.id === property.id); //check if property is already in favorites
  
    if (!isPropertyInFavorites) {
      setFavorites([...favorites, property]); //add property to favorites if not already there, spread syntax(creates a copy of favorites array and add property to this new array)
    }

    if(isPropertyInFavorites){
      alert('This is already in favorites!'); //show alert if property is already in favorites
    }
  };


  //function to remove a property from favorites
  const removeFromFavorites = (idToRemove) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== idToRemove); //filter out the property to remove
    setFavorites(updatedFavorites); //update favorites list
  }

  //function to clear all favorites
  const clearFavorites = () => {
    setFavorites([]); //clear all favorites by declaring a null array
  }


  //function to update favorites
 const updateFavorites = (droppedProperty) => {
  const isPropertyInFavorites = favorites.some(
    (favProperty) => favProperty.id === droppedProperty.id //check if property is in favorites
  );

  if (!isPropertyInFavorites) {
    const updatedFavorites = [...favorites, droppedProperty]; //add property to favorites if not already there
    setFavorites(updatedFavorites); //update favorites list
  }
};


//function to handle dropping properties outside favorites
 const handleDropOutsideFavorites = (e) => {
  const propertyId = e.dataTransfer.getData('propertyId'); //get dropped property ID
  const propertyToRemove = favorites.find((prop) => prop.id.toString() === propertyId); //find property to remove
  if(propertyToRemove) {
    removeFromFavorites(propertyToRemove.id); //remove property from favorites
  }
 };


 //function to search properties based on address, price, rooms and dateAdded
 const searchProperty = (address, price, rooms, dateAdded) => {
    let filteredProperties = propertiesData; //filtered properties with all properties
  
    if (address) {
      filteredProperties = filteredProperties.filter((property) =>
        property.address.toLowerCase().includes(address.toLowerCase()) //filter by address
      );
    }
  
    if (price) {
      filteredProperties = filteredProperties.filter(
        (property) => property.price === parseInt(price) //filter by price
      );
    }
  
    if (rooms) {
      filteredProperties = filteredProperties.filter(
        (property) => property.rooms === parseInt(rooms) //filer by num of rooms
      );
    }
  
    if (dateAdded) {
      filteredProperties = filteredProperties.filter((property) =>
        property.dateAdded.includes(dateAdded) //filter bt date added
      );
    }
  
    setProperties(filteredProperties); //set properties based on filters
 };


 //useEffect hook to set initial properties
 useEffect(() => {
    setProperties(propertiesData); //set intiail properties when component mounts
 }, []);


 //returned by the compoennt 
 return (
    <div>
      {/*search box for property search*/}
      <div className='search-box'>
        <h1 className="h1app">Property Search</h1>
        <input
          type="text"
          className='propertySearch'
          placeholder="Enter the location here"
          onChange={(e) => searchProperty(e.target.value)} //handle property search on change
        />
      </div>
      {/*showHide component for advanced search*/}
      <ShowHide onSearch={handleSearch}/>
      <br></br>

      {/*DNDProvider for drag and drop*/}
      <DndProvider backend={HTML5Backend}>
        <div className="lists-container">
          {/*container for displaying properties*/}
          <div className="properties-box">
            <h2>Properties</h2>
            <div className="property-list">
              {/*PropertyList component displaying properties*/}
              <PropertyList properties={properties} addToFavorites={addToFavorites} openModal={openModal}/>
            </div>
          </div>
          {/*container for displaying favorite properties*/}
          <div className="favorites-box" onDrop={handleDropOutsideFavorites} onDragOver={(e) => e.preventDefault()}>
            <h2>Favorites</h2>
            <div className='clear-favorites'>
              {/*button to clear all favorite properties*/}
              <button onClick={clearFavorites} className='clear-fav-btn'>Clear all Favorites</button>
            </div>
            <div className="favorites-list">
              {/*FavoritesList component displaying favorite properties*/}
              <FavoritesList favorites={favorites} updateFavorites={updateFavorites} removeFromFavorites={removeFromFavorites} clearFavorites={clearFavorites}/>
            </div>
          </div>
        </div>
      </DndProvider>

      {/*PropertyModal component for displaying property details*/}
      {isModalOpen && (
        <PropertyModal
          property={selectedProperty}
          closeModal={closeModal}
          isOpen={isModalOpen}
        />
      )}
    </div>
 );
};

export default App; //exporting app component

import React from 'react'; //importing react library
import { useDrag } from 'react-dnd'; //importing the useDrag hook from react-dnd

const Property = ({ property, addToFavorites, openModal }) => { //functional component property with props: property, addToFavorites, openModal
  const [{ isDragging }, drag] = useDrag(() => ({ //initializing useDrag hook to enable dragging functionality
    type: 'property', //specifying the type of item being dragged as 'property'
    item: { property }, //defining the data transferred during drag opertaion
    collect: (monitor) => ({ //collectitng info about the drag state
      isDragging: !!monitor.isDragging(), //checking if an item is being dragged
    }),
  }));

  const handleClick = () => { //fucntion to handle click events
    openModal(property); //calling openModal function with the property object when clicked
  };

  return (
    <div
      ref={drag} //reference to enable draggign on this div using the drag reference
      style={{
        opacity: isDragging ? 0.5 : 1, //setting opactiy based on drag state for visual feedback
        cursor: 'move', //changing cursoe to 'move' when dragging
      }}
      onClick={handleClick} //trigerring handleClick function on click
    >
      <div className="property-box" key={property.id}> {/*individual property details*/}
          <img src={`/images/${property.picture}`} className='pic' alt={`Property ${property.id}`} /> {/*displaying proertyu image*/}
          <p><b>Type: </b> {property.type}</p> {/*displaying property type*/}
          <p><b>Address: </b>{property.address}</p> {/*displaying property address*/}
          <p><b>Price: </b>{property.price}</p> {/*displaying property price*/}
          <p><b>Rooms: </b>{property.rooms}</p> {/*displaying property rooms count*/}
          <p><b>Date Added: </b>{property.dateAdded}</p> {/*displaying the date added og the property*/}
        <button onClick={() => addToFavorites(property)} className='addToFavoritesBtn'>Add to Favorites</button>
      </div>
    </div>
  );
};


const PropertyList = ({ properties, addToFavorites, openModal }) => { //component taking properties, add to favorites and opening a modal
  return (
    <div className="property-list"> {/*div container for property list*/}
      {properties.map((property) => ( //mapping through properties to render property component for each
        <Property
          key={property.id} //unique key for each property component
          property={property} //passing individual property details as a prop 
          addToFavorites={addToFavorites} //passing addToFavorites function as prop
          openModal={openModal} //passing openModal function as a prop
        />
      ))}
    </div>
  );
};

export default PropertyList;

import React from 'react'; //importing react and the useDrop hook from react-dnd
import { useDrop } from 'react-dnd';

const FavoritesList = ({ favorites, updateFavorites, removeFromFavorites}) => { //FavoritesList component receiving props: favorites, updateFavorites, removeFromFavorites
  const [, drop] = useDrop(() => ({ //using the useDrop hook to enable drop function
    accept: 'property', //spccifying the accepted type for the drop operation
    collect: (monitor) => ({ //collecting information about the drop state using monitor
      isOver: !!monitor.isOver(), //checking if an item is being dragged over
    }),
    drop: (item) => {  //handling the drop eveent when an item is dropped onto the drop target
      const droppedProperty = item.property; //extracting the droppedProperty from the dropped item
      if (droppedProperty) { //checking id the droppedProeprty exists
        const isPropertyInFavorites = favorites.some( //checking if the dropped property is already in favorites
          (favProperty) => favProperty.id === droppedProperty.id
        ); 
        if(isPropertyInFavorites) { //if the proeprty is in favorites, remove it, otherwise update favorites
          removeFromFavorites(droppedProperty.id); //removing the property from favorite 
        } else {
          updateFavorites(droppedProperty); //updating favoites by adding the proerty 
        }
      }
    },
  }));

  return (
    <div ref={drop} className="favorite-list">
      {favorites.map((favorite) => ( //mapping thtough each item in the favorites array
        <div className="favorite-box" 
        key={favorite.id} //unique key to prop to identifyeach favorite property
        draggable //allowing the div to be draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('propertyId', favorite.id.toString()); //setting data to be transferred during dnd
        }}
        >
          <div className="left-side"> {/*left side of the property box*/}
            <img src={`/images/${favorite.picture}`} className='favpic' alt={`Property ${favorite.id}`} />  {/*displaying the property's image*/}
            <div className='remove'>
              <button onClick={() => removeFromFavorites(favorite.id)} className='remove-btn'>Remove from favorites</button>
            </div>
          </div>
          <div className="right-side"> {/*right side of the property box*/}
            {/*displaying property info*/}
            <p className='property-info'><b>Type: </b> {favorite.type}</p>
            <p className='property-info'><b>Address: </b>{favorite.address}</p>
            <p className='property-info'><b>Price: </b>{favorite.price}</p>
            <p className='property-info'><b>Rooms: </b>{favorite.rooms}</p>
            <p className='property-info'><b>Date Added: </b>{favorite.dateAdded}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;

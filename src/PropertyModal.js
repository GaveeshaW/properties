import React, { useState } from "react"; //importing necessary modules from react
import Modal from 'react-modal'; //importing the modal component
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; //importing tab components
import 'react-tabs/style/react-tabs.css'; // Import the CSS for react-tabs
import 'react-image-gallery/styles/css/image-gallery.css'; //importing css from image gallert

//creating a functional component 'PropertyModal' accepting properties: property, closeModal, isOpen
const PropertyModal = ({ property, closeModal, isOpen }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0); //state to manage the index of the currentlt disaplued image insid the modal

    //if property is false or isOpen is false, don't render the modal
    if (!property || !isOpen) {
        return null;
    }

    //function to handle moving to the next image in the image gallery
    const handleNext = () => {
        const newIndex = (currentImageIndex + 1) % property.thumbnailimages.length; //calculate the index of the next image considering the length of the image array
        setCurrentImageIndex(newIndex); //set the new index as the current image index
    };

    //function to handle moving to the previous image in the gallery
    const handlePrev = () => {
        const newIndex = (currentImageIndex - 1 + property.thumbnailimages.length) % property.thumbnailimages.length; //calculate the index of the previous image considering the length of the image gallety
        setCurrentImageIndex(newIndex); //set the new index as the current image ineddex
    };

    //return a modal compoentn displaying the proeprty details
    return (
        //modal component with specified properties
        <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Property Details Modal" className="property-modal">
            <h2 className="property-h2">Property details</h2> {/*heading*/}
            <button onClick={closeModal} className="modal-button-1">Close</button>
            <Tabs>
                {/*tablist conraininf different tabs*/}
                <TabList >
                    <Tab>Description</Tab>
                    <Tab>Floor Plan</Tab>
                    <Tab>Google map</Tab>
                </TabList>
                <TabPanel>
                    {/*to display the image gallery and the description of the proeprty*/}
                    <div className="image-gallery">
                        <img src={`/images/${property.thumbnailimages[currentImageIndex]}`} alt="pictures" className="pictures" />
                        <button onClick={handlePrev} className="gallery-arrow">{"<"}</button>
                        <button onClick={handleNext} className="gallery-arrow">{">"}</button>
                    </div>
                    <h3 className="modal-h3">Description</h3>
                    <p className="modal-p">{property.description}</p>
                    <p className="modal-p"><b>Type: </b> {property.type}</p>
                    <p className="modal-p"><b>Address: </b>{property.address}</p>
                    <p className="modal-p"><b>Price: </b>{property.price}</p>
                    <p className="modal-p"><b>Rooms: </b>{property.rooms}</p>
                    <p className="modal-p"><b>Date Added: </b>{property.dateAdded}</p>
                </TabPanel>
                <TabPanel>
                    {/*to display the floor plan of the proeprty*/}
                    <h3 className="modal-h3">Floor plan</h3>
                    <img src={`/images/${property.floorplan}`} alt="Floor Plan" className="floorplan"/>
                </TabPanel>
                <TabPanel>
                    {/*to display the google maps of the proeprty*/}
                    <h3 className="modal-h3">Google maps</h3>
                    <div dangerouslySetInnerHTML={{ __html: property.map }} className="gglmap"/>
                </TabPanel>
            </Tabs>
            <button onClick={closeModal} className="modal-button">Close</button>
        </Modal>
    );
};

export default PropertyModal;

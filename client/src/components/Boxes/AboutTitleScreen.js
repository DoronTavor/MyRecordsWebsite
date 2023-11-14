import React from "react";
import "../../styles/AboutTitleScreen.css"; // Import a separate CSS file for styling

export const AboutTitleScreen = () => {
    return (
        <div className="about-container">
            <header className="title-header">Tavor's Records Collection</header>
            <h2 className="main-heading">
                Welcome to Tavor's Records Collection, the ultimate showcase for my
                personal record collection! Step into my digital realm, where each
                record holds a story, and every track is a testament to my musical
                journey. Why Tavor's Records Collection?
            </h2>
            <ol className="features-list">
                <li>
                    <h3>Personalized Collection:</h3>
                    <p>
                        Explore my carefully curated vinyl and CD collection, ranging from
                        nostalgic classics to the latest releases. Each record has been
                        handpicked to reflect my diverse taste and love for the artistry
                        behind every groove.
                    </p>
                </li>
                <li>
                    <h3>Interactive Exploration:</h3>
                    <p>
                        Navigate through my record haven with ease. Whether you're searching
                        for a specific artist, genre, or simply want to explore, the
                        user-friendly interface ensures a seamless and enjoyable browsing
                        experience.
                    </p>
                </li>
                <li>
                    <h3>Quality Spotlight:</h3>
                    <p>
                        Rest assured, each record showcased on Tavor's Records Collection is
                        a testament to quality and authenticity. Experience the richness of
                        sound and the unique charm that only vinyl can deliver.
                    </p>
                </li>
            </ol>
            <h2 className="closing-heading">
                Embark on a virtual tour of my music sanctuary at Tavor's Records
                Collection. Whether you're a fellow vinyl aficionado or just curious
                about the stories behind the records, this is a space where music comes
                to life, one spin at a time. Welcome to the heart of my musical
                universe!
            </h2>
        </div>
    );
};
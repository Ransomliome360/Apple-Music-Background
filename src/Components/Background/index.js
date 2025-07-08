import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { ImagesContext } from "../../ImageContext";
import html2canvas from "html2canvas";

function Background({ color, img }) {
  const data = useContext(ImagesContext);
  var position = [];
  //The set of colors that are going to be used in the background
  const colors = color;

  //Creating a 2d array with a specific size, the size implies the resolution of the background
  console.log(colors);
  const SIZE = 6;
  for (var i = 0; i < SIZE; i++) {
    position[i] = [];
  }

  //Setting the colors to a random position in the array
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      position[i][j] = colors[Math.floor(Math.random() * colors.length)];
    }
  }

  const saveBackground = async () => {
    try {
      const element = document.querySelector('.background-container');
      const canvas = await html2canvas(element, {
        allowTaint: true,
        useCORS: true,
        scale: 2, // Higher quality
        backgroundColor: null,
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `glassmorphism-background-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png', 1.0);
    } catch (error) {
      console.error('Error saving background:', error);
    }
  };

  {
  }
  return (
    <div className="App background-container">
      {console.log(data)}

      <button className="save-button" onClick={saveBackground}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Save Background
      </button>

      <div className="blur">
        <img src={img} className="album" />
      </div>
      <div className="container">
        {position.map((row) => {
          return row.map((col) => {
            return (
              <div
                className="pixel"
                style={{ background: col }}
                key={uuidv4()}
              />
            );
          });
        })}
      </div>
    </div>
  );
}

export default Background;

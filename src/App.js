import React from 'react';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <h1 className='mt-4 mb-5 text-center text-white'>Recommended Movies</h1>

      <div className="card-deck" style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div className="card">
          <img src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS4yLzEwICAxMDQuMksgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00379479-vbhdkalryn-portrait.jpg" className="card-img-top" alt="..." style={{ width: '100%', height: 'auto', transition: 'transform 0.3s ease' }} 
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}/>
        </div>
        <div className="card">
          <img src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS40LzEwICAxODEuNUsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00386670-rbcdjubcdm-portrait.jpg" className="card-img-top" alt="..." style={{ width: '100%', height: 'auto', transition: 'transform 0.3s ease' }} 
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}/>
        </div>
        <div className="card">
          <img src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC45LzEwICA0MS44SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00358147-masemnglng-portrait.jpg" className="card-img-top" alt="..." style={{ width: '100%', height: 'auto', transition: 'transform 0.3s ease' }} 
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}/>
        </div>
        <div className="card">
          <img src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC42LzEwICA1LjhLIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00379430-nscljshrud-portrait.jpg" className="card-img-top" alt="..." style={{ width: '100%', height: 'auto', transition: 'transform 0.3s ease' }} 
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}/>
        </div>
        <div className="card">
          <img src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS40LzEwICA0MC4ySyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00038685-vvhkfgnayq-portrait.jpg" className="card-img-top" alt="..." style={{ width: '100%', height: 'auto', transition: 'transform 0.3s ease' }} 
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}/>
        </div>
      </div>
    </div>
  );
}

export default App;


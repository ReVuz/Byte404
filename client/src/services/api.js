function getLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        return { latitude, longitude };
      },
      (error) => {
        console.error('Error fetching location:', error);
        return null;
      },
      {
        enableHighAccuracy: true,
        maximumAge: 6000, 
        timeout: 5000,      // Timeout if unable to fetch within 5 seconds
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    return null;
  }
}

// Fetch location every minute and log the coordinates
setInterval(() => {
  getLocation();
}, 60000); // 60000ms = 1 minute

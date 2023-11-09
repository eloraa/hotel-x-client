import tt from "@tomtom-international/web-sdk-maps";
let map
export const createMap = (lat, long, container) => {
    if(map) return
    map = tt.map({
        key: import.meta.env.VITE_TOMTOMKEY,
        container: container,
        style: 'https://api.tomtom.com/style/1/style/22.2.1-*?map=basic_main',
        center: [lat, long],
        zoom: 16,
        pitch: 60,
        interactive: false,
    });

    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());

    map.on('load', function() {
        requestAnimationFrame(rotateCamera);
    });


    function rotateCamera(timestamp) {
        var rotationDegree = timestamp / 100 % 360;
        map.rotateTo(rotationDegree, { duration: 0 });
        requestAnimationFrame(rotateCamera);
    }
}
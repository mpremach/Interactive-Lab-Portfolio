// --- 1. RESPONSIVE ENGINE ---
function resizeScene() {
    const lens = document.getElementById('camera-lens');
    const scene = document.getElementById('scene-layer');
    const lensWidth = lens.clientWidth;
    const lensHeight = lens.clientHeight;
    const lensRatio = lensWidth / lensHeight;
    const imageRatio = 1.54; // Lab Image Aspect Ratio

    if (lensRatio > imageRatio) {
        scene.style.width = lensWidth + 'px';
        scene.style.height = (lensWidth / imageRatio) + 'px';
    } else {
        scene.style.height = lensHeight + 'px';
        scene.style.width = (lensHeight * imageRatio) + 'px';
    }
}

// --- 2. ZOOM LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    resizeScene();
    window.addEventListener('resize', resizeScene);

    const labImage = document.getElementById('lab-image');
    const allHotspots = document.querySelectorAll('.hotspot');
    
    const backBtn = document.querySelector('.back-btn'); 
    
    const navHome = document.getElementById('nav-home');

    function activateZoom(targetSceneId, zoomClass) {
        // Hide Hotspots
        allHotspots.forEach(el => el.classList.add('hidden'));
        
        // Add Zoom Mode to Body (Shows Back Button)
        document.body.classList.add('zoom-mode');

        // Zoom Image
        labImage.className = zoomClass;
        
        // Wait for zoom, then show panel
        setTimeout(() => {
            document.getElementById(targetSceneId).classList.add('active');
        }, 500);
    }

    function resetLab() {
        // Hide Panels
        document.querySelectorAll('.scene-overlay').forEach(el => el.classList.remove('active'));
        
        // Remove Zoom
        labImage.className = '';
        document.body.classList.remove('zoom-mode');
        
        // Wait for zoom out, then show hotspots
        setTimeout(() => {
            allHotspots.forEach(el => el.classList.remove('hidden'));
        }, 500);
    }

    // Click Listeners
    document.getElementById('trigger-software').addEventListener('click', () => {
        activateZoom('scene-software', 'zoom-monitor');
    });

    document.getElementById('trigger-hardware').addEventListener('click', () => {
        activateZoom('scene-hardware', 'zoom-hardware');
    });

    document.getElementById('trigger-music').addEventListener('click', () => {
        activateZoom('scene-music', 'zoom-music');
    });


    backBtn.addEventListener('click', resetLab);
    
    navHome.addEventListener('click', resetLab);
});
import * as THREE from 'three'

// create basics for 3d canvas
const targetElement = document.getElementById('3d2')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, targetElement.offsetWidth / targetElement.offsetHeight, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer({
    setPixelRatio: window.devicePixelRatio,
    antialias: true
})
renderer.setClearColor( 0xffffff, 0)
renderer.setSize( targetElement.offsetWidth, targetElement.offsetHeight )
targetElement.appendChild( renderer.domElement )

camera.position.z = 5

function isMobile() {
    return window.innerWidth <= 400
}

window.addEventListener('load', () => {
    if (isMobile()) {
        camera.position.z = 15
        camera.position.x = -1.5
    }
    window.addEventListener('resize', (e) => {
        if (e.srcElement.innerWidth <= 400) {
            camera.position.z = 15
            camera.position.x = -1.5
        }
        else {
            camera.position.z = 11
        }
    })
})

window.addEventListener('resize', () => {
    camera.aspect = targetElement.clientWidth / targetElement.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(targetElement.clientWidth, targetElement.clientHeight)
})

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

scene.add( cube );

function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();
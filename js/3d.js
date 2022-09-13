import * as THREE from 'three'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'
import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl'

THREE.Cache.enabled = false

// create basics for 3d canvas
const targetElement = document.getElementById('3d')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, targetElement.offsetWidth / targetElement.offsetHeight, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer({
    setPixelRatio: window.devicePixelRatio,
    antialias: true
})
renderer.setClearColor( 0xffffff, 0)
renderer.setSize( targetElement.offsetWidth, targetElement.offsetHeight )
targetElement.appendChild( renderer.domElement )

camera.position.z = 11
camera.position.x = -2

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

const globe = new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load('./img/texture/globe.jpg')
            }
        }
    })
)
scene.add( globe )

const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    })
)
atmosphere.scale.set(1.25,1.25,1.25)
scene.add( atmosphere )

function animate() {
	requestAnimationFrame( animate )

    globe.rotation.z += 0.0001
    globe.rotation.x += 0.0001
    globe.rotation.y += 0.005
	renderer.render( scene, camera )
}
animate();
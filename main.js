import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
const scene = new THREE.Scene();
const camera = new THREE.Perspectivecamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let obj;
let cntrls;
let obj2render = 'nature';
const loader = new GLTFLoader();
loader.load(
    `models/${obj2render}.scene.gltf`,
    function(gltf){
        obj = gltf.scene;
        scene.add(obj);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);

const renderer = new THREE.WebGLRenderer({ alpha :true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);
camera.position.z = obj2render === 'nature' ? 25 : 500;
const toplight = new THREE.DirectionalLight(0xffffff, 1);
toplight.position.set(500, 500, 500);
toplight.castShadow = true;
scene.add(toplight);
const amblight = new THREE.AmbientLight(0x333333, obj2render === 'nature' ? 5 : 1);
scene.add(amblight);
if (obj2render === 'nature') {
    cntrls = new OrbitControls(camera, renderer.domElement);
}
function animation() {
    requestAnimationFrame(animation);
    if (obj && obj2render === 'nature') {
        obj.rotation.y = (mouseX - window.innerWidth / 2) / 1000;
        obj.rotation.x = (mouseY - window.innerHeight / 2) / 1000;
    }
    renderer.render(scene, camera);
}

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
document.onmousemove = (e) => {
    mouseX = e.clientX; 
    mouseY = e.clientY;
}
animation();
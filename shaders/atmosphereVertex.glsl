varying vec3 vertexNormal;
void main() {
    vertexNormal = normalize(normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
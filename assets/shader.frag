precision mediump float;

varying vec2 vTextureCoord;//The coordinates of the current pixel
uniform sampler2D uSampler;//The image data
uniform float time;// elapsed time

void main(void){
    vec4 uv=texture2D(uSampler,vTextureCoord);
    // vec4 color=vec4(
    //     sin(time+vTextureCoord.x+vTextureCoord.y)-(1.-uv.w),
    //     cos(time+vTextureCoord.x-vTextureCoord.y)-(1.-uv.w),
    //     0.,
    // uv.w);
    gl_FragColor=uv;
}
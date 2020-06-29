function initThree(el,options) {
    options = options || {}

    const width = el.offsetWidth
    const height = el.offsetHeight
    const asp = width / height

    // scene
    const scene = new THREE.Scene()

    // camera
    let camera
    if (options.camera) {
        camera = options.camera
    } else {
        camera = new THREE.PerspectiveCamera(45, asp, 1, 100000)
        window.addEventListener('resize', function() {
            camera.aspect = el.offsetWidth / el.offsetHeight
            renderer.setSize(el.offsetWidth, el.offsetHeight) // 重新获取
            camera.updateProjectionMatrix()
            renderer.render(scene, camera)
        }, false)
    }
    camera.position.set(30, 30, 30)




    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    el.append(renderer.domElement)
    renderer.setClearColor(options.clearColor || '#000')

    // 辅助
    if (options.axes) scene.add(new THREE.AxesHelper(10))// 坐标轴辅助红x 绿y 蓝z
    if (options.gridHelper) scene.add(new THREE.GridHelper(100, 100))// 网格参考线

    //按序渲染
    renderer.sortObjects = options.sortObjects

    //添加控制
    this.controls=new THREE.OrbitControls( camera, renderer.domElement );

    // to the instance
    this.renderer = renderer
    this.scene = scene
    this.camera = camera
    this.el = el
}

THREE.inithree=initThree

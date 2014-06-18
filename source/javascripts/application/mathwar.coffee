class window.MathWar
  @VIEW_ANGLE: 75
  @NEAR: 1
  @FAR: 1000

  constructor: (options) ->
    @renderer = new THREE.WebGLRenderer()
    @renderer.setSize options.width, options.height

    @camera = new THREE.PerspectiveCamera \
      @VIEW_ANGLE
      options.width / options.height
      @NEAR
      @FAR

    @scene = new THREE.Scene()
    @scene.add @camera
    @camera.position.set 50, 50, 100
    @camera.up = new THREE.Vector3(0, 0, 1)
    @camera.lookAt(new THREE.Vector3(0, 0, 0))

    material = new THREE.MeshLambertMaterial
      map: THREE.ImageUtils.loadTexture('images/middleman.png')

    cube = new THREE.Mesh(new THREE.CubeGeometry(20, 20, 20), material);
    @scene.add(cube);

    @camLight = new THREE.PointLight 0xffffff, 1, 120
    @camLight.position.set 50, 50, 100
    @camLight.position = @camera.position
    @scene.add @camLight

    axes = new THREE.AxisHelper(200);
    @scene.add(axes);

    @mapElevations = @_generateMap 50, 50
    mapGeometry = new THREE.PlaneGeometry 600, 600, 49, 49
    for elevation, i in @mapElevations
      mapGeometry.vertices[i].z = elevation

    mapMaterial = new THREE.MeshLambertMaterial
      map: THREE.ImageUtils.loadTexture('images/middleman.png')

    map = new THREE.Mesh mapGeometry, mapMaterial
    @scene.add map
    map.position = new THREE.Vector3(0, 0, 0)

    @keyboard = new THREEx.KeyboardState()

  element: ->
    @renderer.domElement

  render: ->
    internalRender = =>
      requestAnimationFrame internalRender
      @renderer.render @scene, @camera

      if @keyboard.pressed("down")
        @camera.position.y += 1
      if @keyboard.pressed("up")
        @camera.position.y -= 1
      if @keyboard.pressed("left")
        @camera.position.x += 1
      if @keyboard.pressed("right")
        @camera.position.x -= 1

    internalRender()

  _generateMap: (width, height) ->
    [1...(width * height)].map ->
      Math.round((Math.random() * 10))

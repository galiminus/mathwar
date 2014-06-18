(function() {
  window.MathWar = (function() {
    MathWar.VIEW_ANGLE = 75;

    MathWar.NEAR = 1;

    MathWar.FAR = 1000;

    function MathWar(options) {
      var axes, cube, elevation, i, map, mapGeometry, mapMaterial, material, _i, _len, _ref;
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(options.width, options.height);
      this.camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE);
      options.width / options.height;
      this.NEAR;
      this.FAR;
      this.scene = new THREE.Scene();
      this.scene.add(this.camera);
      this.camera.position.set(50, 50, 100);
      this.camera.up = new THREE.Vector3(0, 0, 1);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      material = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('/images/middleman.png')
      });
      cube = new THREE.Mesh(new THREE.CubeGeometry(20, 20, 20), material);
      this.scene.add(cube);
      this.camLight = new THREE.PointLight(0xffffff, 1, 120);
      this.camLight.position.set(50, 50, 100);
      this.camLight.position = this.camera.position;
      this.scene.add(this.camLight);
      axes = new THREE.AxisHelper(200);
      this.scene.add(axes);
      this.mapElevations = this._generateMap(50, 50);
      mapGeometry = new THREE.PlaneGeometry(600, 600, 49, 49);
      _ref = this.mapElevations;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        elevation = _ref[i];
        mapGeometry.vertices[i].z = elevation;
      }
      mapMaterial = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('/images/middleman.png')
      });
      map = new THREE.Mesh(mapGeometry, mapMaterial);
      this.scene.add(map);
      map.position = new THREE.Vector3(0, 0, 0);
      this.keyboard = new THREEx.KeyboardState();
    }

    MathWar.prototype.element = function() {
      return this.renderer.domElement;
    };

    MathWar.prototype.render = function() {
      var internalRender;
      internalRender = (function(_this) {
        return function() {
          requestAnimationFrame(internalRender);
          _this.renderer.render(_this.scene, _this.camera);
          if (_this.keyboard.pressed("down")) {
            _this.camera.position.y += 1;
          }
          if (_this.keyboard.pressed("up")) {
            _this.camera.position.y -= 1;
          }
          if (_this.keyboard.pressed("left")) {
            _this.camera.position.x += 1;
          }
          if (_this.keyboard.pressed("right")) {
            return _this.camera.position.x -= 1;
          }
        };
      })(this);
      return internalRender();
    };

    MathWar.prototype._generateMap = function(width, height) {
      var _i, _ref, _results;
      return (function() {
        _results = [];
        for (var _i = 1, _ref = width * height; 1 <= _ref ? _i < _ref : _i > _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function() {
        return Math.round(Math.random() * 10);
      });
    };

    return MathWar;

  })();

}).call(this);
(function() {
  window.onload = function() {
    var mathWar;
    mathWar = new window.MathWar({
      width: window.innerWidth,
      height: window.innerHeight
    });
    document.body.appendChild(mathWar.element());
    return mathWar.render();
  };

}).call(this);

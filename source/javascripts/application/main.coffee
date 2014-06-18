#= require ./mathwar

window.onload = ->
  mathWar = new window.MathWar
    width: window.innerWidth
    height: window.innerHeight

  document.body.appendChild mathWar.element()
  mathWar.render()

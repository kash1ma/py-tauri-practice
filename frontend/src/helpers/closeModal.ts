const handleCloseModal = () : void => {
  const x = 0
  const y = 0

  const click = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: x,
    clientY: y
  })

  const elem : Element = document.elementFromPoint(x, y) as Element

  if(elem){
    elem.dispatchEvent(click)
  }
}

export default handleCloseModal;
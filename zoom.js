function zoom(element) {
    let container = document.createElement('div');
    container.style.position = "fixed";
    container.style.top = 0;
    container.style.left = 0;
    container.style.right = 0;
    container.style.bottom = 0;
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.display = "block";
    container.style.zIndex = 999;
    container.style.background = "rgba(0.0, 0.0, 0.0, 0.6)";
    container.style.backdropFilter = "blur(0.5em)"
    container.style.textAlign = "center";

    let img = document.createElement('img');
    img.style.maxWidth = "100%";
    img.style.maxHeight = "100%";
    img.src = element.src;
    container.appendChild(img);

    let body = document.getElementsByTagName("body")[0];
    body.appendChild(container);

    container.onclick = function(event) {
        let body = document.getElementsByTagName("body")[0];
        body.removeChild(event.target);
    };
}

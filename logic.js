const img = document.querySelector("img");

let imgPosX;
let imgPosY;

let finalWidth;
let finalHeight;

function scaleImage()
{
    const imgNormalX = img.naturalWidth;   
    const imgNormalY = img.naturalHeight;
    
    const aspectRatio = imgNormalX / imgNormalY;
    
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.9;

    let widthBasedHight = maxWidth / aspectRatio;
    let heightBasedWidth = maxHeight * aspectRatio


    if (widthBasedHight <= maxHeight)
    {
        finalWidth = maxWidth;
        finalHeight = widthBasedHight;
    }
    else
    {
        finalWidth = heightBasedWidth;
        finalHeight = maxHeight;
    }

    imgPosX = (window.innerWidth - finalWidth) / 2;
    imgPosY = (window.innerHeight - finalHeight) / 2;

    img.style.width = finalWidth + "px";
    img.style.height = finalHeight + "px";

    img.style.position = "fixed";
    img.style.left = imgPosX + "px";
    img.style.top = imgPosY + "px";

}
//scale image när bilden laddar in
img.onload = scaleImage;
img.onload = scaleImage();


let playerCount = 0;
const players = [];

let circlePosX;
let circlePosY;

let isClicking = false;

let percentPosX;
let percentPosY;

function AddPlayer()
{
    playerCount++;
    
    const circle = document.createElement("div");

    circle.classList.add("circle");
    circle.textContent = playerCount;

    //const circleDiameter = 40;

    circle.style.position = "absolute";
    circle.style.left = imgPosX + "px";
    circle.style.top = imgPosY + "px";

    circlePosX = parseFloat(circle.style.left);
    circlePosY = parseFloat(circle.style.top);

    // percentPos när den skapas
    const percentPosX = (circlePosX - imgPosX) / finalWidth;
    const percentPosY = (circlePosY - imgPosY) / finalHeight;

    // anger percentPos för varje enskild cirkel 
    circle.dataset.percentX = percentPosX;
    circle.dataset.percentY = percentPosY;

    

    document.body.appendChild(circle);

    players.push(circle);


    circle.addEventListener("contextmenu", (e) => 
    {
        e.preventDefault();
        
        document.body.removeChild(circle);
    });

    circle.addEventListener("mousedown", (e) => 
    {
        if (e.button !== 0) return; // svarar endast på mouseButton 1 

        isClicking = true; // mousebutton är nere
        console.log("This circle was clicked");

        const offsetX = e.clientX - circle.offsetLeft;
        const offsetY = e.clientY - circle.offsetTop;

        function onMouseMove(e)
        {
            if (isClicking)
            {
                const mouseX = e.clientX - offsetX;
                const mouseY = e.clientY - offsetY;

                circle.style.left = mouseX + "px";
                circle.style.top = mouseY + "px";

                
                circlePosX = parseFloat(circle.style.left);
                circlePosY = parseFloat(circle.style.top);

                const newPercentPosX = (mouseX - imgPosX) / finalWidth; 
                const newPercentPosY = (mouseY - imgPosY) / finalHeight; 

                circle.dataset.percentX = newPercentPosX;
                circle.dataset.percentY = newPercentPosY;
            }
        }

        function onMouseUp()
        {
            isClicking = false; // mousebutton är uppe

            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        
    });

}
//scale image när fönstret ändrar storlek
window.addEventListener("resize", () => 
{
    if (img != null) 
    {
        scaleImage();
    }

    players.forEach((circle) =>
    {  
       
        const percentX = parseFloat(circle.dataset.percentX);
        const percentY = parseFloat(circle.dataset.percentY);

        const newLeft = imgPosX + finalWidth * percentX;
        const newTop = imgPosY + finalHeight * percentY; 

        circle.style.left = newLeft + "px";
        circle.style.top = newTop + "px";
    });
});
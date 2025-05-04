
const main = document.getElementsByTagName("main").item(0)  //llamamos constante al main
const URLMain = `https://api.escuelajs.co/api/v1/products`  //constante para llamada al URL
const CardShadow = document.getElementById("CardShadow");   //llamamos por el id a las cards

//console.log(main);//debug

document.addEventListener("DOMContentLoaded", () => {
    const CargaBoton = document.getElementById(`btnLoad`);
    CargaBoton.addEventListener("click", getData);
});



function getData() {
    const options = { "method": "GET" };

    fetch(URLMain, options)
        .then((response) => {
            console.log(Response);
            response.json().then((res) => {
                //console.log(res);//debug

                const cards = document.getElementsByClassName("card");

                res.forEach((product, index) => {
                    const card = cards[index];
                    if (!card) return; //si ya no hay targetas, regresa

                    //elegir la 2da imagen
                    const svg = card.querySelector("svg"); //creamos la constante svg del html en el div y agregamos el querySelector: para acceder aun elemento del html en JS
                    if (svg && product.images[1]) {
                        const img = document.createElement("img");
                        img.src = product.images[1]; // asignamos la imagen a img y querremos que de las "3" (0,1,2) la segunda (1) sea la elegida y puesta en la card
                        img.alt = product.title;
                        img.className = "card-img-top"; //img por el className
                        svg.replaceWith(img);

                    }

                    const p = card.querySelector(".card-text");
                    if (p){
                        p.textContent = product.description; //al contenido de texto del parrafo "p" le asignamos la descripcion del producto
                    }

                    const priceEl = card.querySelector("small.text-body-secondary");
                    if(priceEl){
                        priceEl.textContent = `$ ${product.price}`; //le asignamos el precio a priceEl
                    }

                });

            })
        })

        .catch((err) => {
            main.insertAdjacentHTML("beforeend",
                `<div class="alert alert-danger" role="alert">
            ${err.message}
            </div>`);

        });
}

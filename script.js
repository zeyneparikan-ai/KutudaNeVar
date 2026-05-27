// 1. Hazır Not Şablonları
const readyNotes = {
    dogumgunu: "İyi ki doğdun! Yeni yaşın sana sağlık, mutluluk ve tüm güzellikleri getirsin. 🎉🎂",
    sevgililer: "Hayatımın en güzel detayı, Sevgililer Günümüz kutlu olsun. Seni çok seviyorum! ❤️✨",
    anneler: "Dünyanın en fedakar, en güzel annesi... Anneler Günün kutlu olsun, iyi ki varsın! 🌸💖",
    bayram: "Sevdiklerinizle birlikte sağlıklı, huzurlu ve musmutlu bir bayram geçirmeniz dileğiyle. Bayramınız kutlu olsun! 🌙🍬",
    yilbasi: "Yeni yılın sana ve tüm sevdiklerine sağlık, mutluluk, başarı ve bol şans getirmesini dilerim! Mutlu yıllar! 🎄✨",
    tebrik: "Bu harika başarıyı yürekten kutlarım! Başarılarının katlanarak devam etmesini dilerim, seninle gurur duyuyorum! 🎓🚀"
};

let decodedMessage = "";

// 2. Kategori Seçimi
function setNote(type) {
    document.getElementById('noteInput').value = readyNotes[type];
}

// 3. Hatasız Link Üretme Fonksiyonu (URL Şifrelemeli)
function generateLink() {
    const userNote = document.getElementById('noteInput').value.trim();

    if (userNote === "") {
        alert("Lütfen önce bir not yazın! 😊");
        return;
    }

    // Güvenli URL kodlama yöntemi (Türkçe karakterleri bozmaz)
    const encodedNote = encodeURIComponent(userNote);
    
    const currentUrl = window.location.href.split('?')[0];
    const finalLink = `${currentUrl}?mesaj=${encodedNote}`;

    document.getElementById('generatedLink').value = finalLink;
    document.getElementById('linkContainer').classList.remove('hidden');
}

// 4. Linki Kopyalama
function copyLink() {
    const linkInput = document.getElementById('generatedLink');
    linkInput.select();
    document.execCommand('copy');
    alert("Sürpriz link kopyalandı! 🚀");
}

// 5. Uygulama Açıldığında Link Kontrolü
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const mesajParam = urlParams.get('mesaj');

    if (mesajParam) {
        document.getElementById('creatorScreen').classList.add('hidden');
        document.getElementById('receiverScreen').classList.remove('hidden');
        
        try {
            // Şifreyi güvenli bir şekilde çözüyoruz
            decodedMessage = decodeURIComponent(mesajParam);
            document.getElementById('theMessage').innerText = decodedMessage;
        } catch(e) {
            document.getElementById('theMessage').innerText = "Hatalı veya bozuk bir sürpriz linki! 😢";
        }
    }
}

// 6. Kutuyu Açma ve Konfeti Efekti
function openBox() {
    const box = document.getElementById('giftBox');
    
    if(box.classList.contains('opened')) return;

    box.classList.add('opened');

    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        document.getElementById('surpriseTitle').innerText = "Sürpriz Notun Açıldı! ✨";
        document.getElementById('secretNoteDisplay').classList.remove('hidden');
    }, 600);
}
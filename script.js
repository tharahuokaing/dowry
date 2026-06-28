// បង្កើតប្រព័ន្ធគ្រប់គ្រងសំឡេងចេញពីហ្វាយល៍ dowry.mp3 របស់អ្នក
const audioEngine = new Audio('dowry.mp3');
audioEngine.loop = true; // កំណត់ឱ្យលេងឡើងវិញរហូតពេលចប់បទ

/**
 * មុខងារដំណើរការភ្លេងការ និងបើកផ្ទាំងរូបភាពហែជំនូន
 */
function startDowryCelebration() {
    if (audioEngine.paused) {
        audioEngine.play()
            .then(() => {
                // ប្រសិនបើភ្លេងចាក់បានជោគជ័យ បង្ហាញរូបភាពភ្លាមៗ
                popupDowryView('image_dowry.png');
            })
            .catch(err => {
                console.log("Browser ទប់ស្កាត់ការចាក់ស្វ័យប្រវត្ត៖ ", err);
                // បើទោះជាមានបញ្ហាទប់សំឡេង ក៏ត្រូវបង្ហាញផ្ទាំងរូបភាពសិនដែរ
                popupDowryView('image_dowry.png');
            });
    } else {
        audioEngine.pause();
    }
}

/**
 * បង្កើតផ្ទាំងចល័ត (Popup Modal) បង្ហាញរូបភាព image_dowry.png ពេញអេក្រង់
 */
function popupDowryView(srcPath) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        padding: 20px;
        box-sizing: border-box;
    `;

    // បង្កើតផ្ទាំងរូបភាព
    const img = document.createElement('img');
    img.src = srcPath;
    img.alt = "ទិដ្ឋភាពហែជំនូន";
    img.style.cssText = `
        max-width: 95%;
        max-height: 75vh;
        border: 3px solid #c5a059;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;

    // ករណីមិនទាន់មានហ្វាយល៍រូបភាពពិតប្រាកដ (Fallback Text)
    img.onerror = function() {
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.style.cssText = "color:#fff; font-family:'Moul', serif; font-size:1.2rem; margin-bottom:20px; text-align:center; line-height:1.8;";
        placeholder.innerHTML = "🥁 ពិធីហែជំនូនមហាសិរីមង្គល 🥁<br><span style='font-size:0.9rem; font-family:Hanuman; color:#c5a059;'>[កំពុងលេងបទភ្លេងការជំនូនប្រពៃណីខ្មែរ...]</span>";
        overlay.insertBefore(placeholder, closeBtn);
    };

    // ប៊ូតុងសម្រាប់បិទវិញ
    const closeBtn = document.createElement('button');
    closeBtn.style.cssText = `
        margin-top: 25px;
        background: #800020;
        color: white;
        border: 2px solid #c5a059;
        padding: 10px 30px;
        font-family: 'Hanuman', serif;
        font-weight: bold;
        border-radius: 30px;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    `;
    closeBtn.textContent = "❌ បិទវិញ និងបញ្ឈប់តន្ត្រី";

    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    // មុខងារបិទផ្ទាំងទស្សនា និងបញ្ឈប់តន្ត្រីឱ្យមកដើមបទវិញ
    const closeAction = () => {
        audioEngine.pause();
        audioEngine.currentTime = 0; 
        overlay.remove();
    };

    closeBtn.addEventListener('click', closeAction);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeAction();
    });
}


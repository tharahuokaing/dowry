/**
 * --------------------------------------------------------------------------
 * Audio & Modal Popup Engine for Groom's Procession Ceremony (Hai Chenoun)
 * ប្រព័ន្ធគ្រប់គ្រងសំឡេង និងផ្ទាំង Pop-up ពិធីហែជំនូន (Khmer & English)
 * --------------------------------------------------------------------------
 */

// Initialize audio player with looping enabled
const audioEngine = new Audio('dowry.mp3');
audioEngine.loop = true;

/**
 * Toggle wedding music playback and open the procession image modal
 * មុខងារដំណើរការភ្លេងការ និងបើកផ្ទាំងរូបភាពហែជំនូន
 */
function startDowryCelebration() {
    if (audioEngine.paused) {
        audioEngine.play()
            .then(() => {
                // Audio started successfully -> show modal
                popupDowryView('dawry.png');
            })
            .catch(err => {
                console.warn("Browser autoplay blocked audio: ", err);
                // Fallback: display modal even if audio autoplay is restricted
                popupDowryView('dawry.png');
            });
    } else {
        audioEngine.pause();
    }
}

/**
 * Creates a full-screen overlay modal displaying the procession image and dual-language controls
 * បង្កើតផ្ទាំងចល័ត (Popup Modal) បង្ហាញរូបភាព និងព័ត៌មានជាពីរភាសា
 * 
 * @param {string} srcPath - Path to the image file
 */
function popupDowryView(srcPath) {
    // Prevent duplicate overlays
    const existingOverlay = document.getElementById('dowryModalOverlay');
    if (existingOverlay) existingOverlay.remove();

    const overlay = document.createElement('div');
    overlay.id = 'dowryModalOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.92);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        padding: 20px;
        box-sizing: border-box;
        backdrop-filter: blur(5px);
    `;

    // Modal Title Header (Bilingual)
    const headerTitle = document.createElement('div');
    headerTitle.style.cssText = `
        color: #d4af37;
        text-align: center;
        margin-bottom: 15px;
        font-family: 'Moul', 'Playfair Display', serif;
    `;
    headerTitle.innerHTML = `
        <h3 style="margin: 0; font-size: 1.2rem; color: #ffffff;">🥁 ពិធីហែជំនូន និងការបើកបង្ហាញជំនូន 🥁</h3>
        <span style="font-size: 0.85rem; font-family: 'Poppins', sans-serif; color: #d4af37; letter-spacing: 1px;">
            Groom's Procession & Presentation of Gifts
        </span>
    `;

    // Image Element
    const img = document.createElement('img');
    img.src = srcPath;
    img.alt = "ទិដ្ឋភាពហែជំនូន - Groom's Procession View";
    img.style.cssText = `
        max-width: 95%;
        max-height: 65vh;
        border: 2px solid #d4af37;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        object-fit: contain;
    `;

    // Close Button (Bilingual)
    const closeBtn = document.createElement('button');
    closeBtn.style.cssText = `
        margin-top: 20px;
        background: #8b0000;
        color: white;
        border: 2px solid #d4af37;
        padding: 10px 24px;
        font-family: 'Hanuman', 'Poppins', sans-serif;
        font-size: 0.9rem;
        font-weight: bold;
        border-radius: 30px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        transition: transform 0.2s ease, background-color 0.2s ease;
    `;
    closeBtn.innerHTML = `❌ បិទវិញ និងបញ្ឈប់តន្ត្រី <span style="font-weight: 400; font-size: 0.8rem; display: block; opacity: 0.9;">Close & Stop Music</span>`;

    closeBtn.onmouseover = () => closeBtn.style.transform = 'scale(1.05)';
    closeBtn.onmouseout = () => closeBtn.style.transform = 'scale(1)';

    // Image Load Error Fallback
    img.onerror = function() {
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            color: #ffffff;
            font-family: 'Moul', 'Hanuman', sans-serif;
            font-size: 1.1rem;
            margin-bottom: 20px;
            text-align: center;
            line-height: 1.8;
            background: rgba(255, 255, 255, 0.05);
            padding: 20px;
            border-radius: 10px;
            border: 1px dashed #d4af37;
        `;
        placeholder.innerHTML = `
            🥁 <strong>ពិធីហែជំនូនមហាសិរីមង្គល</strong> 🥁<br>
            <span style="font-size: 0.9rem; font-family: 'Hanuman', sans-serif; color: #d4af37;">
                [កំពុងលេងបទភ្លេងការជំនូនប្រពៃណីខ្មែរ...]
            </span><br>
            <span style="font-size: 0.85rem; font-family: 'Poppins', sans-serif; color: #cccccc; display: block; margin-top: 6px;">
                Playing Traditional Khmer Groom's Procession Music
            </span>
        `;
        overlay.insertBefore(placeholder, closeBtn);
    };

    // Assemble Overlay
    overlay.appendChild(headerTitle);
    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    // Stop music & close modal action
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
